# Canonical references — lab-workshop-design-tokens

> [!IMPORTANT]
> Everything in this skill is a text extraction snapshot dated 2026-08-12, taken from a handoff export
> of a live claude.ai/design project. Check the canonical location before publishing anything derived
> from it — the design project can move on, and this snapshot will not.

Brand contact: **corporatemarketing@pattersoncompanies.com**.

---

## The design project

| Resource | Locator |
|---|---|
| **lab-workshop** — the source design project (TechDays: AI Fluency — Agentic Agents) | `claude.ai/design`, project `13a03949-51b5-4210-95d1-75f022b3543d` |
| Bound design system | UUID `3534f94f-a7e6-4612-81d4-6e830716f07d`, slug `patterson-design-system` |
| Handoff bundle | `lab-workshop-handoff.zip`, exported 2026-08-12 by Daniel Bodnar |
| Imported repository | `https://github.com/patterson-agents/lab-workshop` |
| Snapshot path inside it | `_ds/patterson-design-system-3534f94f-a7e6-4612-81d4-6e830716f07d/` |
| Deck stylesheet the deck values come from | `ai-fluency-agentic-agents.css` at the repository root |
| Sibling import of the same design system | `https://github.com/patterson-agents/patterson-academy` — snapshot slug `patterson-companies-design-system`, same UUID, **earlier** |
| The design-system authoring project | `https://github.com/patterson-agents/patterson-design-system` — the upstream this snapshot was compiled from |

`[TBD: no permanent URL for a claude.ai/design project export exists. The zip is the only durable
artifact, and it lives on Daniel's machine.]`

`[TBD: the snapshot readme documents a ten-entry templates/ tree that is absent from the export.
Its canonical location is unknown.]`

## The reference extraction this is reconciled against

| Resource | Locator |
|---|---|
| **`patterson-brand` design-tokens skill** — `[CORP]`, the authority for every `[BG25]`/`[DS20]`/`[DPL]` value used here | `patterson-corp/plugins/patterson-brand/skills/design-tokens/` |
| Its token file | `…/assets/tokens.json` |
| Its palette-conflict precedent (`#00A8E1` versus `#269BCB`) | `…/_SOURCES.md` § *The one conflict that matters for this skill* |
| Its Stitch-format DESIGN.md | `patterson-corp/plugins/patterson-brand/skills/brand-identity/references/DESIGN.md` |
| The sibling import of the earlier snapshot | `patterson-labs/plugins/patterson-design-imports/skills/academy-design-tokens/` |

## Brand documents

| Resource | Locator |
|---|---|
| **Corporate Branding hub** | `https://pattersoncompanies.sharepoint.com/sites/Corporate/SitePages/Corporate-Branding.aspx` |
| **Patterson Companies Brand Guide 2025** — authoritative for palette, typography and the button spec | `[TBD: no SharePoint URL appears in the guide's own link annotations. Expected under the Corporate Branding hub.]` |
| **DesignSystem_042120** — the WCAG-adjusted digital palette, the secondary-button spec and the pattern governance rules | `[TBD: no direct URL; listed by its own slide 39 under the Corporate Branding tab on Inside Patterson.]` |
| **The icon library** — `[BG25 p.41]` places it on SharePoint | `[TBD: no direct URL recorded.]` |

## Production implementations

These are the stylesheets every `[LABPROD]` claim in this skill refers to. **None of them was read
during this extraction** — the production values are the snapshot's assertions about them.

| Resource | Locator |
|---|---|
| Digital Pattern Library v5.7.2 `toolkit.css` | `https://cdn.cloud.pattersoncompanies.com/patternlibrary/releases/5.7.2/assets/toolkit/styles/toolkit.css` |
| pattersoncompanies.com theme stylesheet | `https://www.pattersoncompanies.com/wp-content/themes/patterson/build/styles/theme-styles.min.css` |
| pattersondental.com / pattersonvet.com | The storefront surfaces the snapshot names as its production source. `[TBD: no pinned stylesheet URL recorded for either.]` |

> [!IMPORTANT]
> Reading these two stylesheets and diffing them against this skill's `[LABPROD]` values is the single
> highest-value follow-up available. It would settle the production type scale, the primary button
> colour and the warm field border at once. See [`_SOURCES.md`](_SOURCES.md) § Escalations.

`[TBD: verify whether a DPL release newer than 5.7.2 exists before pinning to it.]`

## Fonts — reference the kit, never ship the file

| Resource | Locator |
|---|---|
| **Adobe Fonts kit `uth1qfm`** — **use this one**; serves 400/500/600/700/800 in normal and italic | `https://use.typekit.net/uth1qfm.css` |
| Adobe Fonts | `https://fonts.adobe.com/` — `[TBD: Patterson account owner unknown.]` |

> [!CAUTION]
> **Reference the kit; never ship the binaries.** Adobe's terms forbid re-hosting Typekit payloads —
> no font files, no `@font-face`. The imported snapshot self-hosts three Proxima Nova faces and
> declares them licensed; that claim is unconfirmed and no binary is committed here.
> `[TBD: whether the Patterson licence permits self-hosting.]`

> [!NOTE]
> The kit the snapshot names is superseded. `[CORP]` verified on 2026-08-11 by counting `@font-face`
> blocks that the snapshot's kit serves only 400 and 700 in normal and italic, while `uth1qfm` serves
> five weights — so the Semibold 600 and Extrabold 800 this system declares do render as real faces
> under `uth1qfm`. The snapshot's conclusion that heavier weights are unlicensed does not survive that
> check. `[TBD: confirmation from the Patterson Adobe Fonts account owner that uth1qfm is an active,
> sanctioned kit rather than a legacy one.]`

> [!CAUTION]
> **The icon font is registered by name only.** `theme.css` declares no `@font-face` for it and no
> glyph binary ships here; the export's font directory was empty. Supply the face yourself before
> using `.pat-i`, and pair every glyph with a text label or an `aria-label` — the glyphs sit in
> private-use codepoints and read as nothing to a screen reader.
> `[TBD: whether the 93-glyph set may be redistributed.]`

## External specifications

| Spec | URL |
|---|---|
| W3C Design Tokens Community Group format (the format of `tokens.json`) | `https://tr.designtokens.org/format/` |
| Tailwind CSS v4 CSS-first configuration (`@theme`) | `https://tailwindcss.com/docs/theme` |
| WCAG 2.0 — the standard `[DS20 p.7]` cites | `https://www.w3.org/TR/WCAG20/` |

## Reproducing this skill's artifacts

```bash
node scripts/build-theme.ts        # tokens.json -> assets/theme.css
./scripts/verify-theme.sh          # byte-compare; exit 1 on drift
./tests/run-tests.sh               # full suite; ALL TESTS PASSED on success
```

> [!NOTE]
> No network access, no dependencies — Node 22.18+ builtins only.
