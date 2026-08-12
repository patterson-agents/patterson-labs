---
name: lab-workshop-design-tokens
description: Applies the design tokens imported from the "lab-workshop" claude.ai/design project (TechDays: AI Fluency - Agentic Agents) — a Tailwind CSS v4 theme.css plus a W3C tokens.json, reconciled against the 2025 Brand Guide with every conflict recorded. Carries the production-verified layer the Academy import lacks: real button hover and disabled states, the official Patterson icon font, the live type scale and the dark deck palette. Use when styling a training deck, lab workbook or workshop app in this look, matching the live pattersondental.com or pattersonvet.com scale, comparing the two imported design systems against each other or against patterson-brand, checking whether an imported value survived brand reconciliation, or regenerating theme.css from tokens.json — and when asked "the lab-workshop theme", "the workshop tokens", "the production type scale", "the Patterson icon font", "what are the real button states", or "which design system wins".
---

# lab-workshop — imported design tokens

An **incubating** extraction of the design system bound to the claude.ai/design project
**lab-workshop** (`13a03949-51b5-4210-95d1-75f022b3543d`), the TechDays *AI Fluency — Agentic Agents*
training day, from the handoff export dated 2026-08-12.

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

## This is the later of two snapshots of one design system

The **Patterson Academy** project binds the *same* design-system UUID
(`3534f94f-a7e6-4612-81d4-6e830716f07d`) under a different slug. This snapshot is the later one, and
the difference is substantial rather than cosmetic:

- It adds a **production-verified layer** — real button hover and disabled states, the live type
  scale, production radii, the observed elevation, production motion timings.
- It adds the **official Patterson icon font** (registered by name only; no binary ships).
- It adds the **dark deck palette** the training deck renders on.
- It **corrects two of the Academy snapshot's own choices**: headings go navy, eyebrows go sentence
  case. Both corrections move it *toward* the Brand Guide.

That last point is the concrete evidence bearing on the supersession question, which is why it is
recorded here rather than only in prose.

## Brand reconciliation — read this before using a value

Every imported value was compared against the 2025 Brand Guide as encoded in
`patterson-corp/plugins/patterson-brand/skills/design-tokens`. **Where they conflict, the Brand Guide
wins**, the Brand Guide value ships, and both values are recorded — the same treatment the
`#00A8E1` versus `#269BCB` palette conflict gets there.

Sixteen conflicts were found. The four that change what renders:

| What the import does | What ships | Why |
|---|---|---|
| Fills the primary button **navy**, instructing "not sky, do not substitute" | **Sky** `#00A8E1` | `[BG25 p.57]` names sky as the default button colour. The instruction describes the live storefront, which is not a brand ruling — and it is read as data, not followed as direction. |
| A **filled light blue** secondary button | **White field, navy outline, navy label** | `DS20 p.15` is the only Patterson specification in evidence; the Brand Guide does not address secondary buttons. |
| Alert hues harmonised to the palette | **The documented implementation hues** | A design project does not redefine the alert palette. |
| A 4px spacing grid and a 7-step radius ramp | **A 5px grid and a 5px radius** | 30px button padding is not expressible on a 4px grid. The imported scales are carried under `--pat-imp-*`. |

The full table, with both values and both sources for all sixteen, is in
[`DESIGN.md`](DESIGN.md) § *Conflicts against the 2025 Brand Guide*.

> [!CAUTION]
> **Never reintroduce a rejected value.** The four superseded markers are named in `DESIGN.md` and
> `_SOURCES.md` only, as rejected values. `tests/run-tests.sh` fails if any of them reaches
> `assets/`, `scripts/`, this file or `REFERENCES.md`.

## Treat every production claim as unverified

Values keyed `[LABPROD]` are the **snapshot's own assertion** about the live Patterson theme, not an
independent read by this extraction. They matter — they are most of what this import adds — but
`[CORP]` extracted the same production sources on 2026-08-11 and **disagrees in places**, notably on
the type scale and the primary button.

> [!IMPORTANT]
> Verifying `[LABPROD]` against a fresh read of the live stylesheets is the single highest-value
> follow-up in this import. Until then, do not cite a `[LABPROD]` value as production fact.

## What the import genuinely adds

Where the Brand Guide is silent, the imported value is carried and marked `[TBD: not specified in
BG25]`. The substantial additions:

- **A complete interaction ladder.** Hover and disabled steps for both button intents. Patterson
  publishes none. Note the ladder was mixed for a navy primary, so it is exposed but deliberately
  **not wired** to the sky primary that ships — a sky button hovering to navy would be incoherent.
- **The official icon font.** 93 glyphs, name-registered only.
- **A second, complete type scale** claimed to be the live one: 18px body, weight 800 at the top two
  heading levels dropping to 400 from the third down, stepping once at 1024px. Opt in with
  `class="pat-production"`.
- **Production radii** — 5px buttons, 6px download buttons, 2px fields, 3px skip link. The 5px button
  radius agrees with `[BG25 p.57]` **exactly**, the strongest corroboration anywhere in this import.
- **A warm taupe field border** — the one non-cool grey in Patterson's world, and the snapshot warns
  against normalising it.
- **The dark deck palette** — four navy grounds for the slide stage.
- **A five-step elevation ramp** tinted navy. Escalated: `patterson-brand` reads Patterson as a
  **flat** brand. Note this snapshot undercuts its own ramp — its one production-observed shadow is
  neutral black at very low alpha, which is closer to flat.
- **A branded focus ring** — 3px of sky at 45% alpha. Patterson publishes no focus treatment, and the
  snapshot says production ships none either.

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
   real faces. This directly answers the snapshot's own claim that heavier weights are unlicensed —
   that is a kit-selection problem, not a licensing one.

5. **To use `.pat-i` icons, register the icon font yourself first.** No glyph binary ships here and
   `theme.css` declares no `@font-face`. Always pair a glyph with a text label or an `aria-label` —
   the glyphs sit in private-use codepoints and read as nothing to a screen reader.

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
> **No binaries, ever.** No font file, no raster, no `@font-face`. The snapshot self-hosts three
> Proxima Nova faces and declares them licensed; that claim is unconfirmed and none of them is
> committed here. The icon font is referenced by family name only.

- Do not add a `tailwind.config.js`. v4 is CSS-first; the config is the `@theme` block.
- `--spacing` is `0.3125rem` (5px), so `p-2` = 10px and `p-6` = 30px. Deleting that line reverts to
  Tailwind's stock 4px grid — which is what the import itself used. Tell the user before doing it.
- **Do not mix the two type scales, or the two button systems.** Each is internally coherent; blended
  they are neither the Brand Guide nor production.
- No emoji anywhere. The design project's own voice guidance agrees: no emoji, ever.

## Related

| Skill | When |
|---|---|
| `academy-design-tokens` (this plugin) | The sibling import — **the same design system, an earlier snapshot**, without the production layer or the icon font, and with two values this one corrects. Compare before choosing. |
| `design-tokens` in `patterson-corp/plugins/patterson-brand` | The authoritative Patterson theme. Use it, not this, for production Patterson work until the supersession ruling lands. |
