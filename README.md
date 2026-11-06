# Coordination at Scale Laboratory Website

This repository contains the Astro-based website for the Virginia Tech Coordination at Scale Laboratory (CAS Lab).

The site is built as a static Astro project and deployed with GitHub Actions through GitHub Pages.

- GitHub Pages URL: `https://caslab-vt.github.io/`
- Optional university domain: `https://caslab.ece.vt.edu/`

The university domain requires separate DNS and HTTPS setup. Configuring it as the Pages custom domain redirects the GitHub Pages URL to that domain; these are not two independent deployments.

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

## Deployment

This repository is intended to be the special GitHub Pages organization site repository.

For the root GitHub Pages URL to work, the names must match exactly:

- GitHub organization/account: `caslab-vt`
- Repository name: `caslab-vt.github.io`

That exact pairing produces:

- repository URL: `https://github.com/caslab-vt/caslab-vt.github.io`
- site URL: `https://caslab-vt.github.io/`

If the repository name changes to anything else, GitHub Pages will no longer publish at the root URL and will instead use a project-style path.

### GitHub Pages recovery and deployment

The workflow in [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) runs on pushes to `main` and supports manual runs. Its `build` job uses Node.js 22, runs `npm ci` and `npm run build` (Astro and Pagefind), then uploads `dist/`. The `deploy` job publishes that artifact through the `github-pages` environment.

Use the following checklist to recover the standalone GitHub Pages URL. Repository settings and DNS are separate from the committed files; this checklist does not imply that those settings have already been changed or verified.

1. In [Settings -> Pages](https://github.com/caslab-vt/caslab-vt.github.io/settings/pages), set **Build and deployment -> Source** to **GitHub Actions**. Do not select **Deploy from a branch** or a Jekyll build: the Astro source must be built first.
2. If the intended destination is `https://caslab-vt.github.io/`, leave **Custom domain** empty. Remove a stale university-domain entry only when restoring the standalone GitHub URL is intended. A configured custom domain can redirect an otherwise successful GitHub Pages deployment.
3. In **Settings -> Secrets and variables -> Actions -> Variables**, check `PAGES_SITE_URL` and `PAGES_BASE_PATH`. For this organization-site repository, leaving both unset uses `https://caslab-vt.github.io/` and `/` during Actions builds. If explicit overrides are needed, use those values. Remove old project-path or university-domain overrides when recovering the standalone GitHub URL. These variables control the generated site; they do not configure Pages routing, DNS, or certificates.
4. Start a **new** run from `main`: open [Actions -> Deploy to GitHub Pages](https://github.com/caslab-vt/caslab-vt.github.io/actions/workflows/deploy-pages.yml), choose **Run workflow**, select **main**, and run it. A new push to `main` also triggers the workflow. Changing settings or variables alone does not rebuild the site.
5. Check the new run's branch and commit, then confirm that **both `build` and `deploy` succeed**. If deployment is awaiting approval, review the `github-pages` environment's protection rules. Build success alone does not confirm publication.
6. Open the deployment URL and verify the homepage, internal navigation, images/styles, and search. Check the final browser URL for unexpected redirects and refresh to avoid testing an old cached page.

For normal releases, review and commit the intended changes, then push to `main`:

```bash
git add <changed-files>
git commit -m "Update CAS Lab website"
git push origin main
```

If a run fails, inspect the failed job before retrying: dependency/build failures belong to `build`; Pages permissions, environment approvals, and publishing failures belong to `deploy`. An old successful run does not verify the current configuration.

### University domain: separate cutover

Complete and verify the GitHub Pages deployment first. Coordinate the following cutover with university IT rather than treating the domain change as part of GitHub URL recovery.

1. Confirm with university IT that `caslab.ece.vt.edu` can point directly to GitHub Pages and agree on the cutover.
2. When ready, set **Settings -> Pages -> Custom domain** to `caslab.ece.vt.edu`. This changes the public destination: GitHub Pages redirects the default `github.io` URL to the custom domain.
3. Set the Actions repository variable `PAGES_SITE_URL` to `https://caslab.ece.vt.edu`. Leave `PAGES_BASE_PATH` unset or set it to `/`.
4. Ask university IT to create the DNS record:

   ```text
   caslab.ece.vt.edu CNAME caslab-vt.github.io
   ```

   The target is a hostname, without `https://` or a path. Changing `PAGES_SITE_URL` alone does not create this DNS record.
5. After DNS propagates, confirm the domain check succeeds in **Settings -> Pages**. Wait for GitHub's certificate to be available, then enable **Enforce HTTPS**.
6. Start a new deployment from `main` using the procedure above. Confirm both jobs succeed and test `https://caslab.ece.vt.edu/`, its internal pages and assets, and the redirect from `https://caslab-vt.github.io/`.

If university IT requires a reverse proxy instead of direct DNS mapping, obtain its routing and TLS requirements before changing the Pages custom domain. A proxy setup is a separate arrangement and is not verified by a successful GitHub Actions run.

## Git Remote

This repository should use the following git remote:

```text
git@github.com:caslab-vt/caslab-vt.github.io.git
```

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
- The GitHub Pages root URL and university domain use separate configuration steps; verify the intended destination after each change.
