# Deploy (cPanel SSH + GitHub Actions)

Push to `main` → Actions SSHs into cPanel → updates `/home1/islerind/public_html` to match `origin/main`.

## 1. GitHub secrets (you are on the right page)

On **Settings → Secrets and variables → Actions**:

1. Click the green **New repository secret** button.
2. Add these **four** secrets (one at a time — Name + Secret → Add secret):

| Name | What to paste |
|------|----------------|
| `SSH_HOST` | Your cPanel host / IP (e.g. `islerindia.com` or the server hostname from the hosting panel) |
| `SSH_USER` | cPanel username (likely `islerind`) |
| `SSH_PASSWORD` | Your SSH / cPanel password |
| `DEPLOY_PATH` | `/home1/islerind/public_html` |

Optional: `SSH_PORT` = `22` (only if your host uses a non-standard SSH port).

You should then see four repository secrets listed on that page.

## 2. One-time: put the repo in public_html

SSH in once (Terminal / PuTTY / `ssh islerind@YOUR_HOST`), then either:

**A — empty public_html (preferred):**
```bash
cd /home1/islerind
# backup anything already there first if needed
mv public_html public_html.bak 2>/dev/null || true
git clone https://github.com/islerindia/website-version-1.git public_html
cd public_html
git checkout main
```

**B — public_html already has files:** clone into a temp folder, then move contents so the folder stays `public_html` (cPanel expects that name).

The Actions job only runs `git fetch` / `reset` inside `DEPLOY_PATH`, so that folder must already be a git clone of this repo.

## 3. Verify

After secrets are saved and the clone exists, push to `main` (or **Actions → Deploy to server → Run workflow**). Check the run is green, then hard-refresh the live site.
