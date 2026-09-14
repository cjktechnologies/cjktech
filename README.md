# CJK Technologies

Official corporate website for **CJK Technologies** — an AI automation company designing, developing, deploying, and maintaining agentic systems across customer support, sales qualification, WhatsApp business automation, marketing workflows, back-office operations, and answer engine optimization (GEO).

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler / Dev Server**: Vite
- **Styling**: Industry Design System (OKLCH color ramps, blueprint registration frames, duotone photo filters, Barlow & Barlow Condensed typography)
- **Deployment**: Vercel, GitHub Pages, or any static hosting service

---

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
   The compiled static assets will be in the `dist/` directory.

4. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## Deploy to Vercel

### Option 1: Via Vercel Dashboard & GitHub (Recommended)
1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel automatically detects the Vite framework and applies the settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Any future commits pushed to your GitHub repository will trigger an automatic preview and production deployment.

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the interactive prompts to link and deploy your project.

---

## Deploy to GitHub Pages

1. In your GitHub repository, navigate to **Settings > Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. The included workflow `.github/workflows/deploy.yml` builds and packages the `dist` artifact on every push to `main`.

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions CI workflow
├── public/
│   ├── assets/             # Logo and static graphic assets
│   └── uploads/
├── src/
│   ├── data/
│   │   └── content.ts      # Structured website data (slides, solutions, pillars)
│   ├── App.tsx             # Main React application component
│   ├── index.css           # Global tokens, blueprint grid, & keyframe animations
│   ├── main.tsx            # React DOM mounting entry point
│   └── vite-env.d.ts       # Vite client types declaration
├── index.html              # HTML5 entry point
├── package.json            # Project manifest and scripts
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel routing & SPA rewrite configuration
└── vite.config.ts          # Vite build & dev server configuration
```

---

## License

© 2026 CJK Technologies. All rights reserved.
