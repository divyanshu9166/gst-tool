# GST HSN Lookup — Free GST Tools for India

A production-ready static website built with **AstroJS v5** + **Tailwind CSS v4**, providing free GST tools for Indian businesses and taxpayers.

## 🛠️ Tools Included

| Tool | URL | Description |
|------|-----|-------------|
| GST Calculator | `/gst-calculator` | Add/remove GST with CGST/SGST split. All slabs + custom rate. |
| HSN Code Lookup | `/hsn-code-lookup` | Instant offline search over 100+ HSN/SAC codes with GST rates. |
| GSTIN Validator | `/gstin-validator` | Validates format + official checksum. Decodes state & PAN. |
| FAQ | `/faq` | 19 common GST questions with JSON-LD structured data. |

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.17.1
- npm ≥ 9

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:4321)
npm run dev
```

### Build for Production

```bash
npm run build
# Output is in the ./dist directory
```

### Preview the Production Build

```bash
npm run preview
```

## ☁️ Deploying to Cloudflare Pages

### Option A — Cloudflare Dashboard (recommended for first deploy)

1. Push this repository to GitLab (or GitHub).
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create a project**.
3. Connect your Git provider and select this repository.
4. Set the following build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `18` (set in Environment Variables: `NODE_VERSION = 18`)
5. Click **Save and Deploy**.

### Option B — Wrangler CLI

```bash
# Install Wrangler globally (if not already installed)
npm install -g wrangler

# Authenticate
wrangler login

# Deploy (after running npm run build)
wrangler pages deploy dist --project-name=gst-hsn-lookup
```

### Custom Domain

After deploying, add your custom domain in **Cloudflare Pages → Custom Domains**. The `public/_headers` file already includes a `noindex` rule for `*.pages.dev` preview URLs so only your production domain gets indexed.

## ⚙️ Configuration

### 1. Set Your Production Domain

Open `astro.config.mjs` and replace the `SITE` constant:

```js
// astro.config.mjs
const SITE = 'https://yourdomain.com'; // ← replace this
```

Also update `public/robots.txt`:

```
Sitemap: https://yourdomain.com/sitemap-index.xml
```

### 2. Set Your Google Analytics 4 Measurement ID

Open `src/layouts/BaseLayout.astro` and replace `G-XXXXXXXXXX` with your real GA4 Measurement ID (found in Google Analytics → Admin → Data Streams):

```html
<!-- In BaseLayout.astro, find and replace both occurrences: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
...
gtag('config', 'G-XXXXXXXXXX');
```

### 3. Set Your Contact Email

Open `src/pages/contact.astro` and replace the placeholder:

```js
const CONTACT_EMAIL = 'contact@yourdomain.com'; // ← replace this
```

## 📁 Project Structure

```
├── astro.config.mjs          # Astro config — SITE constant, sitemap, Tailwind
├── package.json
├── tsconfig.json
├── public/
│   ├── _headers              # Cloudflare Pages headers (noindex for *.pages.dev)
│   ├── robots.txt            # Sitemap reference
│   └── favicon.svg
└── src/
    ├── data/
    │   ├── hsn-codes.ts      # HSN/SAC dataset — easy to extend
    │   └── faqs.ts           # FAQ data used on home + /faq pages
    ├── layouts/
    │   └── BaseLayout.astro  # Shared layout: SEO, GA4, dark mode, Header, Footer
    ├── components/
    │   ├── Header.astro      # Sticky nav with dark mode toggle + mobile menu
    │   └── Footer.astro      # Footer with tool + legal links
    ├── pages/
    │   ├── index.astro       # Home page with SEO content + FAQ preview
    │   ├── gst-calculator.astro
    │   ├── hsn-code-lookup.astro
    │   ├── gstin-validator.astro
    │   ├── faq.astro
    │   ├── about.astro
    │   ├── contact.astro
    │   ├── privacy-policy.astro
    │   ├── terms.astro
    │   └── 404.astro
    └── styles/
        └── global.css        # Tailwind v4 import + CSS custom properties
```

## 🔧 Extending the HSN Dataset

The HSN/SAC code dataset lives in `src/data/hsn-codes.ts`. To add more codes:

```ts
// Add entries to the hsnCodes array:
{ code: '1234', description: 'Your product description', gstRate: 18, type: 'HSN' },
{ code: '998999', description: 'Your service description', gstRate: 18, type: 'SAC' },
```

The lookup page automatically picks up all entries — no other changes needed.

## 🎨 Design System

- **Framework:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js` needed)
- **Accent colour:** Indigo-600 (`#4F46E5`) — change `--accent` in `src/styles/global.css`
- **Dark mode:** Class-based (`html.dark`), toggled via localStorage
- **Font:** Inter (Google Fonts) with system-ui fallback

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Astro | ^5.9 | Static site generator (MPA) |
| Tailwind CSS | ^4.1 | Utility-first CSS |
| @tailwindcss/vite | ^4.1 | Tailwind v4 Vite plugin |
| @astrojs/sitemap | ^3.2 | Sitemap generation |
| TypeScript | ^5.8 | Type safety |

## 📄 License

This project is proprietary. All rights reserved.

---

**Disclaimer:** GST rates and information are for reference only. Always verify with the official GST portal at [gst.gov.in](https://www.gst.gov.in).

## Add your files

* [Create](https://docs.gitlab.com/user/project/repository/web_editor/#create-a-file) or [upload](https://docs.gitlab.com/user/project/repository/web_editor/#upload-a-file) files
* [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/technods1/new-tool-website.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

* [Set up project integrations](https://gitlab.com/technods1/new-tool-website/-/settings/integrations)

## Collaborate with your team

* [Invite team members and collaborators](https://docs.gitlab.com/user/project/members/)
* [Create a new merge request](https://docs.gitlab.com/user/project/merge_requests/creating_merge_requests/)
* [Automatically close issues from merge requests](https://docs.gitlab.com/user/project/issues/managing_issues/#closing-issues-automatically)
* [Enable merge request approvals](https://docs.gitlab.com/user/project/merge_requests/approvals/)
* [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

* [Get started with GitLab CI/CD](https://docs.gitlab.com/ci/quick_start/)
* [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/user/application_security/sast/)
* [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/topics/autodevops/requirements/)
* [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/user/clusters/agent/)
* [Set up protected environments](https://docs.gitlab.com/ci/environments/protected_environments/)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
