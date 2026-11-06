# CAS Lab website instructions

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

1. Open [this repository's Settings -> Pages](https://github.com/caslab-vt/caslab-vt.github.io/settings/pages).
   - Under **Build and deployment**, keep **Source** set to **GitHub Actions**.
   - In the **Custom domain** text box, enter exactly `caslab.ece.vt.edu` (no `https://`, slash, or path), then click **Save** next to that box.
2. Open **Settings -> Secrets and variables -> Actions**, then select the **Variables** tab.
   - Under **Repository variables**, find **PAGES_SITE_URL** and click its pencil icon, labeled [Edit PAGES_SITE_URL](https://github.com/caslab-vt/caslab-vt.github.io/settings/variables/actions/PAGES_SITE_URL).
   - Replace the **Value** `https://caslab-vt.github.io` with `https://caslab.ece.vt.edu`, then click **Update variable** to save.
   - Leave **PAGES_BASE_PATH** absent. The site already defaults to the root path `/`.
3. Start a new deployment from **main**. This publishes the changed URL variable; it is not another settings change.
   - Open [Actions -> Deploy to GitHub Pages](https://github.com/caslab-vt/caslab-vt.github.io/actions/workflows/deploy-pages.yml).
   - Click **Run workflow** above the run list. In **Use workflow from**, select **main**, then click the green **Run workflow** button.
   - Open the new run at the top of the list. Confirm its branch is **main** and wait for green checks on both jobs: **build** and **deploy**.

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

### 3. In GitHub Pages, turn on Enforce HTTPS

Do this **after IT confirms the DNS change**. The setting to update now is the **Enforce HTTPS checkbox: turn it on**.

1. Open [this repository's Settings -> Pages](https://github.com/caslab-vt/caslab-vt.github.io/settings/pages).
2. Confirm the settings saved in step 1 are still present:
   - **Build and deployment -> Source:** `GitHub Actions`.
   - **Custom domain:** `caslab.ece.vt.edu`. If the field is blank or different, enter that exact hostname and click **Save** beside it.
3. Wait for GitHub's DNS check to succeed. Under **Custom domain**, select the **Enforce HTTPS** checkbox so it is checked.
   - If the checkbox is disabled while GitHub creates the certificate, leave the domain saved, wait, and reload this same page. The option can take up to 24 hours to become available.
   - GitHub provisions the certificate; there is no certificate file to upload.
4. Open https://caslab.ece.vt.edu/ and confirm it loads securely. Check navigation, images, and search, then confirm https://caslab-vt.github.io/ redirects to it.

Do not change **PAGES_SITE_URL** again: step 1 already saved `https://caslab.ece.vt.edu` and deployed it. Enabling **Enforce HTTPS** does not require another code commit or workflow run.

[GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## Future website updates

Push reviewed changes to `main`. The [deployment workflow](../.github/workflows/deploy-pages.yml) installs dependencies, builds Astro and Pagefind into `dist/`, and publishes it. Confirm both jobs pass in Actions. No DNS changes are needed for normal updates.

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
