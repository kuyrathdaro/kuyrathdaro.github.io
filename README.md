# Kuy Rathdaro — Personal Portfolio 🚀

Welcome to the repository for my personal developer portfolio website! This is a modern, high-performance, and visually engaging portfolio designed to showcase my journey, experiences, and technical expertise as a Senior Fullstack Developer & Tech Lead.

🔗 **Live Website**: [kuyrathdaro.github.io](https://kuyrathdaro.github.io)

---

## 🎨 Tech Stack & Tools

This portfolio is built on a modern frontend stack, focusing on speed, animations, and interactive experiences:

- **Framework**: [Astro v6](https://astro.build/) — Used for optimal performance, content-driven routing, and hybrid rendering.
- **UI & Logic**: [React 19](https://react.dev/) — Powers complex dynamic components.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — Next-generation CSS utility engine for layout, grid, and typography.
- **3D Graphics**: [Three.js](https://threejs.org/) / [React Three Fiber](https://r3f.docs.pmnd.rs/) / [Drei](https://github.com/pmndrs/drei) — Renders the interactive 3D Tech Globe.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) — Handles clean stagger, fade-in, and scrolling micro-interactions.
- **Icons**: [Iconify](https://iconify.design/) — On-demand SVG vector icon integration.

---

## ✨ Key Features

- **Interactive 3D Globe**: A stunning Three.js canvas featuring floating 3D globe.
- **Staggered & Micro-Animations**: Smooth entry animations using Framer Motion that improve visual engagement.
- **Professional Timeline**: An interactive experience journey mapping out my professional career from PHP development to Information Security and Fullstack Tech Leadership.
- **Clean Aesthetic**: Soft liquid gradient orbs in the background combined with a minimalist, high-contrast dark/light grid layout.
- **Optimized Performance**: Astro's partial hydration ensures minimal client-side JavaScript is loaded, making the site load extremely fast.

---

## 📂 Project Structure

```text
kuyrathdaro.github.io/
├── src/
│   ├── assets/         # Static assets (images, icons)
│   ├── components/     # UI components
│   │   ├── animations/ # Framer Motion wrapper components
│   │   ├── common/     # Reusable layout UI (Navbar, Button, etc.)
│   │   └── sections/   # Major page sections (TechGlobe, Timeline)
│   ├── data/           # Structured JSON files (experiences, contact)
│   ├── layouts/        # Page layouts (Layout.astro)
│   ├── lib/            # Utility and helper functions
│   ├── pages/          # Astro pages (routing)
│   └── styles/         # Global styles and Tailwind configuration
├── public/             # Static files served directly (favicon)
├── astro.config.mjs    # Astro configuration
└── package.json        # Project scripts and dependencies
```

---

## 🛠️ Getting Started & Commands

To run or build this project locally, ensure you have **Node.js** installed.

### 1. Installation
Installs the required node modules and dependencies:
```sh
npm install
```

### 2. Development
Starts the local development server with hot module replacement (HMR) at [http://localhost:4321](http://localhost:4321):
```sh
npm run dev
```

### 3. Production Build
Compiles your project and builds the optimized static production bundle in the `./dist/` directory:
```sh
npm run build
```

### 4. Local Preview
Preview the production build locally before deploying:
```sh
npm run preview
```

---

## 📝 License

This project is licensed under the MIT License — feel free to customize and use it for your own portfolios!
