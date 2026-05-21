# Coordination at Scale Laboratory Website

This repository contains the Astro-based website for the Virginia Tech Coordination at Scale Laboratory (CAS Lab).

Primary public URLs:

- `https://caslab-vt.github.io/`
- `https://caslab.ece.vt.edu/`

The site is built as a static Astro project and deployed with GitHub Actions through GitHub Pages. The same deployed site can also be served from the university domain.

## Stack

- Astro
- Tailwind CSS
- React
- Pagefind

## Local Development

Requirements:

- Node.js `>= 22.12.0`

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Run Astro checks:

```bash
npm run lint
```

## Project Structure

- `src/pages/` - site routes
- `src/content/` - structured lab content
- `src/assets/` - images and local media
- `public/` - static files copied directly to the build
- `.github/workflows/deploy-pages.yml` - GitHub Pages deployment workflow

Reference and scrape artifacts that are not part of the live site have been moved under `archive/`.

## Deployment

This repository is intended to be the special GitHub Pages organization site repository.

For the root GitHub Pages URL to work, the names must match exactly:

- GitHub organization/account: `caslab-vt`
- Repository name: `caslab-vt.github.io`

That exact pairing produces:

- repository URL: `https://github.com/caslab-vt/caslab-vt.github.io`
- site URL: `https://caslab-vt.github.io/`

If the repository name changes to anything else, GitHub Pages will no longer publish at the root URL and will instead use a project-style path.

### Recommended Release Sequence

1. Commit local changes.
2. Update the local `origin` remote if it still points to the old repository name.
3. Push to `main`.
4. Enable GitHub Pages with `GitHub Actions` as the source.
5. Confirm the site is live at `https://caslab-vt.github.io/`.
6. Configure the custom domain in GitHub Pages.
7. Ask university IT to point `caslab.ece.vt.edu` to GitHub Pages.

### GitHub Pages

1. Push changes to `main`.
2. In GitHub, open `Settings -> Pages`.
3. Set the source to `GitHub Actions`.
4. The workflow in `.github/workflows/deploy-pages.yml` will build and publish the site.

Exact local commands:

```bash
git add .
git commit -m "Update CAS Lab website"
git push origin main
```

### Custom Domain

For the university domain:

1. In GitHub, open `Settings -> Pages`.
2. Set the custom domain to `caslab.ece.vt.edu`.
3. In `Settings -> Secrets and variables -> Actions -> Variables`, add:

```text
PAGES_SITE_URL = https://caslab.ece.vt.edu
```

4. Ask the university IT team to create a DNS `CNAME` record:

```text
caslab.ece.vt.edu -> caslab-vt.github.io
```

If the university does not allow direct GitHub Pages DNS mapping, they may instead provide a reverse proxy.

## Git Remote

If your local clone still points to the old repository name, update it with:

```bash
git remote set-url origin git@github.com:caslab-vt/caslab-vt.github.io.git
git remote -v
```

Expected output:

```text
origin  git@github.com:caslab-vt/caslab-vt.github.io.git (fetch)
origin  git@github.com:caslab-vt/caslab-vt.github.io.git (push)
```

At the time of this note, a common post-rename issue is that the local clone still points to:

```text
git@github.com:caslab-vt/website-caslab.git
```

That should be updated before the next push.

## Notes

- The local folder name does not need to match the GitHub repository name.
- The site is configured to work both at the GitHub Pages root URL and at the custom university domain.
