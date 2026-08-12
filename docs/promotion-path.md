# Promotion path: incubation to `patterson-corp`

This document states the criteria an artifact in `patterson-labs` meets before it graduates
to [`patterson-corp`](../../patterson-corp/), the enterprise layer of the Patterson agent
platform.

## Why a written path

`patterson-labs` exists because not everything that is useful is ready to be enterprise-wide
capability on day one. Without a written graduation gate, "promote it" becomes a judgment
call made differently each time. This document is that gate, written down before anything
has actually gone through it.

## Destination

The canonical destination for a graduating artifact is **`patterson-corp`** — specifically
one of its existing plugins (`patterson-engineering`, `patterson-brand`) if the artifact
extends an existing capability, or a new plugin entry in `patterson-corp/.claude-plugin/marketplace.json`
if it stands alone.

## Graduation criteria

An artifact SHALL meet every criterion below before it is proposed for promotion. Each
criterion traces to a source; where HANDOFF.md 1F does not specify a concrete gate, that gap
is recorded rather than filled with an invented threshold.

| # | Criterion | Detail | Source |
|---|---|---|---|
| 1 | Tests green | The artifact's own `run-tests.sh` (or equivalent skill/plugin test) exits `0` on the commit being promoted. | Pattern established by every sibling marketplace's own test suite (this change). |
| 2 | Provenance complete | Every skill carries `_SOURCES.md` (where its knowledge came from, with confidence) and `REFERENCES.md` (canonical locations), matching the provenance convention already used by `patterson-corp`'s plugins. | `patterson-corp/README.md` § Provenance and gaps. |
| 3 | Size budget | `[TBD: not specified in HANDOFF.md 1F — no numeric size budget stated for a promoted artifact]`. `patterson-corp` publishes an aggregate size badge (currently ~1.1 MB total); a promoted artifact should not move that badge by an order of magnitude without separate sign-off. | `patterson-corp/README.md` size badge; no per-artifact budget stated. |
| 4 | No `[TBD]` regressions | Promotion must not introduce a new `[TBD: ...]` marker into a capability area that `patterson-corp` had already resolved. An artifact may carry its own pre-existing `[TBD]` markers into `patterson-corp` (the platform records silence rather than filling it), but it may not silently overwrite a resolved answer with an unresolved one. | `patterson-corp/README.md` § Provenance and gaps: "the platform never manufactures organizational policy." |
| 5 | 2-approver review | At least two reviewers approve the promotion, beyond the author. | `[TBD: not specified in HANDOFF.md 1F — no named review body or reviewer count for this repository]`; the "2-approver" figure is carried here as the working assumption until a source overrides it. |
| 6 | `claude plugin validate .` passes | Running the canonical validator against the target location in `patterson-corp` (with the artifact merged in) exits clean, or with only the same warning classes `patterson-corp` already tolerates. | `patterson-corp/CLAUDE.md`; this change's own verification step. |

## What promotion does *not* require

- **Perfection.** A `[TBD]` marker the artifact already carries from `patterson-labs` may
  travel with it — the platform's stance is to record what is unknown, not to block on
  resolving everything before every move.
- **A remote operation.** Promotion in this document is a description of the gate, not an
  automation. No step here performs a `git push`, opens a PR, or creates a remote resource;
  see [`docs/gh-aw-adoption.md`](gh-aw-adoption.md) for where a remote step would eventually
  fit (the weekly incubation-review workflow only *recommends* promotion via an issue, it
  does not execute it).

## Process, once criteria are met

1. Open an issue (or let the weekly `incubation-review` workflow open one) naming the
   artifact and checking off each criterion above with evidence.
2. Get the 2-approver sign-off (criterion 5).
3. Move the files into `patterson-corp`'s plugin tree, bump both `plugin.json` and
   `marketplace.json` versions per `patterson-design-plugins`' dual-version-source-of-truth
   convention (the same discipline `patterson-corp`'s own plugins already follow).
4. Run `claude plugin validate .` in `patterson-corp` and confirm the sibling repository's
   own suite still passes with the artifact removed (a promoted artifact should leave no
   dangling reference behind in `patterson-labs`).
5. Remove the artifact from `patterson-labs` (or leave a pointer, if history matters more
   than a clean tree — `[TBD: not specified in HANDOFF.md 1F]` which of the two is preferred).
