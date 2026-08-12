# Contributing to patterson-labs

`patterson-labs` follows the same contribution process as every Patterson agent-configuration
repository. The canonical process — the OpenSpec proposal workflow, repository conventions
(zero-dependency TypeScript, erasable syntax, kebab-case, the `[TBD]` marker, conventional
commits), and the pull request checklist — lives in
[`patterson-corp/CONTRIBUTING.md`](https://github.com/patterson-agents/patterson-corp/blob/main/CONTRIBUTING.md).
Read that first; this document only adds what is specific to incubation.

## Promotion path

Everything in this repository is **incubating** — it has not yet earned durable,
enterprise-wide status. Before proposing a change here, read
[`docs/promotion-path.md`](docs/promotion-path.md) for the full graduation criteria a plugin
must clear to move into `patterson-corp`, and
[`docs/gh-aw-adoption.md`](docs/gh-aw-adoption.md) for this repository's position on GitHub
Agentic Workflows.

Practically, contributing an incubating artifact here means:

1. Open a proposal the same way `patterson-corp` requires — a change directory with a
   `proposal.md` stating why, what changes, and non-goals — scoped to `patterson-labs`.
2. New or modified plugins land under `plugins/<plugin-name>/` with a
   `.claude-plugin/plugin.json` and one or more skills under `skills/<name>/`, each carrying
   `SKILL.md`, `_SOURCES.md`, and `REFERENCES.md`.
3. Register the plugin in `.claude-plugin/marketplace.json` with a `./`-prefixed `source`.
4. Run `sh tests/run-tests.sh` and `claude plugin validate .` before opening a pull request.

## Promoting an artifact to patterson-corp

When a plugin or skill here is judged durable and true for **all** of Patterson — not just
this incubation — it graduates rather than staying here indefinitely. Do not silently copy it;
open the promotion the way [`docs/promotion-path.md`](docs/promotion-path.md) describes:
tests green, provenance complete, within the size norms `patterson-corp` already carries, no
`[TBD]` regression against an answer `patterson-corp` had already resolved, 2-approver review,
and `claude plugin validate .` passing in `patterson-corp` with the artifact merged in.

Conventional commits, kebab-case, and the `[TBD]` marker for unknown facts all apply exactly as
in `patterson-corp`.
