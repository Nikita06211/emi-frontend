## Project setup (how to run locally)

Follow these steps to get the project running locally. Commands assume PowerShell on Windows (the default shell in this workspace).

Prerequisites
- Node.js 16+ installed (LTS recommended)
- npm available (bundled with Node)

Install dependencies
```powershell
cd C:\Users\ADMIN\Desktop\emi-frontend
npm install
```

Tailwind CSS (project already has packages installed). If Tailwind isn't configured yet, run these to initialize and add the directives:
```powershell
# initialize tailwind config and postcss
npx tailwindcss init -p

# then add the directives to your main CSS (src/index.css):
# @tailwind base;
# @tailwind components;
# @tailwind utilities;
```

Dev server
```powershell
npm run dev
```

Build for production
```powershell
npm run build
```

Preview production build locally
```powershell
npm run preview
```

Notes
- The frontend expects the API at the endpoints used in `src/api/productApi.ts`. If you run a local backend, ensure its base URL/config is correct.
- Many components use Tailwind utility classes. If you do not see expected styles at runtime, ensure the Tailwind config exists and `src/index.css` contains the `@tailwind` directives, then restart the dev server.
- If you run into TypeScript errors referencing unused variables, remove or update the code that declares them (I removed an unused `columns` state in `src/pages/Home.tsx`).

