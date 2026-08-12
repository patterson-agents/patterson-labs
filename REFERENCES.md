# References — patterson-labs

Authoritative sources behind what is incubating in this repository.

> [!IMPORTANT]
> Where a source is silent, the gap is recorded as `[TBD: what is missing]` rather than
> filled — see [`docs/promotion-path.md`](docs/promotion-path.md) criterion 3 and criterion 5
> for two open examples.

## Handoff and charter

The scaffolding instructions and project charter behind this repository are workspace-level
documents, not part of this repository:

| Document | Location |
|---|---|
| `HANDOFF.md` | At the `patterson-agents` workspace root (sibling to this repository's checkout), not inside `patterson-labs` itself. `[TBD: no canonical published URL — the workspace root aggregating all five Patterson repositories is not itself a git repository.]` |
| `PROJECT-CHARTER.md` | Same workspace root. `[TBD: same gap as above.]` |

## Promotion criteria

| Document | What it covers |
|---|---|
| [`docs/promotion-path.md`](docs/promotion-path.md) | The graduation gate into `patterson-corp` — tests, provenance, size, `[TBD]` regressions, review, `claude plugin validate .` |
| [`patterson-corp/README.md`](https://github.com/patterson-agents/patterson-corp/blob/main/README.md) § Provenance and gaps | The platform-wide provenance convention this repository's promotion criteria are built against |

## Upstream GitHub Agentic Workflows

`patterson-labs` carries the harvest destination for `agentic-workflow-designer` and runs its
own `gh aw` weekly incubation review. The org's position and the sources behind it are recorded
in [`docs/gh-aw-adoption.md`](docs/gh-aw-adoption.md), which cites:

| Resource | URL |
|---|---|
| `githubnext/agentics` — the workflow pack this repository evaluated | `https://github.com/githubnext/agentics` |
| `gh-aw` — the GitHub CLI extension that compiles and runs agentic workflows | `https://github.com/githubnext/gh-aw` |

A fuller assessment of both — the compiler, the permission model, and a Patterson adoption
path — is captured in
[`patterson-agents/patterson-platform-docs`](https://github.com/patterson-agents/patterson-platform-docs)
at `references/assessments/agentics-and-gh-aw.md`.

## Per-skill provenance convention

Every skill under `plugins/*/skills/<name>/` should carry `_SOURCES.md` and `REFERENCES.md`,
matching the `patterson-corp` convention this repository inherits. `agentic-workflow-designer`,
harvested from `patterson-skills`, is tracked against this convention in
[`docs/promotion-path.md`](docs/promotion-path.md) criterion 2.
