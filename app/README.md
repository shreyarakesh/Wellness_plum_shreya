# Wellness Recommendation Board — React + Vite 

## Quickstart
```bash
cd app
npm install
npm run dev
# open http://localhost:5173
```

### Using the secure proxy (recommended)
Run the server in ../server (see server/README.md). The Vite dev server proxies `/api` → `http://localhost:8787`.

### Without proxy (not recommended for prod)
In the Profile screen, toggle **Use Proxy = No**, then provide **API Base** and a model. The browser will call the external API directly (exposes key if used).

## Tech Notes
- React + Vite + TS
- Context for global state (profile, tips, favorites, AI config, status)
- LocalStorage persistence (no API key is persisted)
- Async: visible status indicator, robust mock fallback
- UI: same clean aesthetic as the vanilla version
