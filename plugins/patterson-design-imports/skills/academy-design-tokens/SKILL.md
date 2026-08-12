---
name: academy-design-tokens
description: Applies the design tokens imported from the "Patterson Academy" claude.ai/design project — a Tailwind CSS v4 theme.css plus a W3C tokens.json, reconciled against the 2025 Brand Guide with every conflict recorded. Use when styling a training deck, course canvas or internal learning app in the Academy look, comparing the Academy design system against patterson-brand, checking whether an imported value survived brand reconciliation, or regenerating theme.css from tokens.json — and when asked "the Academy theme", "the Academy tokens", "what did the Academy project use for X", "does the Academy palette match the brand guide", or "which design system wins".
---

# Patterson Academy — imported design tokens

An **incubating** extraction of the design system bound to the claude.ai/design project
**Patterson Academy** (`7b8bb131-b196-46c7-a15b-a5f722e02c96`), from the handoff export dated
2026-08-12.

> [!WARNING]
> **This does not supersede `patterson-brand`.** Whether this design system or the existing
> `patterson-corp/plugins/patterson-brand` one is authoritative has not been ruled on. This skill
> lives in `patterson-labs` as a recorded default pending that ruling, and asserts nothing about it.
> If a caller needs the authoritative Patterson theme, send them to the **design-tokens** skill in
> `patterson-brand`, not here.

## What is in here

| File | What it is |
|---|---|
| `assets/theme.css` | Tailwind CSS v4 `@theme` block plus the import's own semantic alias layer, base defaults and component primitives. **This is the config** — Tailwind v4 is CSS-first, there is no `tailwind.config.js`. |
| `assets/tokens.json` | The same values in W3C Design Tokens Community Group format, with a per-token source and, where they differ, the imported value that lost to the Brand Guide. The single source of truth. |
| `DESIGN.md` | The five-section Stitch-format description: atmosphere, palette with roles, type, components, layout — plus the full conflict table. |
| `_SOURCES.md` · `REFERENCES.md` | Provenance, confidence, escalations; canonical locations. |

> [!IMPORTANT]
> `theme.css` is **generated** from `tokens.json` by `scripts/build-theme.ts`. Never hand-edit
> `theme.css` — edit `tokens.json` and regenerate.

## Brand reconciliation — read this before using a value

Every imported value was compared against the 2025 Brand Guide as encoded in
`patterson-corp/plugins/patterson-brand/skills/design-tokens`. **Where they conflict, the Brand Guide
wins**, the Brand Guide value ships, and both values are recorded — the same treatment the
`#00A8E1` versus `#269BCB` palette conflict gets there.

Thirteen conflicts were found. The five that change what renders:

| What the import does | What ships | Why |
|---|---|---|
| Headings in a near-black ink | **Navy** `#003767` | Every Patterson source sets headings navy; the later sibling snapshot of this same design system corrects it too. |
| A 5-step 80/60/40/20/10 tint ramp | **The Brand Guide's 75/50/25 ramp** | The step set is a brand decision. |
| Alert hues harmonised to the palette | **The documented implementation hues** | A design project does not redefine the alert palette. |
| A 4px spacing grid and a 7-step radius ramp | **A 5px grid and a 5px radius** | 30px button padding is not expressible on a 4px grid; the Brand Guide publishes one radius. The imported scales are carried under `--pat-imp-*`. |
| Uppercase, letterspaced eyebrows | **Sentence case, untracked** | All caps is rejected for digital channels. The uppercase treatment survives as `.pat-eyebrow--caps`. |

The full table, with both values and both sources for all thirteen, is in
[`DESIGN.md`](DESIGN.md) § *Conflicts against the 2025 Brand Guide*.

> [!CAUTION]
> **Never reintroduce a rejected value.** The four superseded markers are named in `DESIGN.md` and
> `_SOURCES.md` only, as rejected values. `tests/run-tests.sh` fails if any of them reaches
> `assets/`, `scripts/`, this file or `REFERENCES.md`.

## What the import genuinely adds

Where the Brand Guide is silent, the imported value is carried and marked `[TBD: not specified in
BG25]`. The substantial additions, all new information:

- **A nine-step cool-grey ramp.** The Brand Guide publishes two greys; the import fills the gaps.
- **A five-step elevation ramp**, tinted with brand navy rather than neutral black. This is the
  sharpest disagreement in the whole import — `patterson-brand` reads Patterson as a **flat** brand
  whose only documented shadow is an inset on text inputs. Both cannot be right. Escalated.
- **A branded focus ring** — 3px of sky at 45% alpha. Patterson publishes no focus treatment at all.
- **A fluid type scale.** Seven of eleven steps interpolate on viewport width.
- **Motion tokens** — 120/200/320ms against two easing curves.
- **Status grounds** — four tinted washes. No Patterson source publishes a status surface.

## Install into a project

1. **Confirm Tailwind v4.** `theme.css` uses `@theme`, which is v4-only.
2. **Copy `assets/theme.css` in verbatim.** Do not reformat it — the comments carry the source and
   the conflict record for every value, and `verify-theme.sh` compares bytes.
3. **Import it after Tailwind:**

   ```css
   @import "tailwindcss";
   @import "./theme.css";
   ```

   > [!WARNING]
   > Order matters. Tailwind must load first or `@theme`, `@theme inline` and `@layer` have nothing
   > to extend.

4. **Add the font kit to the document head** — never an `@font-face` rule:

   ```html
   <link rel="stylesheet" href="https://use.typekit.net/uth1qfm.css">
   ```

   Without the kit, text falls back to Arial, which is the sanctioned fallback. **Use `uth1qfm`**: it
   serves 400/500/600/700/800 in normal and italic, so this system's Semibold and Extrabold render as
   real faces.

## Regenerating and drift checking

```bash
node scripts/build-theme.ts      # rewrite assets/theme.css
./scripts/verify-theme.sh        # 0 = in sync, 1 = drift (prints the diff)
./tests/run-tests.sh             # full suite; prints ALL TESTS PASSED on success
```

`build-theme.ts` needs only Node 22.18+ and its builtins — Node strips the types natively, so there is
no build step, no `tsc`, no `package.json` and no dependencies.

| Invocation | Behaviour |
|---|---|
| `node build-theme.ts` | Writes `assets/theme.css` **and** echoes it on stdout (the status line goes to stderr) |
| `node build-theme.ts --check` | Exits 1 without writing |
| `node build-theme.ts --stdout` | Prints only |

To change a value: edit `tokens.json`, run `build-theme.ts`, commit both files. To add a *new* CSS
variable you must also add its placeholder to the `TEMPLATE` string in `build-theme.ts`.

## Hard rules

> [!CAUTION]
> **Never invent a hex, size or weight.** If a value is not in `tokens.json`, it is not a value this
> import carries. `tokens.json` has a `_tbd` section listing exactly what no Patterson source
> publishes. Do not fill those in.

> [!CAUTION]
> **No binaries, ever.** No font file, no raster, no `@font-face`. The imported snapshot self-hosts
> three Proxima Nova faces and declares them licensed; that claim is unconfirmed and none of them is
> committed here.

- Do not add a `tailwind.config.js`. v4 is CSS-first; the config is the `@theme` block.
- `--spacing` is `0.3125rem` (5px), so `p-2` = 10px and `p-6` = 30px. Deleting that line reverts to
  Tailwind's stock 4px grid — which is what the import itself used. Tell the user before doing it.
- No emoji anywhere. The design project's own voice guidance agrees: no emoji, ever.

## Related

| Skill | When |
|---|---|
| `lab-workshop-design-tokens` (this plugin) | The sibling import — **the same design system, a later snapshot**, with production-verified interaction states and the official icon font. Compare before choosing. |
| `design-tokens` in `patterson-corp/plugins/patterson-brand` | The authoritative Patterson theme. Use it, not this, for production Patterson work until the supersession ruling lands. |
