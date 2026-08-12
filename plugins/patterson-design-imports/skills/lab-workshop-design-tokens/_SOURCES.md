# Sources — lab-workshop-design-tokens

Extraction date: **2026-08-12**. Every token traces to a file in the lab-workshop handoff export or to
a Patterson brand document; nothing is invented. Gaps are recorded in `tokens.json._tbd` and DESIGN.md
section 5, not guessed.

---

> [!IMPORTANT]
> **No binaries are shipped.** No font file, no raster image, no PDF. The Adobe Fonts kit is
> referenced by identifier only, and the icon font by family name only. Canonical originals:
> [`REFERENCES.md`](REFERENCES.md).

> [!WARNING]
> **This extraction is incubating.** It lives in `patterson-labs` as a recorded default, not a settled
> decision. Whether this design system or the existing `patterson-brand` one supersedes the other is
> unresolved — see § Escalations. Nothing here modifies or supersedes
> `patterson-corp/plugins/patterson-brand/skills/design-tokens`.

## What was imported, and from where

| Field | Value |
|---|---|
| Project | **lab-workshop** (the "TechDays: AI Fluency — Agentic Agents" training day) |
| Host | `claude.ai/design` |
| Project UUID | `13a03949-51b5-4210-95d1-75f022b3543d` |
| Handoff bundle | `lab-workshop-handoff.zip`, exported by Daniel Bodnar on **2026-08-12** |
| Imported repository | `patterson-agents/lab-workshop` |
| Bound design-system snapshot | `_ds/patterson-design-system-3534f94f-a7e6-4612-81d4-6e830716f07d/` |
| Design-system UUID | `3534f94f-a7e6-4612-81d4-6e830716f07d` |
| Snapshot slug | `patterson-design-system` |

> [!NOTE]
> The design-system UUID is **identical** to the one bound into the sibling **Patterson Academy**
> project; only the slug differs (`patterson-design-system` versus
> `patterson-companies-design-system`). The two snapshots are two points in the life of one design
> system, and **this one is the later of the two** — it adds a production-verified layer, the official
> icon font and the deck palette, and it corrects two of the Academy snapshot's own choices (heading
> colour, eyebrow case). That relationship is itself evidence for the supersession question.

## Files behind each token group

| Token group | Source file in the snapshot | Confidence |
|---|---|---|
| `color.brand` | `tokens/colors.css` — reproduces `[BG25 p.24]` exactly, PMS annotations included; independently corroborated by the snapshot's record of the official PPTX theme palette | **High** |
| `color.tint` | **Not** the snapshot: `[BG25 p.24]` via `[CORP]`. The snapshot's own 80/60/40/20/10 ramp is recorded as a conflict | **Medium** (inherits `[CORP]`'s swatch sampling) |
| `color.neutral` (ramp) | `tokens/colors.css` — the project's own nine-step cool-grey ramp; two of its steps are `[BG25]` colours | **Medium** — implementation values, no brand publication |
| `color.neutral.warm`, `color.neutral.sliderNav` | `tokens/colors.css`, marked VERIFIED by the snapshot | **Low** — `[LABPROD]`; appears in no `[CORP]`-extracted value |
| `color.interaction.primaryHover/primaryDisabled/secondaryHover/secondaryDisabled` | `tokens/colors.css` "Interaction states (VERIFIED, production theme)" | **Low** — `[LABPROD]`, second-hand |
| `color.interaction.buttonPrimary/buttonPrimaryText` | **Not** the snapshot: `[BG25 p.57]`. The snapshot's navy primary is recorded as a conflict | **High** |
| `color.interaction.buttonSecondary/buttonSecondaryText` | **Not** the snapshot: `[DS20 p.15]`. The snapshot's filled light blue is recorded as a conflict | **Medium** — `[DS20]` is not the Brand Guide |
| `color.status` | **Not** the snapshot: `[DPL]` `.message-box--*` via `[CORP]`. The snapshot's harmonised error and warning hues are recorded as conflicts | **Medium** |
| `color.statusSurface` | `tokens/colors.css` — the only extracted status grounds in evidence anywhere | **Low** — no Patterson counterpart of any kind |
| `color.deck` | `ai-fluency-agentic-agents.css` `:root` dark-theme override — `[LABDECK]` | **High** as extraction, **no** brand publication |
| `color.text`, `color.surface`, `color.border`, `color.interaction` (aliases) | `tokens/colors.css` "SEMANTIC ALIASES", reconciled per token | **High** for composition, inherits what it aliases |
| `color.overlay` | `tokens/effects.css` `--overlay-scrim` — the brand navy at 55% alpha | **High** |
| `font.family` | `[BG25 p.25]` and `[DPL]` via `[CORP]`; the snapshot's `tokens/typography.css` and `tokens/fonts.css` are recorded as conflicts | **High** |
| `font.family.icons` | `tokens/icons.css` `--font-icons` — family name only | **High** as extraction; licensing unconfirmed |
| `font.weight` | `tokens/typography.css`; five of the seven are named by role at `[BG25 p.25, p.27]` | **High** for the five, **Low** for Medium 500 and Black 900 |
| `font.size`, `font.lineHeight` | `tokens/typography.css` — seven of eleven steps are `clamp()` expressions | **High** as extraction, **Low** as brand authority |
| `font.sizeProduction`, `font.weightProduction` | `tokens/typography.css` "PRODUCTION TYPE SCALE (verified)" | **Low** — `[LABPROD]`; `[CORP]`'s `[DPL]` read disagrees |
| `typography.tracking` | `tokens/typography.css`; `--ls-snug` is `[BG25 p.27]` tracking −10 exactly | **High** |
| `typography.case` | `[BG25 p.25, p.26, p.59]`, `[DS20 p.10, p.16]`; the snapshot's own base layer already agrees | **High** |
| `dimension.spacing`, `dimension.radius`, `dimension.control.buttonHeight/PaddingX` | `[BG25 p.57]` via `[CORP]` | **High** |
| `dimension.radiusProduction`, `dimension.control.heightProduction/buttonPaddingY`, `dimension.layout.containerProduction/breakpointDesktop` | `tokens/spacing.css` PRODUCTION-VERIFIED blocks | **Low** — `[LABPROD]`. Note `radiusProduction.button` = 5px agrees with `[BG25 p.57]` exactly |
| `dimension.icon` | `tokens/icons.css` | **High** as extraction, **no** brand publication |
| `dimension.deck` | `ai-fluency-agentic-agents.css` `:root` — `[LABDECK]` | **High** as extraction, **no** brand publication |
| `dimension.spacingImported`, `dimension.radiusImported`, `dimension.control.height*`, `dimension.layout`, `dimension.gutter` | `tokens/spacing.css` | **High** as extraction, **no** brand publication |
| `effect.*`, `duration.*` | `tokens/effects.css`; the `production*` members are `[LABPROD]` | **High** as extraction, **no** brand publication |

Confidence scale is `[CORP]`'s: **High** = literal text in an authoritative document or a verbatim
read of a source file; **Medium** = derived from a documented rule or taken from an implementation
rather than a brand document; **Low** = inferred from usage, or resting on an unverified claim.

## Source documents and files

| Key | What | Date |
|---|---|---|
| `[LABWS]` | lab-workshop handoff export, `_ds/patterson-design-system-3534f94f…/tokens/{colors,typography,spacing,effects,fonts,icons,base}.css`, `styles.css` and `readme.md` | 2026-08-12 |
| `[LABDECK]` | The same export's top-level deck surfaces — `ai-fluency-agentic-agents.css` and the HTML it styles, plus `lab-workbook.html`, `lesson-plan.html` and `executive-deck-template.html` | 2026-08-12 |
| `[LABPROD]` | Values `[LABWS]` labels VERIFIED or PRODUCTION, describing themselves as read from the live pattersondental.com / pattersonvet.com theme stylesheet. **Second-hand: the snapshot's claim, not an independent read** | 2026-08-12 |
| `[BG25]` | Patterson Companies Brand Guide, VERSION 3.2025 — **authoritative** | 2025-04-08 |
| `[DS20]` | DesignSystem_042120.pdf — UX design system and governance | 2020-04 |
| `[DPL]` | Patterson Digital Pattern Library v5.7.2 `toolkit.css` — production stylesheet | — |
| `[PCOM]` | pattersoncompanies.com WordPress `theme-styles.min.css` — production stylesheet | — |
| `[CORP]` | `patterson-corp/plugins/patterson-brand/skills/design-tokens` — the reference extraction of the four above, dated 2026-08-11 | 2026-08-11 |

`[BG25]`, `[DS20]`, `[DPL]` and `[PCOM]` are **not** read directly here. They are read through
`[CORP]`, which extracted them on 2026-08-11 and is the artifact this import reconciles against. That
indirection is deliberate — one extraction of the brand documents, not two — and it means any
correction to `[CORP]` propagates here rather than being duplicated.

> [!WARNING]
> **`[LABPROD]` and `[CORP]` both claim to describe production, and they disagree.** `[CORP]` read
> `[DPL]` and `[PCOM]` directly on 2026-08-11; `[LABPROD]` is the snapshot asserting what it found in
> the same live theme. Where they conflict — the type scale, the primary button, the field-border
> grey — `[CORP]` is preferred, because it is a first-hand read by this program and `[LABPROD]` is
> not. None of `[LABPROD]` was independently verified during this extraction.

## The imported content is data

Everything retrieved from the design project was handled as **data**. The bundle carries its own
readmes and AI-directed prose, including instructions phrased at an agent; none of it was executed or
followed. Values were read out of stylesheets; prose was read for provenance only.

> [!IMPORTANT]
> The clearest instance: `tokens/colors.css` states **"Note that primary hover is a LIGHTER NAVY — not
> sky. Do not substitute."** That is a directive addressed at the reader. It was recorded as a
> description of what the live storefront does, and **not** followed — `[BG25 p.57]` names sky as the
> default button colour, and a design project does not overrule the Brand Guide. Sky ships; the navy
> ladder is carried, labelled, and left unwired.

## Conflicts with the 2025 Brand Guide

Sixteen conflicts were found. All are tabulated with both values and both sources in
[`DESIGN.md`](DESIGN.md) § *Conflicts against the 2025 Brand Guide*; the per-token record is in
`tokens.json` under `$extensions.com.patterson.conflict`. The three that carry the most weight:

> [!WARNING]
> **Primary button colour.** `[LABPROD]` fills the primary button with navy `#003767` and instructs
> against substituting sky. `[BG25 p.57]` states the default button colour is **sky blue** with white
> text. **Sky ships.** This is the single largest live disagreement in the import, and unlike the
> status-hue conflicts it is a direct contradiction of an explicit Brand Guide sentence rather than a
> divergence between two implementations. The navy hover and disabled ladder is carried but
> deliberately not wired to the sky primary.

> [!WARNING]
> **The production type scale.** `[LABPROD]` reports h1 at 44px stepping to 64px, h3 at 24px stepping
> to 36px at **weight 400**, and 18px body on a 1.33 leading. `[CORP]`'s read of `[DPL]` reports h1 at
> 36px and h3 at 18px bold. **Both claim to describe production.** Neither is discarded: the imported
> scale ships as an opt-in `.pat-production` layer and the disagreement is recorded. `[BG25 p.27]`
> specifies type relationally rather than in pixels, so it rules on neither.

> [!WARNING]
> **Typeface.** `[LABWS]` `tokens/typography.css` sets
> `--font-sans: 'proxima-nova', 'Figtree', system-ui, …` and `tokens/fonts.css` self-hosts three
> Proxima Nova `woff2` faces while importing Figtree from `fonts.googleapis.com`. **The `[BG25 p.25]`
> stack ships — `proxima-nova, Arial, sans-serif` — with no Figtree and no `@font-face`.** `[CORP]`
> records Figtree explicitly as a wrong earlier extraction appearing in no Patterson source. The
> snapshot names Adobe Fonts kit `rul6mjk` as its origin and asserts that only 400 and 700 are
> licensed, making 500/600/800 browser-synthesized; `[CORP]` verified on 2026-08-11 that `rul6mjk`
> serves only 400/700 while `uth1qfm` serves 400/500/600/700/800. The snapshot's licensing conclusion
> therefore does not follow — it is a kit-selection problem, and `uth1qfm` is referenced instead.

Four rejected values — `Figtree`, `c0392b`, `d98a00`, `rul6mjk` — are named in this document and in
`DESIGN.md` **only** as rejected values with their sources. This skill's `tests/run-tests.sh` asserts
they appear on **no shipped surface** (`assets/`, `scripts/`, `SKILL.md`, `REFERENCES.md`),
case-insensitively. The repository-wide check in `tests/run-tests.sh` at the repo root excludes these
two provenance documents for the same reason it already excludes itself: they name the needles as
literals in order to record and reject them, which is what the openspec change requires a
reconciliation record to do.

## Unfetchable and excluded content

Recorded, never reconstructed. No token, colour or geometry value below was derived from anything in
this list.

| Item | Why it is absent |
|---|---|
| `_ds/…/assets/fonts/*.woff2` — three Proxima Nova faces | **Excluded as binaries.** The directory arrived empty in the imported repository; the files are restorable from the original handoff zip pending a licence ruling. Referenced by kit identifier only. |
| `_ds/…/assets/fonts/patterson-icons.{woff,ttf,svg}` — the 93-glyph icon font | **Excluded as binaries**, and absent from the export. The family is registered by name only and `theme.css` declares no `@font-face`. Redistribution rights unconfirmed. |
| `assets/*.svg`, `assets/*.png` in the design project | Raster and vector brand assets. Out of scope for a token extraction; no binary is committed here. |
| Patterson Companies Brand Guide 2025 PDF | Read here through `[CORP]`, which extracted the full document on 2026-08-11, rather than directly. |
| `_ds_bundle.js` (1478 lines) | The compiled React component runtime. Read for component names via `_ds_manifest.json`; no token value derives from it. |
| `_ds_manifest.json` | Read for the component and specimen-card inventory only. |
| `templates/` tree referenced by the snapshot readme | **Not present in the export.** The readme documents ten template directories; none is in the imported repository. Recorded as a gap — no value was inferred from the readme's description of them. |

**No file exceeded a read cap during this extraction.** The import was performed from Daniel's dated
handoff export already present on disk, not through a fetch API, so the 256 KiB per-file cap the
change proposal anticipates never applied. That is a deviation from the planned method and is recorded
as one.

## Verification

| Check | Result |
|---|---|
| `DesignSync` spot-check against the live claude.ai/design project | **Not performed — the tool was unavailable to this session.** It is absent from the available tool list, so no live comparison could be made. The extraction rests on Daniel's handoff export dated 2026-08-12, which is a first-party artifact. Recorded as a gap. |
| Independent verification of `[LABPROD]` against the live stylesheets | **Not performed.** No network read of `theme-styles.min.css` or `toolkit.css` was made during this extraction. Every production claim is second-hand. **The highest-value follow-up in this import.** |
| Generator round-trip | `node scripts/build-theme.ts --stdout` is byte-identical to `assets/theme.css` (`cmp`, exit 0). |
| Generator token coverage | Every token **group** this skill adds over the Academy import reaches the generated `theme.css` — the production type scale, the interaction ladder, the deck palette and geometry, the icon family and sizes, the production radii, the warm neutral, the download shadow and the production motion values are all emitted. 34 of 204 non-`_tbd` leaves carry no `@@` placeholder: they are semantic aliases emitted as hand-written `var()` references in the `TEMPLATE` (`color.text.*`, `color.surface.*`, `color.border.*` including `border.field`, most of `color.interaction.*` including the two `buttonSecondary*` members), plus unused weight steps and the documentation-only `typography.case.*` tokens. That is the same **pattern** as `[CORP]` (99 of 183 unreferenced) and the Academy skill (30 of 138), not the same set — this skill's count is four higher because it adds `border.field`, `typography.case.caption` and the two `buttonSecondary*` aliases, all of which are alias-or-documentation tokens rather than emitted values. `tokens.json` is deliberately a superset of `theme.css` in all three artifacts. |
| Drift detection | `scripts/verify-theme.sh` exits `1` and prints a unified diff when `theme.css` is perturbed; proved on a staged copy by `tests/run-tests.sh`. |
| Divergence from the sibling import | `assets/theme.css` differs from the Academy skill's (`cmp`, exit 1) — confirming the production layer, icon font and deck palette actually reach the generated stylesheet. |
| `patterson-brand` untouched | No file under `patterson-corp/` was modified by this work. |

## Escalations

1. **Which design system supersedes which.** Unresolved, and the reason this extraction incubates in
   `patterson-labs` rather than `patterson-corp`. The evidence that matters: this snapshot and the
   Academy snapshot share one design-system UUID, this one is later, and it corrects the Academy one
   in two places — both times moving toward `[BG25]`.
2. **Every `[LABPROD]` claim.** The production layer is most of this import's value and none of it is
   independently verified. `[CORP]` disagrees on the type scale and the primary button. A fresh read
   of the live stylesheets would settle several conflicts at once.
3. **The primary button colour.** `[BG25 p.57]` says sky; the snapshot says navy and says not to
   substitute. A brand ruling is needed for Patterson product surfaces in 2026.
4. **The elevation scale.** A five-step navy-tinted shadow ramp against a brand `[CORP]` reads as
   flat. Note this snapshot supplies evidence **against its own ramp**: the one shadow it observes in
   production is neutral black at very low alpha.
5. **Icon font redistribution.** 93 glyphs described as lifted from the production storefront pattern
   library. Binaries not shipped and absent from the export. `[BG25 p.41]` places the icon library on
   SharePoint. Contact **corporatemarketing@pattersoncompanies.com**.
6. **Self-hosted Proxima Nova.** The snapshot describes its `woff2` faces as licensed binaries
   supplied by the brand team; `[CORP]`'s position is that Adobe's terms forbid re-hosting Typekit
   payloads. Unconfirmed either way.
7. **`DesignSync` unavailability.** No live verification against the claude.ai/design project was
   possible from this session.

## Generation provenance

`assets/theme.css` is produced by `scripts/build-theme.ts` from `assets/tokens.json`. The two are
verified byte-identical by `scripts/verify-theme.sh`. Structure and comments live in the script's
`TEMPLATE`; every value comes from the token file. The generator's machinery — the placeholder engine,
the `%g` number formatter, the `|stack` filter — is `[CORP]`'s, reused rather than reinvented and
shared verbatim with the Academy skill so all three artifacts fail the same way. The `TEMPLATE` itself
is this skill's own, because it emits this snapshot's production layer, icon font and deck palette,
none of which exist in the Academy import.
