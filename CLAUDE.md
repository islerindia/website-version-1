\## Workflow rules

\- Never ask for confirmation before editing files, running scripts, or making fixes — just do it.

\- Commit and push automatically once a change is verified working locally (visually checked or matches the requested fix). Don't wait for "push it".

\- Only pause and ask before pushing if the change is structural (major layout rework, deleting content/sections, routing/nav changes) or touches something outside index.html/business.html/style without being asked.

\- After any push, report the commit hash and a one-line summary of what changed. Don't ask if it's live — check the Actions run yourself and confirm.

\- Skip clarifying questions for styling/sizing/text/image fixes — pick the sensible fix and report what you did.



\## Project constraints

\- Build chain is stale — edit index.html directly. Never run `git checkout -- index.html \&\& python build\_rev2.py`.

\- Preview at localhost:8080, always hard refresh (Ctrl+Shift+R).

\- Typeface is set centrally in assets/css/type.css (Sora display / Inter body). It must stay the LAST stylesheet in every page's `<head>` — it loads after catalog.css on purpose. Don't set font-family anywhere else.

\- No broken links as of 2026-08-12. The assets/docs/isler-products.pdf download was removed from index.html and business.html rather than left 404ing; don't re-add it until the file actually exists.

\- Awaiting from client: supply-chain proof photos, brand logos, category photography for the four Our Business tiles (they currently reuse assets/images/keyproduct-\* shots), plus sign-off on 3 Our Story roadmap items (₹300/600 Cr figures, China partnership/acquisition line, "4th Factory???").

\- Supplied and built 2026-08-12: the Our Story narrative, and the capacity figures (they now sit in the homepage stats strip; Capacity at a Glance was deleted).

