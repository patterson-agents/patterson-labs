# Design System: lab-workshop (imported)

**Project ID:** `claude.ai/design → 13a03949-51b5-4210-95d1-75f022b3543d` ("lab-workshop", TechDays:
AI Fluency — Agentic Agents)

> [!NOTE]
> **Substitution note.** `Project ID` is a Google Stitch-native concept (`projects/{numeric}`). This
> system has no Stitch project, so the claude.ai/design project UUID is substituted, as the Stitch
> DESIGN.md specification permits. Everything else follows the specification's five-section
> structure verbatim.

> [!IMPORTANT]
> **Provenance.** `[LABWS]` = the design project's own snapshot,
> `_ds/patterson-design-system-3534f94f-a7e6-4612-81d4-6e830716f07d/tokens/*.css`, from the handoff
> export dated 2026-08-12. `[LABDECK]` = the project's own deck stylesheet,
> `ai-fluency-agentic-agents.css`. `[LABPROD]` = values the snapshot labels **VERIFIED** or
> **PRODUCTION**, describing itself as read from the live theme stylesheet — **second-hand: the
> snapshot's claim, not an independent read by this extraction**. `[BG25 p.N]` = Patterson Companies
> Brand Guide VERSION 3.2025, page N — **authoritative**. `[DS20 p.N]` = DesignSystem_042120, slide N.
> `[DPL]` = Digital Pattern Library v5.7.2 production stylesheet. `[CORP]` =
> `patterson-corp/plugins/patterson-brand/skills/design-tokens`, the reference extraction of the
> Patterson sources this import is reconciled against. Nothing is invented; gaps are written as
> `[TBD: …]`. Full provenance in [`_SOURCES.md`](_SOURCES.md); the machine-readable counterpart to
> this prose is [`assets/tokens.json`](assets/tokens.json).

> [!WARNING]
> **This is an incubating import, not a ruling.** Where an imported value conflicts with `[BG25]`,
> **the Brand Guide wins** and both values are recorded. Whether this design system or the existing
> `patterson-brand` one supersedes the other is unresolved and escalated — see
> [`_SOURCES.md`](_SOURCES.md) § Escalations.

> [!NOTE]
> **This is the later of two snapshots of one design system.** The **Patterson Academy** project binds
> the *same* design-system UUID `3534f94f-a7e6-4612-81d4-6e830716f07d` under a different slug. This
> snapshot adds a production-verified layer the Academy one has no trace of, and **corrects two of the
> Academy snapshot's own choices** — headings to navy, eyebrows to sentence case. Compare against the
> **academy-design-tokens** skill before choosing between them.

---

## 1. Visual Theme & Atmosphere

lab-workshop is a **training-day surface**: a 16:9 conference deck and an accompanying lab workbook
for a session on agentic AI, dressed in Patterson's corporate identity. The atmosphere it aims at is
**clean, corporate and calm — never flashy**, which is the snapshot's own phrasing for itself. It
reads as a company all-hands rather than a product launch.

The aesthetic philosophy is **two blues on generous white**: a deep institutional navy and a bright
clinical sky carry the identity exactly as `[BG25 p.24]` describes them, with cool greys carrying
text and structure. Tertiary green, teal and purple exist but are reserved for charts and
infographics, **never as page chrome**. The snapshot describes the mood as *cool, clean,
clinical-but-human*.

Density is **airy**. Sections rhythm at 64–128px, the page wrapper caps around 1240px and prose caps
at a 720px measure. White space is treated as part of the brand rather than as leftover.

**Two type scales live here, and they genuinely disagree.** The design system's own scale is fluid —
seven of eleven steps interpolate with viewport width. Alongside it sits a **production scale** the
snapshot claims to have read off the live Patterson theme: fixed sizes, 18px body on a tight 1.33
leading, weight 800 at the top two heading levels dropping hard to 400 from the third down, and one
step-up at a single desktop breakpoint. They are carried side by side rather than merged, because
merging them would require inventing a reconciliation neither source supports.

Surfaces are **softly lifted — but this snapshot argues with itself about how much**. The design
system publishes a five-step elevation ramp tinted with brand navy at 6–16% alpha. Its own production
observation records exactly **one** shadow, on download buttons, in **neutral black** at 4–12% alpha.
`[CORP]` reads Patterson as a flat brand whose only documented shadow is an inset on text inputs.
The production observation sits much closer to `[CORP]` than to the system ramp, which is the most
useful new evidence this snapshot contributes to the supersession question.

Corners are **small and restrained**. Production softens buttons by 5px, lifts download buttons to
6px and barely rounds fields at 2px; **there is no pill shape in production at all**. The 5px button
radius agrees with `[BG25 p.57]` exactly. Slides are a deliberate exception: **flat rectangles with
square corners**, which the project states outright.

Tone is instructional and unshouty. Sentence case is the rule `[BG25 p.25, p.59]`, and — unlike the
Academy snapshot — this one already follows it for eyebrows.

| Adjectives that fit | Adjectives that do not |
|---|---|
| corporate, calm, cool, clinical-but-human, airy, restrained, verified | flashy, dense, playful, decorative, warm, pill-shaped |

## 2. Color Palette & Roles

**Primary — reproduced from the Brand Guide exactly.** All eleven brand hexes match `[BG25 p.24]`,
PMS annotations included. The import introduces **no new brand colour**. The snapshot corroborates
the set independently against the official PowerPoint theme palette.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-003767-003767" alt="003767"> | **Deep Institutional Navy** (PMS 540) | `#003767` | Headings at **every** level, hero and emphasis bands, the strong text alias, the link hover, and the eyebrow label. The anchor colour. |
| <img src="https://img.shields.io/badge/-00A8E1-00A8E1" alt="00A8E1"> | **Bright Clinical Sky Blue** (PMS 2995) | `#00A8E1` | The accent: focus rings, brand borders, emphasis words, the oversized stat numeral, and the default CTA fill `[BG25 p.57]`. |
| <img src="https://img.shields.io/badge/-58585B-58585B" alt="58585B"> | **Warm Slate Gray** (PMS Cool Gray 11, 80% black) | `#58585B` | All body copy. Also step 600 of the neutral ramp. |
| <img src="https://img.shields.io/badge/-FFFFFF-FFFFFF" alt="FFFFFF"> | **Pure Paper White** | `#FFFFFF` | Page and card ground; the inverse text colour on navy. |

**Secondary — depth without dominance** `[BG25 p.24]`.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-147EC2-147EC2" alt="147EC2"> | **Confident Mid Blue** (PMS 7683) | `#147EC2` | **Text links**, the informational status hue, and the slide-title colour on the PowerPoint master. |
| <img src="https://img.shields.io/badge/-6DCFF6-6DCFF6" alt="6DCFF6"> | **Soft Aqua Blue** (PMS 297) | `#6DCFF6` | Light supporting fields; the snapshot's own secondary-button fill — see conflict 2. |
| <img src="https://img.shields.io/badge/-ECECEC-ECECEC" alt="ECECEC"> | **Barely-There Cool Gray** (PMS Cool Gray 1 at 50%) | `#ECECEC` | The muted section ground; step 100 of the neutral ramp. |

**Tertiary — data and category coding only** `[BG25 p.24]`.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-7BC24D-7BC24D" alt="7BC24D"> | **Fresh Meadow Green** (PMS 369) | `#7BC24D` | Infographic and chart accents. |
| <img src="https://img.shields.io/badge/-00817D-00817D" alt="00817D"> | **Deep Sea Teal** (PMS 7718) | `#00817D` | Infographic accents. The import also elects it as its success hue — see conflict 5. |
| <img src="https://img.shields.io/badge/-522E91-522E91" alt="522E91"> | **Rich Royal Purple** (PMS 7679) | `#522E91` | Infographic accents. |

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

**Neutral ramp — the import's own.** `[BG25]` publishes exactly two greys; the steps between them are
the design project's.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-1D1D20-1D1D20" alt="1D1D20"> | **Graphite Ink** | `#1D1D20` | The near-black. A ramp step only — **this snapshot does not use it for headings**, unlike the Academy one. |
| <img src="https://img.shields.io/badge/-46464A-46464A" alt="46464A"> | **Deep Charcoal** | `#46464A` | Emphasis text one step darker than body; deck body copy on light grounds. |
| <img src="https://img.shields.io/badge/-7C7C80-7C7C80" alt="7C7C80"> | **Muted Stone Gray** | `#7C7C80` | Secondary and de-emphasised text. |
| <img src="https://img.shields.io/badge/-A3A3A7-A3A3A7" alt="A3A3A7"> | **Soft Pewter** | `#A3A3A7` | Strong borders. |
| <img src="https://img.shields.io/badge/-C9C9CC-C9C9CC" alt="C9C9CC"> | **Overcast Gray** | `#C9C9CC` | Default borders. |
| <img src="https://img.shields.io/badge/-E2E2E4-E2E2E4" alt="E2E2E4"> | **Hairline Silver** | `#E2E2E4` | Subtle borders and card outlines. |
| <img src="https://img.shields.io/badge/-F6F7F8-F6F7F8" alt="F6F7F8"> | **Cool Page Wash** | `#F6F7F8` | The alternating subtle section ground. |

**The warm neutral — new information, and the single oddest value in the import.** Every other grey
in Patterson's world is cool. This one is not, and the snapshot is emphatic that it is deliberate.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-AFA593-AFA593" alt="AFA593"> | **Warm Taupe** | `#AFA593` | Input, select and textarea borders. `[LABPROD]` marks it VERIFIED and warns explicitly against "correcting" it to a cool grey. `[TBD: appears in no BG25, DS20 or DPL value CORP extracted; the production claim is unconfirmed.]` |
| <img src="https://img.shields.io/badge/-D9D9D9-D9D9D9" alt="D9D9D9"> | **Neutral Silver** | `#D9D9D9` | Carousel dot and track. `[TBD: no BG25 counterpart.]` |

**Interaction states — the largest single thing this snapshot adds.** The Academy snapshot ships no
button intent tokens at all. These are `[LABPROD]`, and they describe a **navy** ladder.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-315D83-315D83" alt="315D83"> | **Lifted Slate Navy** | `#315D83` | Primary button hover in the imported ladder — navy lightening to navy, explicitly *not* to sky. `[TBD: BG25 publishes no hover state.]` |
| <img src="https://img.shields.io/badge/-93A9BC-93A9BC" alt="93A9BC"> | **Faded Harbor Blue** | `#93A9BC` | Primary button disabled. `[TBD: DPL disables to its field-border grey instead.]` |
| <img src="https://img.shields.io/badge/-96DBF6-96DBF6" alt="96DBF6"> | **Lightened Aqua** | `#96DBF6` | Secondary button hover. `[TBD: no BG25 counterpart.]` |
| <img src="https://img.shields.io/badge/-DAEDF5-DAEDF5" alt="DAEDF5"> | **Pale Ice Blue** | `#DAEDF5` | Secondary button disabled. `[TBD: no BG25 counterpart.]` |

> [!IMPORTANT]
> The shipped primary fill is **sky** `[BG25 p.57]`, but this hover ladder was mixed for **navy**. The
> two are exposed but deliberately **not wired together** — a sky button hovering to navy would be
> incoherent. Pick the Brand Guide button or the production button; do not blend them.

**Deck palette — the dark navy theme** `[LABDECK]`. Four grounds from the project's own deck
stylesheet, not from the design-system snapshot. `[TBD: BG25 publishes no dark theme.]`

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-0C4676-0C4676" alt="0C4676"> | **Raised Panel Navy** | `#0C4676` | Raised navy panel on the dark deck theme. |
| <img src="https://img.shields.io/badge/-08355F-08355F" alt="08355F"> | **Inset Navy** | `#08355F` | Code and inset surfaces. |
| <img src="https://img.shields.io/badge/-01243F-01243F" alt="01243F"> | **Stage Surround Navy** | `#01243F` | The surround behind the slide stage. |
| <img src="https://img.shields.io/badge/-D3E0EC-D3E0EC" alt="D3E0EC"> | **Pale Steel Text** | `#D3E0EC` | Secondary text on the dark theme. |

**Status — shipped from the documented implementation, not from the import.** `[BG25]` publishes no
status colours; `[DS20 p.37]` names four states without hexes; `[DPL]` ships the hexes below.

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-D0021B-D0021B" alt="D0021B"> | **Alert Crimson** | `#D0021B` | Error boxes, error text, invalid field borders. |
| <img src="https://img.shields.io/badge/-0CA50F-0CA50F" alt="0CA50F"> | **Signal Green** | `#0CA50F` | Positive/success boxes. |
| <img src="https://img.shields.io/badge/-F5A623-F5A623" alt="F5A623"> | **Attention Amber** | `#F5A623` | Warning text and warning eyebrows. |
| <img src="https://img.shields.io/badge/-003767-003767" alt="003767"> | **Deep Institutional Navy**, white text | `#003767` | The urgent message box. |
| <img src="https://img.shields.io/badge/-147EC2-147EC2" alt="147EC2"> | **Confident Mid Blue** | `#147EC2` | The informational state — the import's own, and a published `[BG25]` colour. `[TBD: no informational state exists in DS20's four.]` |

**Status grounds — the import's own, carried whole.** No Patterson source publishes a status surface.
`[TBD: not specified in BG25.]`

| Swatch | Name | Hex | Role |
|---|---|---|---|
| <img src="https://img.shields.io/badge/-E5F2F1-E5F2F1" alt="E5F2F1"> | **Pale Teal Wash** | `#E5F2F1` | Success message ground. |
| <img src="https://img.shields.io/badge/-E7F1F9-E7F1F9" alt="E7F1F9"> | **Pale Blue Wash** | `#E7F1F9` | Informational message ground. |
| <img src="https://img.shields.io/badge/-FBF1DF-FBF1DF" alt="FBF1DF"> | **Pale Sand Wash** | `#FBF1DF` | Warning message ground. |
| <img src="https://img.shields.io/badge/-F8EAE8-F8EAE8" alt="F8EAE8"> | **Pale Clay Wash** | `#F8EAE8` | Error message ground. |

> [!NOTE]
> The warning and error grounds were mixed against the import's own status hues, which the block
> above supersedes. They therefore pair *loosely*, not exactly, with the shipped crimson and amber.

**Scrim.** A navy at 55% alpha over imagery — `rgba(0, 55, 103, 0.55)`, the brand navy in decimal, so
no reconciliation was needed.

### Conflicts against the 2025 Brand Guide

Recorded the way `[CORP]` records the `#00A8E1` versus `#269BCB` palette conflict: **both values,
both sources, Brand Guide default.**

| # | Token | `[BG25]` value — **ships** | Imported value — recorded | Resolution |
|---|---|---|---|---|
| 1 | Primary button fill | **Sky** `#00A8E1` `[BG25 p.57]` "Default color: Sky blue", white text | **Navy** `#003767` `[LABPROD]`, with the instruction "primary hover is a LIGHTER NAVY — not sky. Do not substitute." | `[BG25]`. The instruction describes what the live storefront does; that is not a Brand Guide ruling, and it is read as **data, not direction**. The navy ladder is carried unwired. The largest live disagreement in this import. |
| 2 | Secondary button | White field, navy outline, navy label `[DS20 p.15]` | A **filled** light blue `#6DCFF6` `[LABPROD]` | `[DS20]`. `[BG25]` does not address secondary buttons at all, so this is the only Patterson specification in evidence. |
| 3 | Error hue | Alert Crimson `#D0021B` `[DPL]` via `[CORP]` | Palette-harmonised brick red `#c0392b` `[LABWS]` `--pat-danger`, annotated "harmonized to palette" | `[DPL]`. A design project does not get to redefine the alert palette. Identical to the Academy snapshot's conflict. |
| 4 | Warning hue | Attention Amber `#F5A623` `[DPL]` via `[CORP]` | Palette-harmonised amber `#d98a00` `[LABWS]` `--pat-warning` | `[DPL]`, same reasoning as 3. |
| 5 | Success hue | Signal Green `#0CA50F` `[DS20 p.8]`, `[DPL]` | Deep Sea Teal `#00817D` `[LABWS]` `--pat-success` | `[DPL]`. The weakest of the three status conflicts — the import's choice *is* a published `[BG25]` tertiary and `[DS20]` never names a success hex. Worth revisiting at the ruling. |
| 6 | Font stack | `proxima-nova, Arial, sans-serif` `[BG25 p.25]`, `[DPL]` | `proxima-nova`, then **Figtree** (imported from `fonts.googleapis.com`), then the system stack `[LABWS]`; plus three self-hosted Proxima Nova `woff2` faces, from Adobe kit `rul6mjk` | `[BG25]`. `[CORP]` records Figtree as a wrong earlier extraction appearing in **no** Patterson source. Arial is the sanctioned fallback. Kit `rul6mjk` is superseded by `uth1qfm`. No binary is shipped. |
| 7 | Spacing grid | 5px `[BG25 p.57]` 30px button padding, `[DPL]` step series | 4px base `[LABWS]` | `[BG25]`. 30px is not expressible on a 4px grid at all. The imported 13-step scale is carried verbatim as `--pat-imp-space-*`. Both grids are reconstructions, so this is recorded, not settled. |
| 8 | Radius (default) | 5px `[BG25 p.57]` | A seven-step 2/4/6/10/16/24/999px ramp `[LABWS]` | `[BG25]` for `--radius`. **But note the production layer agrees with `[BG25]` exactly** — `--radius-btn` is 5px — which is the strongest corroboration anywhere in this import. The system ramp is carried as `--pat-imp-radius-*`; the pill has no Patterson counterpart and the snapshot says so itself. |
| 9 | Button height | 46px `[BG25 p.57]` | 44px system default, **50px** production box `[LABPROD]` | `[BG25]`. Three values, all kept distinct rather than averaged. The 44px is a WCAG hit-target floor, not a Patterson value. |
| 10 | Heading tracking | Tracking −10, i.e. `-0.01em` `[BG25 p.27]` | **No letter-spacing anywhere** `[LABPROD]` | `[BG25]`. The snapshot observes production declares no tracking at all; the Brand Guide value ships. Recorded because the two are directly opposed. |
| 11 | Body size | 18px `[DPL]` and `[LABPROD]` | 16px `[LABWS]` `--fs-body` | Recorded, **not** overridden. `[BG25]` states no absolute body size. Note both production sources agree on 18px against the system scale's 16px. |
| 12 | Body line height | 125–150% of size `[BG25 p.27]`; `[CORP]` ships 1.5 | 1.6 system, **1.33** production `[LABPROD]` | Recorded, not overridden. The production leading is *below* `[BG25]`'s floor and the system leading is above its ceiling — the two imported values straddle the Brand Guide band from both sides. |
| 13 | Production type scale | h1 36px, h3 18px bold `[DPL]` via `[CORP]` | h1 44/64px, h3 24/36px at weight **400** `[LABPROD]` | Recorded, unresolved. **Both claim to describe production** and they disagree materially. This is the clearest evidence that `[LABPROD]` needs an independent verification pass. |
| 14 | Slide card radius | 5px for on-screen controls `[BG25 p.57]` | **0px** — flat rectangles `[LABDECK]` | Recorded, not overridden. A slide is not a control, so the rules do not strictly collide, but the project states the square corner is deliberate and it is explicit enough to name. |
| 15 | Field border | Cool greys throughout `[DPL]` via `[CORP]` | **Warm taupe** `#AFA593` `[LABPROD]` | Recorded, carried. The snapshot warns against normalising it. It appears in no `[CORP]`-extracted value, so the production claim is unconfirmed rather than contradicted. |
| 16 | Link blue | *(silent)* | Confident Mid Blue `#147EC2` `[LABWS]`, `[BG25 p.24]` | **The import wins**, unusually: `[BG25]` names no link colour, and a published brand colour beats an unpublished one. `[DS20 p.8]` specifies a WCAG-adjusted link blue differing only in the green channel — recorded as the alternative, not shipped. |

> [!NOTE]
> **Two Academy conflicts do not appear here, because this snapshot already fixed them.** The Academy
> snapshot pointed headings at its near-black ink and set eyebrows in uppercase. This one sets every
> heading to navy and eyebrows to sentence case, matching `[BG25]` without needing reconciliation.
> That is the concrete evidence that this snapshot is the later of the two.

## 3. Typography Rules

One family carries the whole system: **Proxima Nova**, a humanist geometric sans with wide apertures
and an upright, friendly character, used at every tier `[BG25 p.25]`. It is licensed through Adobe
Fonts and **must be referenced by kit, never bundled** — load `uth1qfm`, which serves
400/500/600/700/800 in normal and italic. Where the kit is absent, **Arial** is the sanctioned
fallback `[BG25 p.25]`, and it is also the PowerPoint-safe substitute for the deck templates.

> [!CAUTION]
> The import both inserts a free Google fallback family into the stack and self-hosts three Proxima
> Nova `woff2` faces. Neither ships here: `[CORP]` records that family as a wrong earlier extraction
> present in no Patterson source, and Adobe's terms forbid re-hosting Typekit payloads. The snapshot's
> font directory arrived empty — the binaries were stripped before import.

> [!NOTE]
> **The snapshot's licensing warning is a kit-selection problem, not a licensing one.** It asserts
> that only 400 and 700 are licensed faces and that 500/600/800 therefore render as browser-synthesized
> faux bold. `[CORP]` verified on 2026-08-11 that the kit the snapshot names serves only 400/700, while
> kit `uth1qfm` serves five weights. Under `uth1qfm` the Semibold 600 and Extrabold 800 this system
> declares render as **real faces**. The snapshot's conclusion — "treat 700 as the real bold ceiling" —
> does not follow once the right kit is loaded.

A **monospace** tier exists for the workshop's code samples — IBM Plex Mono ahead of the system
monospace stack. `[TBD: Patterson publishes no monospace typeface; this is the import's own choice.]`

**An icon font joins the type system**, which the Academy snapshot has no trace of. See section 4.

**Weight is the hierarchy device.** Seven numeric weights are declared; `[BG25 p.25, p.27]` names five
of them by role.

| Weight | Role |
|---|---|
| **Extrabold 800** | Titles and headlines; the oversized stat numeral; production h1 and h2. |
| **Bold 700** | The default heading weight in the system base layer; CTAs `[BG25 p.27]`. |
| **Semibold 600** | Subheads and button labels `[BG25 p.25, p.57]`. |
| **Medium 500** | The production eyebrow weight — a role the Academy snapshot did not assign. |
| **Regular 400** | Body copy, captions, and **production h3 and h4**. |
| **Light 300** | Body-copy alternative where legibility allows `[BG25 p.25]`. |
| Black 900 | The import's own addition. `[TBD: no BG25 counterpart.]` |

### The two scales

**The system scale is fluid.** Seven of eleven steps are viewport-interpolated rather than fixed.

| Role | Size | Line height | Note |
|---|---|---|---|
| Display | 44px → 72px, continuous | 1.05 | Interpolates across the whole viewport range. |
| Heading 1 | 36px → 52px, continuous | 1.15 | |
| Heading 2 | 28px → 40px, continuous | 1.15 | |
| Heading 3 | 22px → 28px, continuous | 1.2 | |
| Heading 4 | 20px | — | Fixed. |
| Heading 5 | 17px | — | Fixed. |
| Lead | 20px | — | Fixed. |
| Body | 16px | 1.6 | Conflicts 11 and 12 above. |
| Small | 14px | — | |
| Extra small | 12px | — | |
| Stat numeral | 40px → 64px, continuous | 1.05 | The signature device. |

**The production scale is fixed, paired and steps once.** Opt in per subtree with
`class="pat-production"`. Every value here is `[LABPROD]` — second-hand.

| Role | Mobile size / leading | Desktop size / leading | Weight |
|---|---|---|---|
| Heading 1 | 44px / 48px | 64px / 68px | **800** |
| Heading 2 | 36px / 40px | 44px / 48px | **800** |
| Heading 3 | 24px / 28px | 36px / 40px | **400** — regular, not bold |
| Heading 4 | 24px / 28px | — | **400** |
| Body | 18px / 24px | — | 400 |
| Eyebrow | 14px / 22px | — | 500 |
| Caption | 14px / 16px | — | 400 |
| Button | 15px / 20px | — | 600 |

The step-up happens at a single **1024px** minimum-width breakpoint. `[TBD: DPL reflows at 600px and
900px max-width instead — different systems, no brand ruling.]`

> [!WARNING]
> The two scales are **not** merged, and neither is deleted. They disagree on body size (18 against
> 16), on body leading (1.33 against 1.6) and on whether the third heading level is bold. `[BG25 p.27]`
> specifies type relationally rather than in pixels, so it rules on neither. Choose one per surface.

**Letter-spacing.** The system's `snug` step is `-0.01em`, which is `[BG25 p.27]`'s tracking of −10
exactly, and it is what the base layer applies to headings. `[LABPROD]` observes that production
declares **no letter-spacing anywhere** — the direct opposite. The Brand Guide value ships
(conflict 10). A `0.08em` caps step exists solely for the opt-in uppercase eyebrow.

**Case is a hard rule: sentence case.** Titles, headings, body, captions and buttons are all sentence
case `[BG25 p.59]`, `[DS20 p.10]`. All-caps is rejected in digital because it reads as shouting and
degrades screen readers `[BG25 p.25–26]`. Title Case is reserved for the brand promise and product
brands.

> [!NOTE]
> **An internal inconsistency in the snapshot, recorded not resolved.** Its readme's summary line says
> eyebrows are "UPPERCASE and letter-spaced", while both its own `base.css` and the readme's own
> typography section set the default eyebrow to **sentence case**, keeping uppercase as a named
> opt-in variant. The code and the specific prose agree with each other and with `[BG25]`; the summary
> line is the outlier and is treated as stale.

Headings render in navy at every level; body renders in the warm slate gray.

## 4. Component Stylings

* **Buttons:** A **compact rectangle with a small, even corner softening** — never pill-shaped, never
  sharp. Comfortably tall at 46px `[BG25 p.57]`, sized to its label with a fixed 30px of breathing
  space left and right. The shipped fill is **Bright Clinical Sky Blue with a white Semibold label,
  centred, untracked, in sentence case — never all caps**. Colour transitions are short and soft,
  around a fifth of a second. **This snapshot ships a full production ladder the Academy one lacks**:
  a navy primary lightening to a slate navy on hover and fading to a muted harbour blue when
  disabled, plus a light-blue secondary with its own hover and disabled steps. The navy primary is
  superseded by `[BG25]`'s sky (conflict 1) and the ladder is exposed but unwired. Download and
  external-link buttons are the one elevated control: a slightly rounder 6px corner and the single
  production shadow.

* **Cards and containers:** **Rounded to a noticeably generous 10px**, a full step softer than the
  Brand Guide's 5px. Grounds are Pure Paper White, or Cool Page Wash where a band must separate from
  the page. Edges are a single hairline of Hairline Silver, optionally with a 4px accent stripe along
  the top. **They lift** — a soft navy-tinted shadow deepening by about 3px on hover for interactive
  cards.

* **Slides:** The deck is a 1920 × 1080 canvas reversed from the corporate PowerPoint master. Shapes
  on slides are **flat rectangles with square corners** — stated outright, and a deliberate departure
  from the 5px softening used everywhere else (conflict 14). Slide padding is generous and
  asymmetric: roughly 72px above, 56px below and 110px at each side, with items separated by 28px
  and rules drawn at a hairline-and-a-half. The dark theme drops the whole stage onto the deck navy
  grounds listed in section 2.

* **Inputs and forms:** A **thin single stroke around a white field**, barely rounded at 2px, with
  body-sized text. The stroke is the **warm taupe** — the one place that non-cool grey is
  load-bearing, and the snapshot warns against normalising it (conflict 15). Focus is unmissable and
  unmistakably branded: a **3px sky-blue ring** glowing outside the control,
  `rgba(0, 168, 225, 0.45)`. The snapshot notes production ships **no branded focus style at all**,
  so this is the design system's own accessibility addition and a genuine contribution. Invalid
  fields take an equivalent ring in the error crimson.

* **Icons:** The **official Patterson icon font**, which the Academy snapshot does not carry. It is a
  font rather than a stroke set, so glyphs inherit colour and size from their context and there is
  nothing to stroke. Three sizes: a 14px inline glyph, a 20px default and a 24px large.
  **No binary ships here** — the family is registered by name only, `theme.css` declares no
  `@font-face`, and the export's font directory was empty. Every glyph sits in a private-use
  codepoint and reads as nothing to a screen reader, so **always pair one with a text label or an
  `aria-label`**. `[TBD: redistribution licensing is unconfirmed; BG25 p.41 places the icon library
  on SharePoint.]`

* **Eyebrows:** A small **navy** label above a section headline, 14px at weight 500, **sentence case
  and untracked**. This is the snapshot's own default and it already matches `[BG25 p.25]` and
  `[DS20 p.10, p.16]` — no correction was needed, unlike the Academy snapshot. "Trusted expertise"
  and "Unrivaled support" are used verbatim as eyebrows on the live sites. The uppercase sky
  treatment remains available as an explicit opt-in variant. Note `[DS20 p.16]` states eyebrows are
  *teal*; navy is kept because `[BG25]` is silent on eyebrow colour and `[DS20]` is not the Brand
  Guide. `[TBD: eyebrow colour is unruled between the two.]`

* **Stat numerals:** An **oversized sky-blue number**, Extrabold, on a tight 1.05 leading and pulled
  in at `-0.02em`, scaling continuously from 40px to 64px. The system's one piece of visual theatre.

* **Alerts:** Four states with tinted grounds — success on a pale teal wash, informational on a pale
  blue wash, warning on a pale sand wash, error on a pale clay wash. The foreground hues are the
  documented `[DPL]` implementation values, not the import's harmonised ones (conflicts 3–5).
  `[DS20 p.37]` warns that other patterns must never be repurposed as alerts, and that the error
  state must never be used when the user did nothing wrong.

## 5. Layout Principles

**Two spacing rhythms exist, and only one ships as the default.** The Brand Guide's 5px grid is
Tailwind's base unit here, because `[BG25 p.57]`'s explicit 30px button padding lands on it and
cannot land on a 4px one. The import's own thirteen-step 4px scale — 0, 4, 8, 12, 16, 24, 32, 40, 48,
64, 80, 96, 128px — is carried verbatim alongside it under a distinct `--pat-imp-space-*` namespace,
so the design project's real rhythm is preserved and unmistakable. `[TBD: no Patterson source
publishes a named spacing scale; both grids are reconstructions.]`

**Content is bounded and centred, with a separate reading measure.** The system wrapper caps at
1240px and prose at a much tighter 720px. `[LABPROD]` records the live wrapper at **1259px** and
`[DPL]` caps its own at 1300px. `[TBD: three widths in evidence and no brand publication, so none
supersedes the others.]`

**The gutter breathes with the viewport.** Horizontal padding inside the container interpolates
continuously from 20px on a phone to 64px on a wide monitor rather than stepping at breakpoints —
the same fluid philosophy as the system type scale. The production type scale, by contrast, steps
once at 1024px, so the two layers disagree about whether the system is fluid or stepped at all.

**Whitespace strategy: generous vertically, disciplined horizontally.** Section rhythm sits at the
64–128px end of the scale; within a section, elements cluster on the small steps so related content
reads as one unit. Separation is by ground change or hairline, and sometimes by elevation.

**Motion is short and restrained, and the production layer is stricter than the system.** The system
publishes three durations (120 / 200 / 320ms) against two curves — a standard
`cubic-bezier(0.2, 0, 0.2, 1)` and a decelerating `cubic-bezier(0.16, 1, 0.3, 1)` for entrances.
`[LABPROD]` records production as animating **only** background-colour, border-colour, colour,
transform and height, over 100–200ms, on plain easings — nothing else moves. `[TBD: no Patterson
source publishes motion tokens.]`

**Recorded gaps.** Every item below is something no Patterson source addresses, or a claim this
extraction could not verify. They are listed here so the gap travels with the artifact, and
enumerated machine-readably in `tokens.json._tbd`.

1. **The supersession ruling itself.** Unresolved. This extraction incubates in `patterson-labs` and
   asserts nothing about it. The evidence this snapshot adds: it shares a design-system UUID with the
   Academy snapshot, is the later of the two, and corrects that snapshot's heading colour and eyebrow
   case.
2. **Every `[LABPROD]` claim is unverified.** All of it is the snapshot's own assertion about the live
   Patterson theme, not an independent read. `[CORP]` extracted `[DPL]` and `[PCOM]` on 2026-08-11 and
   disagrees in several places — notably the production type scale and the navy primary button.
   **Verifying `[LABPROD]` against a fresh read of the live stylesheets is the single highest-value
   follow-up in this import.**
3. **The primary button colour.** `[BG25 p.57]` says sky; the snapshot ships navy and instructs
   against substituting. Sky ships here. Needs a brand ruling.
4. **The secondary button treatment.** `[DS20 p.15]` white-and-outlined against the snapshot's filled
   light blue. `[BG25]` does not address secondary buttons.
5. **The production type scale.** Two sources both claiming to describe production, disagreeing
   materially.
6. **The elevation scale.** Five navy-tinted steps against `[CORP]`'s flat reading — but the
   snapshot's own production observation is a single neutral-black shadow, which is closer to flat
   than to its ramp.
7. **The focus treatment.** The 3px sky ring is the design system's own; Patterson publishes none and
   the snapshot says production ships none either.
8. **Motion tokens.** None published by any Patterson source.
9. **The fluid type scale.** No Patterson precedent.
10. **The monospace face.** Patterson publishes none.
11. **The warm field border.** Appears in no `[CORP]`-extracted value; the production claim is
    unconfirmed.
12. **The named spacing scale.** Neither grid is published as a named scale.
13. **Page width.** Three values in evidence: 1240px system, 1259px production-observed, 1300px
    `[DPL]`.
14. **Breakpoints.** 1024px min-width here against `[DPL]`'s 600px and 900px max-width.
15. **Status colours and surfaces.** `[BG25]` publishes none; both candidate sets are implementation
    values.
16. **The informational state.** `[DS20 p.37]` names four message states and no informational one.
17. **Icon font licensing.** 93 glyphs described as lifted from the production storefront pattern
    library. Binaries not shipped and absent from the export. Redistribution rights unconfirmed.
18. **Icon glyph sizes.** `[BG25 p.41]` and the `[DS20]` export spec address icon *assets*, not inline
    glyph sizes. The 14/20/24px steps are the snapshot's own.
19. **Self-hosted Proxima Nova licensing.** Described as licensed binaries supplied by the brand team;
    `[CORP]`'s position is that Adobe's terms forbid re-hosting. Unconfirmed either way. No binary is
    shipped here.
20. **Deck geometry.** No Patterson source publishes slide padding, slide grounds or a slide card
    radius. The deck values come from the project's own stylesheet.
21. **Heading tracking.** `[BG25 p.27]` tracks at −10; the snapshot observes production declares none.
