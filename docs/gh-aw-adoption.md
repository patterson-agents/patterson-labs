# Agentic-workflow adoption: `gh aw` and `githubnext/agentics`

Records the org's position on GitHub Agentic Workflows (`gh aw`) and the `githubnext/agentics`
sample pack, citing
[`.tmp/staging/reuse/agentics-and-gh-aw.md`](../../.tmp/staging/reuse/agentics-and-gh-aw.md)
(researched 2026-08-11 from a full local clone of `githubnext/agentics` @ `1c6668b`).

## What `gh aw` is

**GitHub Agentic Workflows** is a GitHub CLI extension (Public Preview, GitHub Next +
Microsoft Research) that compiles Markdown-with-YAML-frontmatter workflow definitions
(`.github/workflows/*.md`) into hardened `.lock.yml` GitHub Actions workflows. Both the
source `.md` and the generated `.lock.yml` are committed; the lock file's header records a
`Source:` line pinning the upstream workflow to a commit SHA, which is what lets
`gh aw update` re-pull upstream changes later.

## Already running in `patterson-design-plugins`

Three agentic workflows are live today in
[`patterson-design-plugins/.github/workflows/`](../../patterson-design-plugins/.github/workflows/),
compiled with **gh-aw v0.81.6**:

| Workflow | Upstream source | Engine |
|---|---|---|
| `ci-doctor.md` + `.lock.yml` | `githubnext/agentics` | copilot (1.0.65) |
| `repo-ask.md` + `.lock.yml` | `githubnext/agentics/workflows/repo-ask.md@1c6668b7` | copilot |
| `repo-chronicle.md` + `.lock.yml` | `githubnext/agentics/workflows/repo-chronicle.md@1c6668b7` | claude (2.1.191) |

This repository's own `.github/workflows/incubation-review.md` — the weekly incubation
review — and the `repo-ask.md` workflows shipped in `patterson-dental` and `patterson-vet`
by this same change were compiled locally with **gh-aw v0.85.4**, the version installed via
`mise` in this environment. The version drift between `patterson-design-plugins` (v0.81.6)
and these newer repositories (v0.85.4) is itself a finding: `gh aw upgrade` has not yet been
run against `patterson-design-plugins`, so the org is currently running two compiler
versions side by side.

## House frontmatter policy

Every agentic workflow authored under `patterson-agents` is expected to follow the policy
recorded in `.tmp/staging/reuse/agentics-and-gh-aw.md` Phase 1:

- `strict: true` on every workflow.
- The agent job stays read-only — `permissions: read-all` or narrower; writes only through
  `safe-outputs:` with explicit caps (`max:`, `title-prefix:`, etc.).
- `timeout-minutes:` always set.
- `network.allowed` (or the `defaults` shorthand) explicit, never unrestricted.
- `tools.bash` narrowed to a named allowlist for any workflow that reads issue/PR text.
- `tools.github.mode: gh-proxy` unless a workflow genuinely needs the full local MCP
  toolset.
- `skip-if-match:` on scheduled workflows, to avoid duplicate issue creation across runs.

This repository's own `incubation-review.md` (weekly, scheduled) satisfies this policy —
see the file itself for the concrete frontmatter.

## GitHub-template adoption of `githubnext/agentics`: documented, not executed

Adopting `githubnext/agentics` as a GitHub template repository — so that Patterson could
fork it with history preserved, the way GitHub's own template mechanism works — requires a
**remote mutation** (marking a repository's `is_template` flag via the GitHub API or web
UI). That is out of scope for this change, which is local-file-generation only and performs
no remote git or `gh` operation.

What *is* in scope, and done: `gh aw init --engine claude` (local file generation) and
`gh aw compile` (local compilation) in each of `patterson-labs`, `patterson-dental`, and
`patterson-vet`, plus the hand-authored workflows this change ships. The gap — that
`githubnext/agentics` itself is not marked as a template, and that Patterson has not yet
published its own `patterson-workflows` pack in the shape `.tmp/staging/reuse/agentics-and-gh-aw.md`
Phase 3 describes — is recorded here as a deviation, not silently worked around.

## Recommended next steps (not executed by this change)

Per `.tmp/staging/reuse/agentics-and-gh-aw.md` Phase 2 and Phase 3:

1. Curate a Patterson-approved shortlist from the 61 `agentics` workflows (the staging doc
   suggests `issue-triage`, `pr-fix`, `link-checker`, `cost-tracker` as high-value adds
   beyond the three already running).
2. Publish `patterson-agents/patterson-workflows` as a standalone workflow pack, structured
   like `agentics` itself, so any Patterson repo can `gh aw add patterson-agents/patterson-workflows/<name>`.
   Note this is a *different* `patterson-workflows` than the plugin of the same name shipped
   in this repository's `plugins/patterson-workflows/` — that plugin harvests the
   *authoring* skill; the pack described here would be the *catalog of workflows themselves*.
3. Run `gh aw upgrade` against `patterson-design-plugins` to close the v0.81.6 → v0.85.4 gap
   noted above.
