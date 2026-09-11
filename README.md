<div align="center">

  <h1>Portal-Devops</h1>
  <p><strong>Centralized DevOps Operational Portal & Observability Dashboard</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Framework-Next.js_14-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Library-React_18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Language-TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Styling-TailwindCSS_3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/UI_Primitives-Radix_UI-161618?style=flat-square&logo=radix-ui&logoColor=white" alt="Radix UI" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
  </p>

</div>

---

### Overview

`Portal-Devops` is an enterprise-oriented internal developer portal (IDP) designed to aggregate real-time infrastructure metrics, streamline deployments, monitor services, and provide self-service tooling for engineering teams.

Built with modern web standards, it bridges the gap between infrastructure operations and developer workflows through an intuitive, high-performance interface.

---

### Key Capabilities

- **Infrastructure Telemetry & Metrics:** Visualizes cluster health, CPU/Memory resource consumption, and network throughput via Recharts.
- **Service Catalog & Health Tracking:** Centralized directory of microservices with live availability indicators, latency checks, and incident status.
- **Self-Service Operational Actions:** Controlled triggers for deployment pipelines, log inspection, and cache purges.
- **Modular Design System:** Built with Radix UI headless components, accessible dialogs, dropdowns, and Tailwind CSS theming.
- **Micro-Interactions & Fluidity:** Animated transitions powered by Framer Motion.

---

### Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router Architecture) |
| **Core Language** | TypeScript 5 (Strict Type Checking) |
| **UI Components** | Radix UI primitives (`@radix-ui/react-*`) |
| **Styling** | Tailwind CSS 3 with `tailwind-merge` & `clsx` |
| **Data Visualization** | Recharts & Lucide React Icons |
| **Animation Engine** | Framer Motion 11 |

---

### Repository Layout

```text
Portal-Devops/
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI widgets, charts, and navigation bars
├── hooks/                # Custom React hooks (telemetry, state)
├── lib/                  # Utilities, formatters, and API client helpers
├── types/                # TypeScript interface and type definitions
├── public/               # Static assets and brand logos
├── next.config.js        # Next.js build and runtime configuration
├── tailwind.config.js    # Design system tokens and styling extensions
├── tsconfig.json         # TypeScript compiler configuration
└── README.md
```

---

### Getting Started

#### Prerequisites
- Node.js (`>= 18.17.0`)
- npm or pnpm package manager

#### Installation & Development

```bash
# Clone the repository
git clone https://github.com/NeoScraids/Portal-Devops.git
cd Portal-Devops

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the portal.

#### Production Build

```bash
# Compile and optimize production bundle
npm run build

# Start production server
npm run start
```

---

### License

Distributed under the MIT License. Developed and maintained by [Brandon Mendieta](https://github.com/NeoScraids).