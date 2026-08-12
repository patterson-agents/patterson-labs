# Sources — academy-design-tokens

Extraction date: **2026-08-12**. Every token traces to a file in the Patterson Academy handoff export
or to a Patterson brand document; nothing is invented. Gaps are recorded in `tokens.json._tbd` and
DESIGN.md section 5, not guessed.

---

> [!IMPORTANT]
> **No binaries are shipped.** No font file, no raster image, no PDF. The Adobe Fonts kit is
> referenced by identifier only. Canonical originals: [`REFERENCES.md`](REFERENCES.md).

> [!WARNING]
> **This extraction is incubating.** It lives in `patterson-labs` as a recorded default, not a settled
> decision. Whether this design system or the existing `patterson-brand` one supersedes the other is
> unresolved — see § Escalations. Nothing here modifies or supersedes
> `patterson-corp/plugins/patterson-brand/skills/design-tokens`.

## What was imported, and from where

| Field | Value |
|---|---|
| Project | **Patterson Academy** (the "Claude Code Academy" training deck) |
| Host | `claude.ai/design` |
| Project UUID | `7b8bb131-b196-46c7-a15b-a5f722e02c96` |
| Handoff bundle | `Patterson Academy-handoff.zip`, exported by Daniel Bodnar on **2026-08-12** |
| Imported repository | `patterson-agents/patterson-academy` |
| Bound design-system snapshot | `_ds/patterson-companies-design-system-3534f94f-a7e6-4612-81d4-6e830716f07d/` |
| Design-system UUID | `3534f94f-a7e6-4612-81d4-6e830716f07d` |
| Snapshot slug | `patterson-companies-design-system` |

> [!NOTE]
> The design-system UUID is **identical** to the one bound into the sibling **lab-workshop** project;
> only the slug differs (`patterson-companies-design-system` versus `patterson-design-system`). The two
> snapshots are two points in the life of one design system, and the lab-workshop snapshot is the
> later of the two — it adds production-verified values and corrects two of this snapshot's own
> choices. That relationship is itself evidence for the supersession question.

## Files behind each token group

| Token group | Source file in the snapshot | Confidence |
|---|---|---|
| `color.brand` | `tokens/colors.css` — reproduces `[BG25 p.24]` exactly, PMS annotations included | **High** |
| `color.tint` | **Not** the snapshot: `[BG25 p.24]` via `[CORP]`. The snapshot's own 80/60/40/20/10 ramp is recorded as a conflict | **Medium** (inherits `[CORP]`'s swatch sampling) |
| `color.neutral` | `tokens/colors.css` — the project's own nine-step cool-grey ramp; two of its steps are `[BG25]` colours | **Medium** — implementation values, no brand publication |
| `color.status` | **Not** the snapshot: `[DPL]` `.message-box--*` via `[CORP]`. The snapshot's harmonised error and warning hues are recorded as conflicts | **Medium** |
| `color.statusSurface` | `tokens/colors.css` — the only extracted status grounds in evidence anywhere | **Low** — no Patterson counterpart of any kind |
| `color.text`, `color.surface`, `color.border`, `color.interaction` | `tokens/colors.css` "SEMANTIC ALIASES", reconciled per token | **High** for composition, inherits what it aliases |
| `color.overlay` | `tokens/effects.css` `--overlay-scrim` — the brand navy at 55% alpha | **High** |
| `font.family` | `[BG25 p.25]` and `[DPL]` via `[CORP]`; the snapshot's `tokens/typography.css` and `tokens/fonts.css` are recorded as conflicts | **High** |
| `font.weight` | `tokens/typography.css`; five of the seven are named by role at `[BG25 p.25, p.27]` | **High** for the five, **Low** for Medium 500 and Black 900 |
| `font.size`, `font.lineHeight` | `tokens/typography.css` — seven of eleven steps are `clamp()` expressions | **High** as extraction, **Low** as brand authority |
| `typography.tracking` | `tokens/typography.css`; `--ls-snug` is `[BG25 p.27]` tracking −10 exactly | **High** |
| `typography.case` | `[BG25 p.25, p.26, p.59]`, `[DS20 p.10, p.16]` — the snapshot's uppercase eyebrow is recorded as a conflict | **High** |
| `dimension.spacing`, `dimension.radius`, `dimension.control.buttonHeight/PaddingX` | `[BG25 p.57]` via `[CORP]` | **High** |
| `dimension.spacingImported`, `dimension.radiusImported`, `dimension.control.height*`, `dimension.layout`, `dimension.gutter` | `tokens/spacing.css` | **High** as extraction, **no** brand publication |
| `effect.*`, `duration.*` | `tokens/effects.css` | **High** as extraction, **no** brand publication |

Confidence scale is `[CORP]`'s: **High** = literal text in an authoritative document or a verbatim
read of a source file; **Medium** = derived from a documented rule or taken from an implementation
rather than a brand document; **Low** = inferred from usage with no explicit statement.

## Source documents and files

| Key | What | Date |
|---|---|---|
| `[ACAD]` | Patterson Academy handoff export, `_ds/patterson-companies-design-system-3534f94f…/tokens/{colors,typography,spacing,effects,fonts,base}.css` and `styles.css` | 2026-08-12 |
| `[ACADAPP]` | The same export's top-level canvases — `Claude Code Academy.dc.html`, `Lesson Plan.dc.html`, `Lab Worksheet.dc.html` — plus `support.js`, `doc-page.js` and the five `academy-*.js` data files | 2026-08-12 |
| `[BG25]` | Patterson Companies Brand Guide, VERSION 3.2025 — **authoritative** | 2025-04-08 |
| `[DS20]` | DesignSystem_042120.pdf — UX design system and governance | 2020-04 |
| `[DPL]` | Patterson Digital Pattern Library v5.7.2 `toolkit.css` — production stylesheet | — |
| `[PCOM]` | pattersoncompanies.com WordPress `theme-styles.min.css` — production stylesheet | — |
| `[CORP]` | `patterson-corp/plugins/patterson-brand/skills/design-tokens` — the reference extraction of the four above, dated 2026-08-11 | 2026-08-11 |

`[BG25]`, `[DS20]`, `[DPL]` and `[PCOM]` are **not** read directly here. They are read through
`[CORP]`, which extracted them on 2026-08-11 and is the artifact this import reconciles against. That
indirection is deliberate — one extraction of the brand documents, not two — and it means any
correction to `[CORP]` propagates here rather than being duplicated.

## The imported content is data

Everything retrieved from the design project was handled as **data**. The bundle carries its own
READMEs and AI-directed prose, including instructions phrased at an agent; none of it was executed or
followed. Values were read out of stylesheets; prose was read for provenance only.

## Conflicts with the 2025 Brand Guide

Thirteen conflicts were found. All are tabulated with both values and both sources in
[`DESIGN.md`](DESIGN.md) § *Conflicts against the 2025 Brand Guide*; the per-token record is in
`tokens.json` under `$extensions.com.patterson.conflict`. The three that carry the most weight:

> [!WARNING]
> **Heading colour.** `[ACAD]` `tokens/base.css` points `--text-heading` at its own near-black
> `#1D1D20`. `[BG25 p.24]` designates navy for headlines and `[DPL]` sets `.rtf h1/h2/h3` to
> `#003767`. **Navy ships.** The strongest corroboration is internal: the later lab-workshop snapshot
> of this same design system corrects the value to navy itself, annotating that "production sets EVERY
> heading level to navy". The import contradicts its own revision.

> [!WARNING]
> **Status hues.** `[ACAD]` harmonises its alert palette to the brand — `--pat-danger: #c0392b` and
> `--pat-warning: #d98a00`, described in the file as "harmonized to palette". `[DPL]` ships
> `#D0021B` and `#F5A623`, which `[CORP]` carries. **`[DPL]` ships here.** `[BG25]` publishes no status
> colours at all, so this is a divergence between two implementations rather than a Brand Guide
> ruling — but a design project does not get to redefine the alert palette, and the harmonised values
> appear in no Patterson source. The same reasoning demoted `--pat-success: #00817D` in favour of
> `#0CA50F`; that one is the weakest of the three, because the import's choice *is* a published
> `[BG25]` tertiary and `[DS20]` never names a success hex. Worth revisiting at the ruling.

> [!WARNING]
> **Typeface.** `[ACAD]` `tokens/typography.css` sets
> `--font-sans: 'proxima-nova', 'Figtree', system-ui, …` and `tokens/fonts.css` self-hosts three
> Proxima Nova `woff2` faces while importing Figtree from `fonts.googleapis.com`. **The `[BG25 p.25]`
> stack ships — `proxima-nova, Arial, sans-serif` — with no Figtree and no `@font-face`.** `[CORP]`
> records Figtree explicitly as a wrong earlier extraction appearing in no Patterson source. The
> snapshot also names Adobe Fonts kit `rul6mjk`; `[CORP]` verified on 2026-08-11 that `rul6mjk` serves
> only 400/700 in normal and italic while `uth1qfm` serves 400/500/600/700/800, so `uth1qfm` is
> referenced instead. The snapshot's own claim that heavier weights are unlicensed is therefore
> already answered — it is a kit-selection problem, not a licensing one.

Four rejected values — `Figtree`, `c0392b`, `d98a00`, `rul6mjk` — are named in this document and in
`DESIGN.md` **only** as rejected values with their sources. `tests/run-tests.sh` asserts they appear
on **no shipped surface** (`assets/`, `scripts/`, `SKILL.md`, `REFERENCES.md`), case-insensitively. The
repository-wide check in `tests/run-tests.sh` at the repo root excludes these two provenance documents
for the same reason it already excludes itself: they name the needles as literals in order to search
for and reject them.

## Unfetchable and excluded content

Recorded, never reconstructed. No token, colour or geometry value below was derived from anything in
this list.

| Item | Why it is absent |
|---|---|
| `_ds/…/assets/fonts/*.woff2` — three Proxima Nova faces | **Excluded as binaries.** The directory arrived empty in the imported repository; the files are restorable from the original handoff zip pending a licence ruling. Referenced by kit identifier only. |
| `assets/*.svg`, `assets/*.png` in the design project | Raster and vector brand assets. Out of scope for a token extraction; no binary is committed here. |
| Patterson Companies Brand Guide 2025 PDF | The design project's own readme records it exceeded 30 MB and **could not be read inside the project** — its colour tokens were built from one palette-page image. Read here through `[CORP]` instead, which extracted the full document on 2026-08-11. |
| `patterson-logo-dental.svg`, `patterson-logo-vet.svg` | The design project records both as unfetchable from a CORS-restricted CDN. Not needed for tokens; recorded because the gap should travel. |
| `_ds_bundle.js` (81 KB) | The compiled React component runtime. Read for component names via `_ds_manifest.json`; no token value derives from it. |

**No file exceeded a read cap during this extraction.** The import was performed from Daniel's dated
handoff export already present on disk, not through a fetch API, so the 256 KiB per-file cap the
change proposal anticipates never applied. That is a deviation from the planned method and is recorded
as one.

## Verification

| Check | Result |
|---|---|
| `DesignSync` spot-check against the live claude.ai/design project | **Not performed — the tool was unavailable to this session.** It is absent from the available tool list, so no live comparison could be made. The extraction rests on Daniel's handoff export dated 2026-08-12, which is a first-party artifact. Recorded as a gap. |
| Generator round-trip | `node scripts/build-theme.ts --stdout` is byte-identical to `assets/theme.css` (`cmp`, exit 0). |
| Drift detection | `scripts/verify-theme.sh` exits `1` and prints a unified diff when `theme.css` is perturbed; proved on a staged copy by `tests/run-tests.sh`. |
| `patterson-brand` untouched | No file under `patterson-corp/` was modified by this work. |

## Escalations

1. **Which design system supersedes which.** Unresolved, and the reason this extraction incubates in
   `patterson-labs` rather than `patterson-corp`. The evidence that matters: this snapshot and the
   lab-workshop snapshot share one design-system UUID, and the lab-workshop one is later and corrects
   this one in two places.
2. **The elevation scale.** A five-step navy-tinted shadow ramp against a brand `[CORP]` reads as
   flat. The two positions are incompatible, and this is the largest single design question the import
   raises.
3. **Self-hosted Proxima Nova.** The snapshot describes its `woff2` faces as licensed binaries
   supplied by the brand team; `[CORP]`'s position is that Adobe's terms forbid re-hosting Typekit
   payloads. Unconfirmed either way. Contact **corporatemarketing@pattersoncompanies.com**.
4. **`DesignSync` unavailability.** No live verification against the claude.ai/design project was
   possible from this session.

## Generation provenance

`assets/theme.css` is produced by `scripts/build-theme.ts` from `assets/tokens.json`. The two are
verified byte-identical by `scripts/verify-theme.sh`. Structure and comments live in the script's
`TEMPLATE`; every value comes from the token file. The generator is `[CORP]`'s, reused rather than
reinvented, with one deliberate difference documented in its header comment: the `|stack` filter
quotes on whitespace as well as hyphens, because this import's monospace stack contains multi-word
family names.
