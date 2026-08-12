#!/bin/sh
# Zero-dependency test suite for the lab-workshop-design-tokens skill.
# POSIX sh + node one-liners. No dependencies, no network.
#
#     ./tests/run-tests.sh      # 0 = all green, 1 = at least one failure
set -u

DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
SKILL_NAME="lab-workshop-design-tokens"
fail=0
tmp=$(mktemp -d 2>/dev/null || echo /tmp/lwdt-$$)
mkdir -p "$tmp" 2>/dev/null
trap 'rm -rf "$tmp"' EXIT

ok()  { echo "ok   $1"; }
bad() { echo "FAIL $1"; fail=1; }

node="${NODE:-node}"
if ! command -v "$node" >/dev/null 2>&1; then
  echo "FAIL $node not found"
  echo "TESTS FAILED"
  exit 1
fi

# --- 1. the five artifacts exist ---
missing=""
for f in SKILL.md DESIGN.md _SOURCES.md REFERENCES.md \
         assets/tokens.json assets/theme.css \
         scripts/build-theme.ts scripts/verify-theme.sh; do
  [ -f "$DIR/$f" ] || missing="$missing $f"
done
if [ -n "$missing" ]; then
  bad "missing artifact(s):$missing"
else
  ok "all required artifacts present"
fi

# --- 2. tokens.json parses and carries the DTCG schema + source attribution ---
if "$node" -e "
  const fs = require('node:fs');
  const t = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  if (t['\$schema'] !== 'https://tr.designtokens.org/format/') throw new Error('unexpected \$schema');
  const meta = t['\$extensions'] && t['\$extensions']['com.patterson.meta'];
  if (!meta) throw new Error('no com.patterson.meta');
  for (const k of ['project', 'projectId', 'snapshot', 'extractedOn', 'authoritativeSource']) {
    if (!meta[k]) throw new Error('meta.' + k + ' missing');
  }
  if (meta.extractedOn !== '2026-08-12') throw new Error('extractedOn is ' + meta.extractedOn);
" "$DIR/assets/tokens.json" >"$tmp/tok.err" 2>&1; then
  ok "tokens.json parses; DTCG schema and com.patterson.meta attribution present"
else
  bad "tokens.json: $(cat "$tmp/tok.err")"
fi

# --- 3. the generator reproduces theme.css byte-identically ---
if "$node" "$DIR/scripts/build-theme.ts" --tokens "$DIR/assets/tokens.json" --stdout >"$tmp/theme.css" 2>"$tmp/build.err"; then
  if cmp -s "$tmp/theme.css" "$DIR/assets/theme.css"; then
    ok "build-theme.ts --stdout is byte-identical to assets/theme.css (cmp)"
  else
    bad "build-theme.ts output differs from assets/theme.css: $(diff -u "$DIR/assets/theme.css" "$tmp/theme.css" | head -20)"
  fi
else
  bad "build-theme.ts failed: $(cat "$tmp/build.err")"
fi

# --- 4. --check agrees, and verify-theme.sh is green ---
if "$node" "$DIR/scripts/build-theme.ts" --check >/dev/null 2>&1; then
  ok "build-theme.ts --check reports assets/theme.css up to date"
else
  bad "build-theme.ts --check reports drift"
fi

if [ -x "$DIR/scripts/verify-theme.sh" ]; then
  if "$DIR/scripts/verify-theme.sh" >/dev/null 2>&1; then
    ok "verify-theme.sh exits 0 against the committed pair"
  else
    bad "verify-theme.sh exits non-zero against the committed pair"
  fi
else
  bad "scripts/verify-theme.sh is not executable"
fi

# --- 5. verify-theme.sh exits 1 with a diff when theme.css drifts ---
cp -R "$DIR" "$tmp/skill" 2>/dev/null
if [ -f "$tmp/skill/assets/theme.css" ]; then
  printf '/* hand-edited drift */\n' >>"$tmp/skill/assets/theme.css"
  "$tmp/skill/scripts/verify-theme.sh" >"$tmp/drift.out" 2>&1
  rc=$?
  if [ "$rc" -eq 1 ] && grep -q 'hand-edited drift' "$tmp/drift.out"; then
    ok "verify-theme.sh exits 1 and prints the diff when theme.css is perturbed"
  else
    bad "perturbed copy: verify-theme.sh exited $rc without a diff naming the drifted line"
  fi
else
  bad "could not stage a perturbed copy of the skill"
fi

# --- 6. forbidden strings: off-brand markers superseded by the 2025 Brand Guide ---
# These are the values the reconciliation REJECTED. They are permitted only in the two
# provenance documents (DESIGN.md, _SOURCES.md), where they are named as rejected values
# with their sources -- never on a shipped surface. Matched case-insensitively, because
# house style writes hexes in upper case.
shipped=$(find "$DIR/assets" "$DIR/scripts" "$DIR/SKILL.md" "$DIR/REFERENCES.md" -type f 2>/dev/null)
for needle in Figtree d98a00 c0392b rul6mjk; do
  hit=""
  if [ -n "$shipped" ]; then
    hit=$(grep -rIli -- "$needle" $shipped 2>/dev/null | head -1)
  fi
  if [ -n "$hit" ]; then
    bad "rejected value '$needle' found on a shipped surface: $hit"
  else
    ok "rejected value '$needle' absent from assets/, scripts/, SKILL.md, REFERENCES.md"
  fi
done

# --- 7. no binaries: no font files, no rasters ---
hit=$(find "$DIR" \( -iname "*.ttf" -o -iname "*.otf" -o -iname "*.woff" -o -iname "*.woff2" \
      -o -iname "*.eot" -o -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.gif" \
      -o -iname "*.pdf" \) 2>/dev/null | head -1)
if [ -n "$hit" ]; then
  bad "forbidden binary asset: $hit"
else
  ok "no font, raster or PDF binaries"
fi

# --- 8. theme.css declares no @font-face (the Adobe kit is referenced by identifier only) ---
# Comments are stripped first: the file explains IN A COMMENT that it deliberately ships no
# @font-face rule, and that sentence must not read as a violation of itself.
if "$node" -e "
  const fs = require('node:fs');
  const css = fs.readFileSync(process.argv[1], 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  if (/@font-face/.test(css)) process.exit(1);
" "$DIR/assets/theme.css" 2>/dev/null; then
  ok "theme.css declares no @font-face rule (comments stripped before checking)"
else
  bad "theme.css declares an @font-face rule"
fi

# --- 9. no emoji anywhere in the skill ---
skill_files=$(find "$DIR" -type f 2>/dev/null)
emoji_hit=$("$node" -e "
  const fs = require('node:fs');
  const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
  for (const f of process.argv.slice(1)) {
    let c;
    try { c = fs.readFileSync(f, 'utf8'); } catch { continue; }
    if (emojiRe.test(c)) { console.log(f); process.exit(0); }
  }
" $skill_files 2>/dev/null)
if [ -n "$emoji_hit" ]; then
  bad "emoji found in $emoji_hit"
else
  ok "no emoji anywhere in the skill"
fi

# --- 10. SKILL.md frontmatter name equals the skill directory name ---
fm_name=$("$node" -e "
  const fs = require('node:fs');
  const c = fs.readFileSync(process.argv[1], 'utf8');
  const m = c.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) process.exit(1);
  const n = m[1].match(/^name:\s*(.+?)\s*\$/m);
  if (!n) process.exit(1);
  process.stdout.write(n[1].trim());
" "$DIR/SKILL.md" 2>/dev/null)
if [ "$fm_name" = "$SKILL_NAME" ]; then
  ok "SKILL.md frontmatter name == $SKILL_NAME"
else
  bad "SKILL.md frontmatter name is '${fm_name:-<unparseable>}', expected $SKILL_NAME"
fi

if [ "$fail" -eq 0 ]; then
  echo "ALL TESTS PASSED"
else
  echo "TESTS FAILED"
fi
exit "$fail"
