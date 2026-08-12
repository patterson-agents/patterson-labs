# Design System: Patterson Academy (imported)

**Project ID:** `claude.ai/design → 7b8bb131-b196-46c7-a15b-a5f722e02c96` ("Patterson Academy")

> [!NOTE]
> **Substitution note.** `Project ID` is a Google Stitch-native concept (`projects/{numeric}`). This
> system has no Stitch project, so the claude.ai/design project UUID is substituted, as the Stitch
> DESIGN.md specification permits. Everything else follows the specification's five-section
> structure verbatim.

> [!IMPORTANT]
> **Provenance.** `[ACAD]` = the design project's own snapshot,
> `_ds/patterson-companies-design-system-3534f94f-a7e6-4612-81d4-6e830716f07d/tokens/*.css`, from the
> handoff export dated 2026-08-12. `[ACADAPP]` = the project's top-level canvases and `support.js`.
> `[BG25 p.N]` = Patterson Companies Brand Guide VERSION 3.2025, page N — **authoritative**.
> `[DS20 p.N]` = DesignSystem_042120, slide N. `[DPL]` = Digital Pattern Library v5.7.2 production
> stylesheet. `[CORP]` = `patterson-corp/plugins/patterson-brand/skills/design-tokens`, the reference
> extraction of the Patterson sources this import is reconciled against. Nothing is invented; gaps
> are written as `[TBD: …]`. Full provenance in [`_SOURCES.md`](_SOURCES.md); the machine-readable
> counterpart to this prose is [`assets/tokens.json`](assets/tokens.json).

> [!WARNING]
> **This is an incubating import, not a ruling.** Where an imported value conflicts with `[BG25]`,
> **the Brand Guide wins** and both values are recorded. Whether this design system or the existing
> `patterson-brand` one supersedes the other is unresolved and escalated — see
> [`_SOURCES.md`](_SOURCES.md) § Escalations.

---

## 1. Visual Theme & Atmosphere

Patterson Academy is a training surface: a self-contained teaching deck about configuring coding
agents, dressed in Patterson's corporate identity. The atmosphere it aims at is **calm, instructional
and quietly modern** — a well-made internal course rather than a marketing page. It reads as
enterprise software that respects the reader's attention.

The aesthetic philosophy is **two blues and a lot of white**. A deep institutional navy and a bright
clinical sky blue carry the identity exactly as the Brand Guide describes them `[BG25 p.24]`;
everything between them is a nine-step cool-grey ramp built for reading. Tertiary green, teal and
purple exist but are held back for data and category coding.

Density is **airy**. The system spaces sections at 64–128px and caps text at a 720px measure, so
long-form instructional copy breathes. Type is **fluid**: seven of the eleven size steps interpolate
with viewport width rather than stepping at breakpoints, which gives the system a continuously
scaling, screen-native feel that no Patterson print source anticipates.

Surfaces are **softly lifted, not flat**. This is the import's sharpest departure from the brand as
`[CORP]` reads it: the project publishes a five-step elevation ramp, tinted with the brand navy at
6–16% alpha rather than neutral black, plus a 3px sky focus ring and a 120/200/320ms motion scale.
`[BG25]` and `[DS20]` publish no elevation scale, no focus treatment and no motion tokens at all, and
`[CORP]` therefore reads Patterson as a flat brand whose only documented shadow is a barely-visible
inset on text inputs. **Both readings cannot be right.** The ramp is carried here, marked
`[TBD: not specified in BG25]`, and flagged for the supersession ruling.

Corners are **rounded on a seven-step ramp**, from a 2px hairline softening on inputs up to a 24px
card and a fully round 999px pill. The Brand Guide publishes exactly one radius — a small 5px
softening `[BG25 p.57]` — so the ramp is a genuine addition and the pill in particular has no
Patterson counterpart.

Tone on screen is instructional and unshouty. Sentence case is the rule `[BG25 p.25, p.59]`; the one
place the import breaks it is the eyebrow label, treated in section 4.

| Adjectives that fit | Adjectives that do not |
|---|---|
| instructional, calm, cool, airy, screen-native, softly lifted | flat, dense, playful, dramatic, warm, decorative |

## 2. Color Palette & Roles

**Primary — reproduced from the Brand Guide exactly.** All eleven brand hexes in the import match
`[BG25 p.24]` byte for byte, PMS annotations included. The import introduces **no new brand colour**.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-003767-003767" alt="003767"> | **Deep Institutional Navy** (PMS 540) | `#003767` | Headings at every level, dark grounds, the strong text alias, and the link hover state. The anchor colour. |
| <img src="https://img.shields.io/badge/-00A8E1-00A8E1" alt="00A8E1"> | **Bright Clinical Sky Blue** (PMS 2995) | `#00A8E1` | The accent: focus rings, brand borders, the oversized stat numeral, and the default CTA fill `[BG25 p.57]`. |
| <img src="https://img.shields.io/badge/-58585B-58585B" alt="58585B"> | **Warm Slate Gray** (PMS Cool Gray 11, 80% black) | `#58585B` | All body copy. Also step 600 of the import's own neutral ramp. |
| <img src="https://img.shields.io/badge/-FFFFFF-FFFFFF" alt="FFFFFF"> | **Pure Paper White** | `#FFFFFF` | Page and card ground; the inverse text colour on navy. |

**Secondary — depth without dominance** `[BG25 p.24]`.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-147EC2-147EC2" alt="147EC2"> | **Confident Mid Blue** (PMS 7683) | `#147EC2` | **Text links**, and the import's informational status hue. |
| <img src="https://img.shields.io/badge/-6DCFF6-6DCFF6" alt="6DCFF6"> | **Soft Aqua Blue** (PMS 297) | `#6DCFF6` | Light supporting fields. |
| <img src="https://img.shields.io/badge/-ECECEC-ECECEC" alt="ECECEC"> | **Barely-There Cool Gray** (PMS Cool Gray 1 at 50%) | `#ECECEC` | The muted section ground; step 100 of the neutral ramp. |

**Tertiary — data and category coding only** `[BG25 p.24]`.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-7BC24D-7BC24D" alt="7BC24D"> | **Fresh Meadow Green** (PMS 369) | `#7BC24D` | Infographic and chart accents. |
| <img src="https://img.shields.io/badge/-00817D-00817D" alt="00817D"> | **Deep Sea Teal** (PMS 7718) | `#00817D` | Infographic accents. The import also elects it as its success hue — see the conflicts below. |
| <img src="https://img.shields.io/badge/-522E91-522E91" alt="522E91"> | **Rich Royal Purple** (PMS 7679) | `#522E91` | Infographic accents and the advanced-difficulty coding in the Academy canvases `[ACADAPP]`. |

**Tints — shipped from the Brand Guide, not from the import.** `[BG25 p.24]` publishes a uniform
three-step ramp over white at 75/50/25, applied identically to every palette colour.

| Swatch | Name | Hex | Step |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-40698D-40698D" alt="40698D"> | **Muted Steel Navy** | `#40698D` | navy 75% |
| <img src="https://img.shields.io/badge/-809BB3-809BB3" alt="809BB3"> | **Hazy Slate Blue** | `#809BB3` | navy 50% |
| <img src="https://img.shields.io/badge/-BFCDD9-BFCDD9" alt="BFCDD9"> | **Pale Mist Blue** | `#BFCDD9` | navy 25% |
| <img src="https://img.shields.io/badge/-40BEE8-40BEE8" alt="40BEE8"> | **Softened Sky** | `#40BEE8` | sky 75% |
| <img src="https://img.shields.io/badge/-80D4F0-80D4F0" alt="80D4F0"> | **Clouded Sky** | `#80D4F0` | sky 50% |
| <img src="https://img.shields.io/badge/-BFE9F8-BFE9F8" alt="BFE9F8"> | **Faint Sky Wash** | `#BFE9F8` | sky 25% |

**Neutral ramp — the import's own, and genuinely new information.** `[BG25]` publishes exactly two
greys; the seven steps between them are the design project's.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-1D1D20-1D1D20" alt="1D1D20"> | **Graphite Ink** | `#1D1D20` | The import's near-black. Defined, but **not** used for headings here — see conflict 1. |
| <img src="https://img.shields.io/badge/-46464A-46464A" alt="46464A"> | **Deep Charcoal** | `#46464A` | Emphasis text one step darker than body. |
| <img src="https://img.shields.io/badge/-7C7C80-7C7C80" alt="7C7C80"> | **Muted Stone Gray** | `#7C7C80` | Secondary and de-emphasised text. |
| <img src="https://img.shields.io/badge/-A3A3A7-A3A3A7" alt="A3A3A7"> | **Soft Pewter** | `#A3A3A7` | Strong borders. |
| <img src="https://img.shields.io/badge/-C9C9CC-C9C9CC" alt="C9C9CC"> | **Overcast Gray** | `#C9C9CC` | Default borders. |
| <img src="https://img.shields.io/badge/-E2E2E4-E2E2E4" alt="E2E2E4"> | **Hairline Silver** | `#E2E2E4` | Subtle borders and card outlines. |
| <img src="https://img.shields.io/badge/-F6F7F8-F6F7F8" alt="F6F7F8"> | **Cool Page Wash** | `#F6F7F8` | The alternating subtle section ground. |

**Status — shipped from the documented implementation, not from the import.** `[BG25]` publishes no
status colours; `[DS20 p.37]` names four states without hexes; `[DPL]` ships the hexes below, and
`[CORP]` carries them.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-D0021B-D0021B" alt="D0021B"> | **Alert Crimson** | `#D0021B` | Error boxes, error text, invalid field borders. |
| <img src="https://img.shields.io/badge/-0CA50F-0CA50F" alt="0CA50F"> | **Signal Green** | `#0CA50F` | Positive/success boxes. |
| <img src="https://img.shields.io/badge/-F5A623-F5A623" alt="F5A623"> | **Attention Amber** | `#F5A623` | Warning text and warning eyebrows. |
| <img src="https://img.shields.io/badge/-003767-003767" alt="003767"> | **Deep Institutional Navy**, white text | `#003767` | The urgent message box. |
| <img src="https://img.shields.io/badge/-147EC2-147EC2" alt="147EC2"> | **Confident Mid Blue** | `#147EC2` | The informational state — the import's own, and a published `[BG25]` colour. `[TBD: no informational state exists in DS20's four.]` |

**Status grounds — the import's own, carried whole.** No Patterson source publishes a status surface,
so these are the only extracted values. `[TBD: not specified in BG25.]`

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-E5F2F1-E5F2F1" alt="E5F2F1"> | **Pale Teal Wash** | `#E5F2F1` | Success message ground. |
| <img src="https://img.shields.io/badge/-E7F1F9-E7F1F9" alt="E7F1F9"> | **Pale Blue Wash** | `#E7F1F9` | Informational message ground. |
| <img src="https://img.shields.io/badge/-FBF1DF-FBF1DF" alt="FBF1DF"> | **Pale Sand Wash** | `#FBF1DF` | Warning message ground. |
| <img src="https://img.shields.io/badge/-F8EAE8-F8EAE8" alt="F8EAE8"> | **Pale Clay Wash** | `#F8EAE8` | Error message ground. |

> [!NOTE]
> The warning and error grounds were mixed against the import's own status hues, which the block
> above supersedes. They therefore pair *loosely*, not exactly, with the shipped crimson and amber.

**Scrim.** A navy at 55% alpha over imagery — `rgba(0, 55, 103, 0.55)`, which is the brand navy in
decimal, so no reconciliation was needed.

### Conflicts against the 2025 Brand Guide

Recorded the way `[CORP]` records the `#00A8E1` versus `#269BCB` palette conflict: **both values, both
sources, Brand Guide default.**

| # | Token | `[BG25]` value — **ships** | Imported value — recorded | Resolution |
|---|---|---|---|---|
| 1 | Heading colour | Navy `#003767` `[BG25 p.24]`, `[DPL]` `.rtf h1/h2/h3` | Graphite Ink `#1D1D20` `[ACAD]` `--text-heading` | Navy. Every Patterson source sets headings navy, and the sibling **lab-workshop** snapshot of this same design system corrects the value to navy itself — the import contradicts its own later revision. |
| 2 | Tint ramp | 75 / 50 / 25 over white `[BG25 p.24]` | 80 / 60 / 40 / 20 / 10, navy and sky only `[ACAD]` | Brand Guide ramp. Both are consistent mixes at different stops, so neither is *wrong*; the step set is a brand decision and `[BG25]` owns it. Imported ramp recorded in `tokens.json`. |
| 3 | Error hue | Alert Crimson `#D0021B` `[DPL]` via `[CORP]` | Palette-harmonised brick red `#c0392b` `[ACAD]` `--pat-danger` | `[DPL]`. `[BG25]` publishes no status colours, so this is a divergence between two implementations rather than a brand ruling — but a design project does not get to redefine the alert palette. |
| 4 | Warning hue | Attention Amber `#F5A623` `[DPL]` via `[CORP]` | Palette-harmonised amber `#d98a00` `[ACAD]` `--pat-warning` | `[DPL]`, same reasoning as 3. |
| 5 | Success hue | Signal Green `#0CA50F` `[DS20 p.8]`, `[DPL]` | Deep Sea Teal `#00817D` `[ACAD]` `--pat-success` | `[DPL]`. Note the import's choice *is* a published `[BG25]` colour and `[DS20]` never names a success hex — the weakest of the five, and worth revisiting at the supersession ruling. |
| 6 | Font stack | `proxima-nova, Arial, sans-serif` `[BG25 p.25]`, `[DPL]` | `proxima-nova`, then **Figtree** (loaded from `fonts.googleapis.com`), then the system stack `[ACAD]`; plus three self-hosted Proxima Nova `woff2` faces | `[BG25]`. `[CORP]` records Figtree as a wrong earlier extraction appearing in **no** Patterson source. Arial is the sanctioned fallback. No binary is shipped. |
| 7 | Spacing grid | 5px `[BG25 p.57]` 30px button padding, `[DPL]` step series | 4px base `[ACAD]` | `[BG25]`. 30px is not expressible on a 4px grid at all. The imported 13-step scale is carried verbatim as `--pat-imp-space-*`. Both grids are reconstructions — `[CORP]` marks its own 5px grid medium-confidence — so this is recorded, not settled. |
| 8 | Radius | 5px `[BG25 p.57]` | 2 / 4 / 6 / 10 / 16 / 24 / 999px `[ACAD]` | `[BG25]` for `--radius`. None of the imported steps is 5px. The ramp is carried as `--pat-imp-radius-*`; the pill has no Patterson counterpart. |
| 9 | Button height | 46px `[BG25 p.57]` | 44px `[ACAD]` `--control-h-md` | `[BG25]`. The import's 44px is a WCAG hit-target floor, not a Patterson value; its three-step control ramp is carried. |
| 10 | Eyebrow case | Sentence case `[BG25 p.25, p.59]`, `[DS20 p.10, p.16]` | Uppercase, `0.08em` tracked `[ACAD]` `.pat-eyebrow` | `[BG25]`. All caps is explicitly rejected for digital channels. The uppercase treatment survives as the opt-in `.pat-eyebrow--caps`. |
| 11 | Link blue | *(silent)* | Confident Mid Blue `#147EC2` `[ACAD]`, `[BG25 p.24]` | **The import wins**, unusually: `[BG25]` names no link colour, and a published brand colour beats an unpublished one. `[DS20 p.8]` specifies a WCAG-adjusted link blue differing only in the green channel — recorded as the alternative, not shipped. |
| 12 | Body line height | 125–150% of size `[BG25 p.27]`; `[CORP]` ships 1.5 | 1.6 `[ACAD]` `--lh-body` | Recorded, **not** overridden. `[BG25]`'s band is stated for print body copy; 160% is ten points above its ceiling. Left as the import's, flagged here. |
| 13 | Body size | 18px `[DPL]` | 16px `[ACAD]` `--fs-body` | Recorded, not overridden. `[BG25]` states no absolute body size, so this is a production divergence rather than a brand violation. |

## 3. Typography Rules

One family carries the whole system: **Proxima Nova**, a humanist geometric sans with wide apertures
and an upright, friendly character, used at every tier `[BG25 p.25]`. It is licensed through Adobe
Fonts and **must be referenced by kit, never bundled** — load `uth1qfm`, which serves 400/500/600/700/800
in normal and italic. Where the kit is absent, **Arial** is the sanctioned fallback `[BG25 p.25]`.

> [!CAUTION]
> The import both inserts **Figtree** into the stack — loaded from `fonts.googleapis.com` — and
> self-hosts three Proxima Nova `woff2` faces. Neither ships here: `[CORP]` records Figtree as a wrong
> earlier extraction present in no Patterson source, and Adobe's terms forbid re-hosting Typekit
> payloads. The snapshot names Adobe Fonts kit `rul6mjk` as its origin; `[CORP]` supersedes that kit
> with `uth1qfm`, which serves the Semibold 600 and Extrabold 800 this system declares. The snapshot's
> font directory arrived empty — the binaries were stripped before import.

A **monospace** tier exists for the Academy's code samples — IBM Plex Mono ahead of the system
monospace stack. `[TBD: Patterson publishes no monospace typeface; this is the import's own choice.]`

**Weight is the hierarchy device.** The import declares seven numeric weights; `[BG25 p.25, p.27]`
names five of them by role.

| Weight | Role |
|---|---|
| **Extrabold 800** | Titles and headlines; the oversized stat numeral. |
| **Bold 700** | The default heading weight in the import's base layer; CTAs `[BG25 p.27]`. |
| **Semibold 600** | Subheads and button labels `[BG25 p.25, p.57]`. |
| **Regular 400** | Body copy and long-form supporting text. |
| **Light 300** | Body-copy alternative where legibility allows `[BG25 p.25]`. |
| Medium 500, Black 900 | The import's own additions. `[TBD: no BG25 counterpart.]` |

**The scale is fluid, and that is the import's signature typographic move.** Seven of eleven steps
are viewport-interpolated rather than fixed:

| Role | Size | Line height | Note |
|---|---|---|---|
| Display | 44px → 72px, continuous | 1.05 | Interpolates across the whole viewport range. |
| Heading 1 | 36px → 52px, continuous | 1.15 | The floor equals `[DPL]`'s fixed 36px h1 exactly. |
| Heading 2 | 28px → 40px, continuous | 1.15 | |
| Heading 3 | 22px → 28px, continuous | 1.2 | |
| Heading 4 | 20px | — | Fixed. |
| Heading 5 | 17px | — | Fixed. |
| Lead | 20px | — | Fixed. |
| Body | 16px | 1.6 | Conflicts 12 and 13 above. |
| Small | 14px | — | |
| Extra small | 12px | — | The eyebrow size. |
| Stat numeral | 40px → 64px, continuous | 1.05 | The signature device. |

`[TBD: no Patterson source publishes a fluid type scale — [BG25 p.27] specifies type relationally and
[DPL] ships fixed pixels.]`

**Letter-spacing is tight, and matches the Brand Guide where it matters.** The import's `snug` step is
`-0.01em`, which is `[BG25 p.27]`'s tracking of −10 exactly, and it is what the base layer applies to
every heading. The `tight` step is `-0.02em` against the Brand Guide's `-0.025em` large-scale value.
A `0.08em` caps step exists solely to letterspace uppercase labels; it is defined but never applied by
default, because `[BG25 p.25]` rejects all caps in digital channels.

**Case is a hard rule: sentence case everywhere.** Titles, headings, body, captions and buttons are
all sentence case `[BG25 p.59]`, `[DS20 p.10]`. All-caps is rejected in digital because it reads as
shouting and degrades screen readers `[BG25 p.25–26]`. The eyebrow is the one place the import breaks
this, and it is corrected — see section 4.

Headings render in navy; body renders in the warm slate gray.

## 4. Component Stylings

* **Buttons:** A **compact rectangle with a small, even corner softening** — never pill-shaped, never
  sharp. Comfortably tall at 46px and sized to its label, with a fixed 30px of breathing space to the
  left and right of the text `[BG25 p.57]`. The default fill is **Bright Clinical Sky Blue with a
  white Semibold label, centred, untracked, in sentence case — never all caps**. Colour transitions
  are short and soft, roughly a fifth of a second on a standard ease. The import's own snapshot
  defines **no button intent tokens at all**; the sibling lab-workshop snapshot of the same design
  system does, and ships a navy primary — that conflict is documented in the
  **lab-workshop-design-tokens** skill, not resolved here.

* **Cards and containers:** **Rounded to a noticeably generous 10px**, a full step softer than the
  Brand Guide's 5px. Grounds are Pure Paper White, or Cool Page Wash where a band must separate from
  the page. Edges are a single hairline of Hairline Silver. **They lift.** The import gives cards a
  soft navy-tinted shadow that deepens on hover, which is the single largest behavioural difference
  between this system and the brand as `[CORP]` reads it — see section 1 and `[TBD]` item 2 in
  section 5.

* **Inputs and forms:** A **thin single stroke around a white field** at the ramp's smallest 2px
  corner, with body-sized text. Focus is unmissable and unmistakably branded: a **3px sky-blue ring**
  glowing outside the control, `rgba(0, 168, 225, 0.45)`. No Patterson source publishes a focus
  treatment at all, so this is the import's own accessibility addition and a genuine contribution.
  Invalid fields take an equivalent ring in the error crimson.

* **Eyebrows:** A small, bold, **sky-blue** label above a section headline. The import sets it in
  **uppercase with wide 0.08em tracking**; that is corrected to **sentence case, untracked**, because
  `[BG25 p.25]` rejects all caps in digital channels and `[DS20 p.10, p.16]` puts eyebrows in sentence
  case. The uppercase treatment remains reachable as an explicit opt-in variant. Note `[DS20 p.16]`
  further states eyebrows are *teal*; the import's sky is kept because `[BG25]` is silent on eyebrow
  colour and `[DS20]` is not the Brand Guide. `[TBD: eyebrow colour is unruled between the two.]`

* **Stat numerals:** An **oversized sky-blue number**, Extrabold, set on a tight 1.05 leading and
  pulled in at `-0.02em`, scaling continuously from 40px to 64px. It is the system's one piece of
  visual theatre and its most recognisable device.

* **Alerts:** Four states with tinted grounds — success on a pale teal wash, informational on a pale
  blue wash, warning on a pale sand wash, error on a pale clay wash. The foreground hues are the
  documented `[DPL]` implementation values, not the import's harmonised ones (conflicts 3–5).
  `[DS20 p.37]` warns that other patterns must never be repurposed as alerts, and that the error state
  must never be used when the user did nothing wrong.

## 5. Layout Principles

**Two spacing rhythms exist, and only one of them ships as the default.** The Brand Guide's 5px grid
is Tailwind's base unit here, because `[BG25 p.57]`'s explicit 30px button padding lands on it and
cannot land on a 4px one. The import's own thirteen-step 4px scale — 0, 4, 8, 12, 16, 24, 32, 40, 48,
64, 80, 96, 128px — is carried verbatim alongside it under a distinct `--pat-imp-space-*` namespace,
so the design project's real rhythm is preserved and unmistakable. `[TBD: no Patterson source
publishes a named spacing scale; both grids are reconstructions, which is why this is recorded rather
than settled.]`

**Content is bounded and centred, with a separate reading measure.** The page wrapper caps at 1240px;
prose caps at a much tighter 720px, which is what makes long instructional passages readable. `[DPL]`
caps its own wrapper at 1300px instead. `[TBD: BG25 publishes no page width, so neither supersedes the
other.]`

**The gutter breathes with the viewport.** Horizontal padding inside the container interpolates
continuously from 20px on a phone to 64px on a wide monitor, rather than stepping at breakpoints — the
same fluid philosophy as the type scale, and equally without a Patterson precedent.

**Whitespace strategy: generous vertically, disciplined horizontally.** Section rhythm sits at the
64–128px end of the scale; within a section, elements cluster on the small steps so related content
reads as one unit. Separation is by ground change or hairline, and — departing from `[CORP]`'s reading
of the brand — sometimes by elevation.

**Motion is short and restrained.** Three durations (120 / 200 / 320ms) against two curves: a standard
`cubic-bezier(0.2, 0, 0.2, 1)` and a decelerating `cubic-bezier(0.16, 1, 0.3, 1)` for entrances. Fades
and short slides only. `[DPL]`'s single documented transition — `background-color .3s ease-out` on
`.button` — is compatible with the slow step. `[TBD: no Patterson source publishes motion tokens.]`

**Recorded gaps.** Every item below is something no Patterson source addresses. They are listed here
so the gap travels with the artifact, and enumerated machine-readably in `tokens.json._tbd`.

1. **The supersession ruling itself.** Whether this design system or the existing `patterson-brand`
   one is authoritative is unresolved. This extraction incubates in `patterson-labs` and asserts
   nothing about it.
2. **The elevation scale.** Five navy-tinted steps against a brand `[CORP]` reads as flat. The single
   most consequential open question in this import.
3. **The focus treatment.** The 3px sky ring is the import's own; Patterson publishes none.
4. **Motion tokens.** Three durations and two easings, none published.
5. **The fluid type scale.** Seven clamp() steps, no Patterson precedent.
6. **The monospace face.** Patterson publishes none.
7. **The named spacing scale.** Neither the import's 4px nor `[CORP]`'s 5px grid is published as a
   named scale.
8. **Page width.** 1240px imported against 1300px `[DPL]`.
9. **Status colours and surfaces.** `[BG25]` publishes none; both candidate sets are implementation
   values.
10. **The informational state.** `[DS20 p.37]` names four states and no informational one.
11. **Self-hosted Proxima Nova licensing.** The snapshot describes its `woff2` faces as licensed
    binaries supplied by the brand team; `[CORP]`'s position is that Adobe's terms forbid re-hosting.
    Unconfirmed either way. No binary is shipped here and the export's font directory was empty.
12. **What the design project could not read.** Its own readme records that the Brand Guide PDF
    exceeded 30 MB and could not be opened inside the project — its colour tokens were built from a
    single palette-page image, and the sections it inferred from public websites are not independently
    verifiable from this snapshot.
