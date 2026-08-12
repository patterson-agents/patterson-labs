#!/usr/bin/env node
/**
 * Regenerate theme.css from tokens.json.
 *
 * Patterson Academy design-project import -> Tailwind CSS v4 theme.
 *
 * Every value in the generated stylesheet is read out of `tokens.json`; the prose, comments and
 * structure live in the TEMPLATE string below. That split is deliberate: token values have exactly
 * one home (`tokens.json`), and the CSS cannot drift from it without this script noticing.
 *
 * The architecture is the one in
 * `patterson-corp/plugins/patterson-brand/skills/design-tokens/scripts/build-theme.ts`, reused
 * rather than reinvented so both artifacts fail the same way. The one deliberate difference is in
 * the `|stack` filter: this project's monospace stack contains multi-word family names
 * ("IBM Plex Mono") and the `ui-monospace` keyword, neither of which the reference filter handled,
 * so quoting is driven by whitespace-or-hyphen and the generic keyword set is extended.
 *
 * Usage
 * -----
 *     node build-theme.ts                 # write ../assets/theme.css (and echo it on stdout)
 *     node build-theme.ts --check         # exit 1 if ../assets/theme.css is out of date
 *     node build-theme.ts --stdout        # print to stdout only, write nothing
 *     node build-theme.ts --tokens X --out Y
 *
 * Requires only Node 22.18+ (native TypeScript type stripping) and Node builtins - no build step,
 * no package.json, no dependencies. `verify-theme.sh` wraps `--stdout` for CI.
 *
 * Placeholder syntax inside TEMPLATE: `@@<token.path>[|filter]@@`
 *   (no filter)  hex string, number, or plain string, verbatim
 *   |dim         W3C dimension object -> "5px" / "120ms" / "50%"
 *   |rem         px dimension converted to rem at 16px root -> "0.3125rem"
 *   |em          number -> "-0.01em"
 *   |stack       fontFamily array -> '"proxima-nova", Arial, sans-serif'
 *
 * Aliases (`"$value": "{color.brand.sky}"`) are resolved transitively.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const HERE = import.meta.dirname;
const DEFAULT_TOKENS = resolve(HERE, "..", "assets", "tokens.json");
const DEFAULT_OUT = resolve(HERE, "..", "assets", "theme.css");

const PLACEHOLDER = /@@([A-Za-z0-9_.]+)(?:\|([a-z]+))?@@/g;
const ALIAS = /^\{([A-Za-z0-9_.]+)\}$/;

type JsonObject = Record<string, unknown>;

class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenError";
  }
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nodeAt(tokens: JsonObject, path: string): unknown {
  let node: unknown = tokens;
  for (const part of path.split(".")) {
    if (!isObject(node) || !Object.prototype.hasOwnProperty.call(node, part)) {
      throw new TokenError(`no such token: ${path}`);
    }
    node = node[part];
  }
  return node;
}

function valueOf(tokens: JsonObject, path: string, depth: number = 0): unknown {
  if (depth > 10) {
    throw new TokenError(`alias loop resolving ${path}`);
  }
  const node = nodeAt(tokens, path);
  if (!isObject(node) || !Object.prototype.hasOwnProperty.call(node, "$value")) {
    throw new TokenError(`token has no $value: ${path}`);
  }
  const value = node["$value"];
  if (typeof value === "string") {
    const alias = ALIAS.exec(value);
    if (alias) {
      return valueOf(tokens, alias[1], depth + 1);
    }
  }
  return value;
}

/**
 * Format a number the way CSS wants it: 800, 1.25, -0.025, 0.3125.
 *
 * Faithful port of C's `printf("%g", value)`: 6 significant digits, trailing zeros stripped,
 * exponential form when the decimal exponent is < -4 or >= 6. JS `String(n)` is NOT equivalent
 * (e.g. String(1e21), String(0.0000001)), so the C `%g` rules are reimplemented here.
 */
function num(value: unknown): string {
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) return "nan";
  if (!Number.isFinite(n)) return n > 0 ? "inf" : "-inf";
  if (n === 0) return Object.is(n, -0) ? "-0" : "0";

  const PRECISION = 6;
  const rounded = Number(n.toPrecision(PRECISION));
  const exponent = Number(rounded.toExponential(PRECISION - 1).split("e")[1]);

  const strip = (s: string): string =>
    s.includes(".") ? s.replace(/0+$/, "").replace(/\.$/, "") : s;

  if (exponent < -4 || exponent >= PRECISION) {
    const [mantissa, exp] = rounded.toExponential(PRECISION - 1).split("e");
    const sign = exp.startsWith("-") ? "-" : "+";
    const digits = exp.replace(/^[+-]/, "").padStart(2, "0");
    return `${strip(mantissa)}e${sign}${digits}`;
  }
  return strip(rounded.toFixed(Math.max(0, PRECISION - 1 - exponent)));
}

// Keywords that must stay unquoted even though they contain a hyphen: quoting them would turn a
// generic family into a (non-existent) named one.
const GENERIC_FAMILIES = new Set([
  "sans-serif",
  "serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-sans-serif",
  "ui-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "emoji",
]);

function render(value: unknown, filt: string | undefined, path: string): string {
  if (filt === "stack") {
    if (!Array.isArray(value)) {
      throw new TokenError(`${path}: |stack needs an array`);
    }
    // Quote any family name carrying whitespace or a hyphen (proxima-nova, IBM Plex Mono); leave
    // plain single words (Arial, Menlo) and generic keywords alone.
    return value
      .map((f) => {
        const name = String(f);
        return /[\s-]/.test(name) && !GENERIC_FAMILIES.has(name) ? `"${name}"` : name;
      })
      .join(", ");
  }
  if (filt === "dim") {
    if (!isObject(value)) {
      throw new TokenError(`${path}: |dim needs a dimension object`);
    }
    const rawUnit = value["unit"];
    const unit = rawUnit === "percent" ? "%" : String(rawUnit);
    return `${num(value["value"])}${unit}`;
  }
  if (filt === "rem") {
    if (!isObject(value) || value["unit"] !== "px") {
      throw new TokenError(`${path}: |rem needs a px dimension`);
    }
    return `${num((value["value"] as number) / 16)}rem`;
  }
  if (filt === "em") {
    const raw = isObject(value) ? value["value"] : value;
    return `${num(raw)}em`;
  }
  if (filt) {
    throw new TokenError(`${path}: unknown filter |${filt}`);
  }
  if (typeof value === "number") {
    return num(value);
  }
  if (typeof value === "string") {
    return value;
  }
  throw new TokenError(`${path}: value ${JSON.stringify(value)} needs an explicit filter`);
}

function build(tokens: JsonObject): string {
  return TEMPLATE.replace(PLACEHOLDER, (_match, path: string, filt: string | undefined) =>
    render(valueOf(tokens, path), filt, path),
  );
}

const USAGE = `usage: build-theme.ts [-h] [--tokens TOKENS] [--out OUT] [--check] [--stdout]

Regenerate theme.css from tokens.json.

options:
  -h, --help       show this help message and exit
  --tokens TOKENS  token source (default: ../assets/tokens.json)
  --out OUT        stylesheet to write (default: ../assets/theme.css)
  --check          compare against --out and exit 1 on any difference
  --stdout         print instead of writing
`;

function main(argv: string[]): number {
  let tokensPath = DEFAULT_TOKENS;
  let outPath = DEFAULT_OUT;
  let check = false;
  let printOnly = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") {
      process.stdout.write(USAGE);
      return 0;
    }
    if (arg === "--check") {
      check = true;
    } else if (arg === "--stdout") {
      printOnly = true;
    } else if (arg === "--tokens" || arg === "--out") {
      const next = argv[i + 1];
      if (next === undefined) {
        process.stderr.write(`build-theme: argument ${arg}: expected one argument\n`);
        return 2;
      }
      i += 1;
      if (arg === "--tokens") tokensPath = resolve(next);
      else outPath = resolve(next);
    } else if (arg.startsWith("--tokens=")) {
      tokensPath = resolve(arg.slice("--tokens=".length));
    } else if (arg.startsWith("--out=")) {
      outPath = resolve(arg.slice("--out=".length));
    } else {
      process.stderr.write(`build-theme: unrecognized arguments: ${arg}\n`);
      return 2;
    }
  }

  let css: string;
  try {
    const tokens = JSON.parse(readFileSync(tokensPath, "utf8")) as JsonObject;
    css = build(tokens);
  } catch (exc) {
    process.stderr.write(`build-theme: ${exc instanceof Error ? exc.message : String(exc)}\n`);
    return 2;
  }

  if (printOnly) {
    process.stdout.write(css);
    return 0;
  }

  if (check) {
    if (!existsSync(outPath)) {
      process.stderr.write(`build-theme: ${outPath} does not exist\n`);
      return 1;
    }
    const current = readFileSync(outPath, "utf8");
    if (current !== css) {
      process.stderr.write(
        `build-theme: ${outPath} is out of date with respect to ${basename(tokensPath)}\n`,
      );
      return 1;
    }
    process.stdout.write(`build-theme: ${basename(outPath)} matches ${basename(tokensPath)}\n`);
    return 0;
  }

  writeFileSync(outPath, css, "utf8");
  // The stylesheet goes to stdout so `node build-theme.ts > out.css` is byte-identical to the
  // committed artifact; the status line goes to stderr so it can never pollute that stream.
  process.stdout.write(css);
  process.stderr.write(`build-theme: wrote ${outPath} (${css.length} bytes)\n`);
  return 0;
}

const TEMPLATE = `\
/* ============================================================================
   Patterson Academy — imported design tokens — Tailwind CSS v4 theme
   ----------------------------------------------------------------------------
   DROP-IN USAGE
     @import "tailwindcss";
     @import "./theme.css";

   Tailwind v4 is CSS-first: this file IS the config. There is no
   tailwind.config.js.

   WHAT THIS IS. A lightweight extraction of the design system bound to the
   claude.ai/design project "Patterson Academy"
   (7b8bb131-b196-46c7-a15b-a5f722e02c96), taken from the handoff export dated
   2026-08-12 and reconciled against the 2025 Brand Guide. It is an INCUBATING
   import: whether this design system or the existing patterson-brand one is
   authoritative has not been ruled on. Nothing here supersedes
   patterson-corp/plugins/patterson-brand.

   SOURCE KEYS
     [ACAD]  the project's _ds snapshot,
             _ds/patterson-companies-design-system-3534f94f-a7e6-4612-81d4-6e830716f07d/tokens/*.css
     [BG25]  Patterson Companies Brand Guide 2025 (VERSION 3.2025) — authoritative
     [DS20]  DesignSystem_042120.pdf (April 2020)
     [DPL]   Patterson Digital Pattern Library v5.7.2 production stylesheet
     [CORP]  patterson-corp/plugins/patterson-brand/skills/design-tokens — the
             reference extraction of [BG25]/[DS20]/[DPL] these values are
             reconciled against

   RECONCILIATION. Where an imported value conflicts with [BG25], the Brand
   Guide value ships and the conflict is named in the comment. Every such line
   is marked CONFLICT. Where [BG25] is silent the imported value is carried and
   marked TBD. Full narrative in DESIGN.md; per-token record in tokens.json.

   NOTHING IN THIS FILE IS INVENTED, and this file is GENERATED — edit
   assets/tokens.json and re-run scripts/build-theme.ts.
   ============================================================================ */

@theme {
  /* ==========================================================================
     TYPEFACES
     Proxima Nova is the Patterson brand font [BG25 p.25], licensed through
     Adobe Fonts. Load kit uth1qfm in the document head:

       <link rel="stylesheet" href="https://use.typekit.net/uth1qfm.css">

     REFERENCE THE KIT; SHIP NOTHING. This file contains no @font-face rule and
     this skill contains no font binary, deliberately.

     CONFLICT: the imported stack inserts a free Google fallback family between
     proxima-nova and the system stack, and the snapshot self-hosts three
     Proxima Nova woff2 faces. [BG25 p.25] names Arial as the sanctioned
     fallback and [DPL] ships proxima-nova, Arial, sans-serif verbatim; [CORP]
     records the substitute family as a wrong earlier extraction appearing in
     no Patterson source. Both are superseded here. See DESIGN.md section 3.
     ========================================================================== */
  --font-sans: @@font.family.brand|stack@@;
  --font-display: @@font.family.display|stack@@;
  --font-mono: @@font.family.mono|stack@@;   /* TBD: Patterson publishes no monospace face */

  /* ==========================================================================
     BRAND COLOR [BG25 p.24]
     The imported palette reproduces the Brand Guide exactly — all eleven hexes
     match, PMS annotations included. No reconciliation was needed here.
     ========================================================================== */
  --color-pat-navy:        @@color.brand.navy@@;   /* PMS 540  — primary */
  --color-pat-sky:         @@color.brand.sky@@;   /* PMS 2995 — primary */
  --color-pat-gray:        @@color.brand.gray@@;   /* Cool Gray 11, 80% black — body copy */
  --color-pat-white:       @@color.brand.white@@;   /* page ground */
  --color-pat-blue:        @@color.brand.blue@@;   /* PMS 7683 — secondary */
  --color-pat-blue-light:  @@color.brand.blueLight@@;   /* PMS 297  — secondary */
  --color-pat-gray-light:  @@color.brand.grayLight@@;   /* Cool Gray 1 @ 50% — secondary */
  --color-pat-green:       @@color.brand.green@@;   /* PMS 369  — tertiary */
  --color-pat-teal:        @@color.brand.teal@@;   /* PMS 7718 — tertiary */
  --color-pat-purple:      @@color.brand.purple@@;   /* PMS 7679 — tertiary */

  /* ==========================================================================
     TINTS — CONFLICT, resolved for [BG25 p.24].
     The Brand Guide publishes a three-step 75/50/25 ramp over white. The import
     defines a five-step 80/60/40/20/10 ramp for navy and sky only. Both are
     consistent mixes at different stops; the step set is a brand decision, so
     the Brand Guide ramp ships. The imported ramp is recorded in tokens.json
     and DESIGN.md section 2.
     ========================================================================== */
  --color-pat-navy-75: @@color.tint.navy75@@;
  --color-pat-navy-50: @@color.tint.navy50@@;
  --color-pat-navy-25: @@color.tint.navy25@@;
  --color-pat-sky-75:  @@color.tint.sky75@@;
  --color-pat-sky-50:  @@color.tint.sky50@@;
  --color-pat-sky-25:  @@color.tint.sky25@@;

  /* ==========================================================================
     NEUTRAL RAMP [ACAD] — TBD: [BG25] publishes only two greys, the 600 and
     100 steps below. The intermediate steps are the import's own and are new
     information the Brand Guide does not cover.
     ========================================================================== */
  --color-pat-ink:       @@color.neutral.ink@@;   /* near-black; NOT used for headings — see below */
  --color-pat-gray-700:  @@color.neutral.gray700@@;
  --color-pat-gray-600:  @@color.neutral.gray600@@;   /* = [BG25 p.24] body copy grey */
  --color-pat-gray-500:  @@color.neutral.gray500@@;
  --color-pat-gray-400:  @@color.neutral.gray400@@;
  --color-pat-gray-300:  @@color.neutral.gray300@@;
  --color-pat-gray-200:  @@color.neutral.gray200@@;
  --color-pat-gray-100:  @@color.neutral.gray100@@;   /* = [BG25 p.24] accent grey */
  --color-pat-gray-50:   @@color.neutral.gray50@@;

  /* ==========================================================================
     STATUS — CONFLICT, resolved for the documented implementation.
     [BG25] publishes no status colours; [DS20 p.37] names four states without
     hexes; [DPL] ships the hexes below. The import harmonised its own error and
     warning hues to the brand palette — a design project does not get to
     redefine the alert palette, so those two are superseded and recorded in
     DESIGN.md section 2. The informational state is the import's own.
     ========================================================================== */
  --color-pat-error:    @@color.status.error@@;   /* [DPL] .message-box--error */
  --color-pat-success:  @@color.status.success@@;   /* [DS20 p.8] accent green, [DPL] */
  --color-pat-warning:  @@color.status.warning@@;   /* [DPL] .with--text-orange */
  --color-pat-urgent:   @@color.status.urgent@@;   /* [DPL] .message-box--alert */
  --color-pat-info:     @@color.status.info@@;   /* [ACAD] — TBD, resolves to a [BG25] secondary */

  /* Tinted status grounds [ACAD] — TBD: no Patterson source publishes status
     surfaces, so these are the only extracted values. The warning and error
     grounds were mixed from the imported hues the block above supersedes, so
     they pair loosely rather than exactly. */
  --color-pat-success-surface:  @@color.statusSurface.successSurface@@;
  --color-pat-info-surface:     @@color.statusSurface.infoSurface@@;
  --color-pat-warning-surface:  @@color.statusSurface.warningSurface@@;
  --color-pat-error-surface:    @@color.statusSurface.errorSurface@@;

  /* ==========================================================================
     SPACING — CONFLICT, resolved for [BG25 p.57].
     Patterson digital work sits on a 5px grid: that is where the Brand Guide's
     explicit 30px button padding lands, and 30px is not expressible on the
     import's 4px base at all. Setting Tailwind's base unit to 5px makes
     p-2 = 10px and p-6 = 30px. The import's own 4px scale is carried verbatim
     further down, namespaced --pat-imp-space-*, so nothing is lost.
     ========================================================================== */
  --spacing: @@dimension.spacing.base|rem@@;   /* 5px [BG25 p.57], [DPL] */

  /* ==========================================================================
     RADII — CONFLICT, resolved for [BG25 p.57] "Rounded corners: 5px radius".
     The import ships a seven-step ramp of 2/4/6/10/16/24px plus a 999px pill;
     none of its steps is 5px. The imported ramp is carried below.
     ========================================================================== */
  --radius-pat: @@dimension.radius.default|dim@@;

  /* ==========================================================================
     TYPE SCALE [ACAD] — TBD: the import's scale is FLUID; seven of its eleven
     steps interpolate on viewport width. No Patterson source publishes a fluid
     scale — [BG25 p.27] specifies type relationally and [DPL] ships fixed
     pixels. Carried verbatim because it is the import's real scale.
     ========================================================================== */
  --text-pat-display: @@font.size.display@@;
  --text-pat-display--line-height: @@font.lineHeight.tight@@;
  --text-pat-h1: @@font.size.h1@@;
  --text-pat-h1--line-height: @@font.lineHeight.heading@@;
  --text-pat-h2: @@font.size.h2@@;
  --text-pat-h2--line-height: @@font.lineHeight.heading@@;
  --text-pat-h3: @@font.size.h3@@;
  --text-pat-h3--line-height: @@font.lineHeight.snug@@;
  --text-pat-h4: @@font.size.h4@@;                    /* 20px */
  --text-pat-h5: @@font.size.h5@@;                 /* 17px */
  --text-pat-lead: @@font.size.lead@@;                  /* 20px */
  --text-pat-body: @@font.size.body@@;                     /* 16px — CONFLICT with [DPL]'s 18px, see DESIGN.md section 3 */
  --text-pat-body--line-height: @@font.lineHeight.body@@;
  --text-pat-sm: @@font.size.small@@;                  /* 14px */
  --text-pat-xs: @@font.size.xsmall@@;                   /* 12px */
  --text-pat-stat: @@font.size.stat@@;   /* the oversized sky numeral */

  /* ==========================================================================
     LEADING AND TRACKING
     --tracking-pat-snug is [BG25 p.27] tracking -10 exactly. --tracking-pat-caps
     exists only to letterspace uppercase labels, which [BG25 p.25] rejects for
     digital channels; it is defined but the base layer never applies it.
     ========================================================================== */
  --leading-pat-tight: @@font.lineHeight.tight@@;
  --leading-pat-snug: @@font.lineHeight.snug@@;
  --leading-pat-heading: @@font.lineHeight.heading@@;
  --leading-pat-body: @@font.lineHeight.body@@;
  --leading-pat-relaxed: @@font.lineHeight.relaxed@@;
  --tracking-pat-tight: @@typography.tracking.tight|em@@;
  --tracking-pat-snug: @@typography.tracking.snug|em@@;   /* [BG25 p.27] tracking -10 */
  --tracking-pat-none: @@typography.tracking.normal|em@@;
  --tracking-pat-wide: @@typography.tracking.wide|em@@;
  --tracking-pat-caps: @@typography.tracking.caps|em@@;   /* opt-in only */

  /* ==========================================================================
     LAYOUT — TBD: [BG25] publishes no page width. The import ships 1240px and
     [DPL] ships 1300px; both are production values from different
     implementations, so neither supersedes the other.
     ========================================================================== */
  --container-pat: @@dimension.layout.containerMax|dim@@;
  --container-pat-text: @@dimension.layout.containerText|dim@@;    /* readable measure */

  /* ==========================================================================
     CONTROL SIZING — CONFLICT on height, resolved for [BG25 p.57] (46px).
     The import's default control height is 44px, chosen as a hit-target floor
     rather than from a Patterson source; its three-step ramp is carried.
     ========================================================================== */
  --size-pat-control: @@dimension.control.buttonHeight|dim@@;          /* [BG25 p.57] */
  --size-pat-control-sm: @@dimension.control.heightSm|dim@@;
  --size-pat-control-md: @@dimension.control.heightMd|dim@@;       /* [ACAD] default */
  --size-pat-control-lg: @@dimension.control.heightLg|dim@@;

  /* ==========================================================================
     ELEVATION, RINGS, MOTION [ACAD] — TBD across the board.
     [BG25] and [DS20] publish no elevation scale, no focus treatment and no
     motion tokens, and [CORP] reads the brand as flat. This whole group is the
     largest piece of new information the import contributes AND the clearest
     candidate for the supersession ruling: a flat brand and a five-step
     elevation ramp cannot both be right. See DESIGN.md sections 4 and 5.
     ========================================================================== */
  --shadow-pat-xs: @@effect.shadow.xs@@;
  --shadow-pat-sm: @@effect.shadow.sm@@;
  --shadow-pat-md: @@effect.shadow.md@@;
  --shadow-pat-lg: @@effect.shadow.lg@@;
  --shadow-pat-xl: @@effect.shadow.xl@@;
  --ease-pat-standard: @@effect.easing.standard@@;
  --ease-pat-out: @@effect.easing.out@@;
}

/* ============================================================================
   IMPORTED SEMANTIC LAYER
   The alias names below are the import's own contract (tokens/colors.css
   "SEMANTIC ALIASES"), reproduced so markup written against the design project
   keeps working. Values are the reconciled ones.
   ============================================================================ */
:root {
  --radius: @@dimension.radius.default|dim@@;                         /* [BG25 p.57] */

  /* Text */
  --text-strong:     var(--color-pat-navy);
  /* CONFLICT: the import points --text-heading at its near-black ink
     @@color.neutral.ink@@. Every Patterson source sets headings in navy —
     [BG25 p.24] designates navy for headlines, [DPL] sets .rtf h1/h2/h3 to
     @@color.brand.navy@@, and the sibling lab-workshop snapshot of this same
     design system corrects the value to navy itself. Navy ships. */
  --text-heading:    var(--color-pat-navy);
  --text-body:       var(--color-pat-gray-600);
  --text-muted:      var(--color-pat-gray-500);
  --text-inverse:    var(--color-pat-white);
  /* The import's link colour is [BG25 p.24]'s published secondary blue. Kept:
     the Brand Guide is silent on link colour, and a published brand colour
     beats an unpublished one. [DS20 p.8] specifies a WCAG-adjusted link blue
     instead, differing from this one only in the green channel — see DESIGN.md
     section 2 before choosing. */
  --text-link:       var(--color-pat-blue);
  --text-link-hover: var(--color-pat-navy);
  --text-on-brand:   var(--color-pat-white);

  /* Surfaces */
  --surface-page:      var(--color-pat-white);
  --surface-subtle:    var(--color-pat-gray-50);
  --surface-muted:     var(--color-pat-gray-100);
  --surface-card:      var(--color-pat-white);
  --surface-brand:     var(--color-pat-navy);
  --surface-brand-alt: var(--color-pat-sky);
  --surface-inverse:   var(--color-pat-navy);

  /* Borders — TBD: [BG25] publishes no border colours. [DPL] ships a rule grey
     and a field-border grey; the import uses its own neutral ramp instead. */
  --border-subtle:  var(--color-pat-gray-200);
  --border-default: var(--color-pat-gray-300);
  --border-strong:  var(--color-pat-gray-400);
  --border-brand:   var(--color-pat-sky);

  /* Interactive */
  --accent:        var(--color-pat-sky);
  --accent-strong: var(--color-pat-navy);
  --focus-ring:    var(--color-pat-sky);
  --ring-focus: @@effect.ring.focus@@;
  /* Re-derived against the error colour this extraction ships. The import's own
     error ring was mixed from the harmonised red the status block supersedes;
     carrying it would have reintroduced a rejected value in decimal form. */
  --ring-error: @@effect.ring.error@@;

  /* Scrim and blur */
  --overlay-scrim: @@color.overlay.scrim@@;
  --blur-panel: @@effect.blur.panel@@;

  /* Motion */
  --dur-fast: @@duration.fast|dim@@;
  --dur-base: @@duration.base|dim@@;
  --dur-slow: @@duration.slow|dim@@;
  --ease-standard: @@effect.easing.standard@@;
  --ease-out: @@effect.easing.out@@;

  /* --------------------------------------------------------------------------
     THE IMPORT'S OWN SPACING AND RADIUS SCALES
     Namespaced --pat-imp-* so they cannot be mistaken for the [BG25] grid above.
     Carried because they are the scale the design project actually composes on;
     superseded as the default because [BG25 p.57]'s 30px button padding does not
     land on a 4px grid. TBD: no Patterson source publishes a named spacing scale,
     so both scales are reconstructions — which is why this is recorded as a
     conflict rather than declared settled.
     -------------------------------------------------------------------------- */
  --pat-imp-space-0:  @@dimension.spacingImported.0|dim@@;
  --pat-imp-space-1:  @@dimension.spacingImported.1|dim@@;
  --pat-imp-space-2:  @@dimension.spacingImported.2|dim@@;
  --pat-imp-space-3:  @@dimension.spacingImported.3|dim@@;
  --pat-imp-space-4:  @@dimension.spacingImported.4|dim@@;
  --pat-imp-space-5:  @@dimension.spacingImported.5|dim@@;
  --pat-imp-space-6:  @@dimension.spacingImported.6|dim@@;
  --pat-imp-space-7:  @@dimension.spacingImported.7|dim@@;
  --pat-imp-space-8:  @@dimension.spacingImported.8|dim@@;
  --pat-imp-space-9:  @@dimension.spacingImported.9|dim@@;
  --pat-imp-space-10: @@dimension.spacingImported.10|dim@@;
  --pat-imp-space-11: @@dimension.spacingImported.11|dim@@;
  --pat-imp-space-12: @@dimension.spacingImported.12|dim@@;

  --pat-imp-radius-xs:   @@dimension.radiusImported.xs|dim@@;
  --pat-imp-radius-sm:   @@dimension.radiusImported.sm|dim@@;
  --pat-imp-radius-md:   @@dimension.radiusImported.md|dim@@;
  --pat-imp-radius-lg:   @@dimension.radiusImported.lg|dim@@;
  --pat-imp-radius-xl:   @@dimension.radiusImported.xl|dim@@;
  --pat-imp-radius-2xl:  @@dimension.radiusImported.xxl|dim@@;
  --pat-imp-radius-pill: @@dimension.radiusImported.pill|dim@@;   /* no Patterson counterpart */

  --gutter: @@dimension.gutter.default@@;

  --border-w:       @@dimension.control.borderWidth|dim@@;
  --border-w-thick: @@dimension.control.borderWidthThick|dim@@;
}

/* ----------------------------------------------------------------------------
   Expose the imported semantic layer to Tailwind v4 utilities.
   ---------------------------------------------------------------------------- */
@theme inline {
  --color-text-strong: var(--text-strong);
  --color-text-heading: var(--text-heading);
  --color-text-body: var(--text-body);
  --color-text-muted: var(--text-muted);
  --color-text-inverse: var(--text-inverse);
  --color-text-link: var(--text-link);
  --color-surface-page: var(--surface-page);
  --color-surface-subtle: var(--surface-subtle);
  --color-surface-muted: var(--surface-muted);
  --color-surface-card: var(--surface-card);
  --color-surface-brand: var(--surface-brand);
  --color-surface-brand-alt: var(--surface-brand-alt);
  --color-border-subtle: var(--border-subtle);
  --color-border-default: var(--border-default);
  --color-border-strong: var(--border-strong);
  --color-border-brand: var(--border-brand);

  --radius-sm: var(--pat-imp-radius-sm);
  --radius-md: var(--radius);
  --radius-lg: var(--pat-imp-radius-lg);
}

/* ----------------------------------------------------------------------------
   BASE ELEMENT DEFAULTS
   Reproduces the import's tokens/base.css, with the two reconciliations named
   inline. Sentence case is a hard rule in 2025: [BG25 p.25] "All caps are to be
   avoided in any digital channel since this is regarded as shouting";
   [BG25 p.59] puts titles, headlines, subheads, text and captions all in
   sentence case.
   ---------------------------------------------------------------------------- */
@layer base {
  body {
    font-family: var(--font-sans);
    font-weight: @@font.weight.regular@@;
    font-size: var(--text-pat-body);
    line-height: var(--leading-pat-body);
    color: var(--text-body);
    background-color: var(--surface-page);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    color: var(--text-heading);               /* CONFLICT resolved: navy, not the import's ink */
    line-height: var(--leading-pat-heading);
    font-weight: @@font.weight.bold@@;
    letter-spacing: var(--tracking-pat-snug); /* [BG25 p.27] tracking -10 */
    text-transform: none;                     /* [BG25 p.25], [BG25 p.59] sentence case */
  }
  h1 { font-size: var(--text-pat-h1); }
  h2 { font-size: var(--text-pat-h2); }
  h3 { font-size: var(--text-pat-h3); }
  h4 { font-size: var(--text-pat-h4); }
  h5 { font-size: var(--text-pat-h5); }

  a {
    color: var(--text-link);
    text-decoration: none;
    transition: color var(--dur-fast) var(--ease-standard);
  }
  a:hover { color: var(--text-link-hover); }

  :focus-visible {
    outline: none;
    box-shadow: var(--ring-focus);
    border-radius: var(--pat-imp-radius-sm);
  }
}

/* ----------------------------------------------------------------------------
   IMPORTED COMPONENT PRIMITIVES
   ---------------------------------------------------------------------------- */
@layer components {
  /* [BG25 p.57] Buttons: rounded box, sentence case CTA, sky blue default,
     height 46px, width = type width + 30px padding L/R, radius 5px, Semibold,
     centered, white text. The import's snapshot defines no button intent tokens
     at all; the sibling lab-workshop snapshot does, and ships navy — see that
     skill's DESIGN.md section 2 for the conflict. */
  .pat-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: @@dimension.control.buttonHeight|dim@@;
    padding-inline: @@dimension.control.buttonPaddingX|dim@@;
    border: none;
    border-radius: @@dimension.radius.default|dim@@;
    background-color: var(--color-pat-sky);
    color: var(--color-pat-white);
    font-family: var(--font-sans);
    font-weight: @@font.weight.semibold@@;
    letter-spacing: 0;
    text-align: center;
    text-decoration: none;
    text-transform: none;                     /* never all caps [BG25 p.57] */
    transition: background-color var(--dur-base) var(--ease-standard);
  }

  /* Readable container [ACAD] .pat-container. */
  .pat-container {
    width: 100%;
    max-width: var(--container-pat);
    margin-inline: auto;
    padding-inline: var(--gutter);
  }

  /* CONFLICT resolved: the import sets .pat-eyebrow to uppercase with
     @@typography.tracking.caps|em@@ tracking. [BG25 p.25] rejects all caps in
     digital channels, [DS20 p.10] and [DS20 p.16] put eyebrows in sentence
     case, and the sibling lab-workshop snapshot corrects its own default to
     sentence case. Sentence case ships; the uppercase treatment stays
     available as an explicit opt-in below.
     The sky colour is the import's own — [BG25] is silent on eyebrow colour and
     [DS20 p.16] says teal. See DESIGN.md section 4. */
  .pat-eyebrow {
    font-size: var(--text-pat-xs);
    font-weight: @@font.weight.bold@@;
    letter-spacing: var(--tracking-pat-none);
    text-transform: none;
    color: var(--color-pat-sky);
  }
  .pat-eyebrow--caps {
    letter-spacing: var(--tracking-pat-caps);
    text-transform: uppercase;
  }

  /* The oversized sky numeral is a signature device of this design project. */
  .pat-stat {
    font-size: var(--text-pat-stat);
    font-weight: @@font.weight.extrabold@@;
    line-height: var(--leading-pat-tight);
    letter-spacing: var(--tracking-pat-tight);
    color: var(--color-pat-sky);
  }
}
`;

process.exitCode = main(process.argv.slice(2));
