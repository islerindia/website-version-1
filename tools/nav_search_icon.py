# Nav search: a magnifier icon in the links row, immediately to the LEFT of
# "Home" (client 2026-08-11). Replaces the old always-visible search rectangle,
# which CSS now hides until .is-search-open is set — the field element itself
# stays in the markup so assets/js/search.js keeps working untouched.
#
# Idempotent AND position-correcting: any existing .isler-nav__search-li is
# stripped first, then re-inserted before the Home <li>. Re-running after a
# side change moves it rather than adding a second one.
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

BUTTON = (
    '<li class="isler-nav__search-li">'
    '<button class="isler-nav__search-toggle isler-nav__search-toggle--inline" type="button" '
    'aria-label="Search" aria-expanded="false">'
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'
    '</svg></button></li>'
)

EXISTING = re.compile(r'<li class="isler-nav__search-li">.*?</li>', re.S)
HOME_LI = re.compile(r'(<li>\s*<a href="index\.html">Home</a>\s*</li>)')

placed, missing = [], []

for f in sorted(ROOT.rglob('*.html')):
    if any(p in ('.git', 'node_modules', 'tools') for p in f.parts):
        continue
    src = f.read_text(encoding='utf-8')
    if 'isler-nav__search' not in src:
        continue

    cleaned = EXISTING.sub('', src)
    m = HOME_LI.search(cleaned)
    if not m:
        missing.append(f.name)
        continue

    # LEFT of Home: insert at the start of the Home <li>, not after it.
    out = cleaned[:m.start(1)] + BUTTON + cleaned[m.start(1):]
    if out != src:
        f.write_text(out, encoding='utf-8')
    placed.append(f.name)

print(f'icon before Home : {len(placed)}')
print(f'NO MATCH         : {len(missing)}')
for n in missing[:20]:
    print('   ', n)
