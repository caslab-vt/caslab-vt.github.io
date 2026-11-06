# CAS Lab website

The Virginia Tech Coordination at Scale Laboratory website uses Astro, Tailwind CSS, React, and Pagefind. GitHub Actions builds and publishes it from `main`.

## Current status

- GitHub Pages source: **GitHub Actions**.
- Current address: https://caslab-vt.github.io/
- University address to launch: https://caslab.ece.vt.edu/
- Build settings: `PAGES_SITE_URL=https://caslab-vt.github.io`; `PAGES_BASE_PATH` is unset and defaults to `/`.
- University cutover is deferred. The Pages custom domain is empty, so the GitHub address stays available.

Use **main only** for all website updates and manual deployments.

## Later: launch the university address

### 1. Agree on a cutover time, then prepare GitHub

When you are ready to switch, a repository administrator completes these settings before IT changes DNS:

1. Open [Settings -> Pages](https://github.com/caslab-vt/caslab-vt.github.io/settings/pages). Keep **Source = GitHub Actions**. Set **Custom domain = caslab.ece.vt.edu** and save.
2. Open **Settings -> Secrets and variables -> Actions -> Variables**. Set **PAGES_SITE_URL = https://caslab.ece.vt.edu**. Leave **PAGES_BASE_PATH** unset, which uses `/`.
3. Open [Deploy to GitHub Pages](https://github.com/caslab-vt/caslab-vt.github.io/actions/workflows/deploy-pages.yml), select **Run workflow -> main -> Run workflow**, and confirm both **build** and **deploy** pass.

Saving the custom domain can redirect the GitHub address before university DNS is ready. Complete this step just before the agreed DNS change if the GitHub address must stay available until cutover. Do not change DNS before the custom domain is saved in GitHub.

### 2. Send this exact request to university IT

> Please point the CAS Lab website to GitHub Pages by creating or updating this DNS record:
>
> Type: **CNAME**  
> Name / fully qualified hostname: **caslab.ece.vt.edu**  
> Target: **caslab-vt.github.io**
>
> Replace any conflicting existing A, AAAA, or CNAME record at this exact hostname. Please leave all other university DNS records unchanged and let us know when the change is complete.

The target is a hostname, without `https://` or a path. IT does not need website files, GitHub credentials, a web server, or a separate TLS certificate.

### 3. Finish HTTPS after DNS propagates

The repository administrator checks **Settings -> Pages**, waits for GitHub's domain check and certificate, then enables **Enforce HTTPS** when available. This step may need to wait until after DNS changes.

Verify https://caslab.ece.vt.edu/ loads securely and check navigation, images, and search. The GitHub address should redirect to the university address.

[GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## Future website updates

Push reviewed changes to `main`. The [deployment workflow](.github/workflows/deploy-pages.yml) installs dependencies, builds Astro and Pagefind into `dist/`, and publishes it. Confirm both jobs pass in Actions. No DNS changes are needed for normal updates.

To rebuild without a code change, use **Actions -> Deploy to GitHub Pages -> Run workflow -> main**.

## Local development

Use Node.js **22.12.0 or newer**.

```bash
npm ci
npm run dev
```

Before publishing changes:

```bash
npm run lint
npm run build
```

- `src/pages/`: site routes
- `src/content/`: lab content
- `src/assets/`: images and media
- `public/`: static files
- `.github/workflows/deploy-pages.yml`: deployment

Repository: https://github.com/caslab-vt/caslab-vt.github.io
