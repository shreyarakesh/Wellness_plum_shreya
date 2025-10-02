# Wellness Recommendation Board — React + Vite + Proxy

This repo contains:
- `/app` — React + Vite + TypeScript frontend using Context/components
- `/server` — Node/Express proxy to keep API keys off the browser

## End-to-end Demo
1) Start proxy (recommended):
```bash
cd server
npm install
cp .env.example .env
# put your OPENAI_API_KEY in .env
npm start
```
2) Start frontend:
```bash
cd app
npm install
npm run dev
# open http://localhost:5173
```
By default, the frontend proxies `/api` to `http://localhost:8787`.

## Submission Tips
- Record the full flow (Profile → Board → Detail → Favorites).
- Include `README` + screenshots + known issues + improvements.
- Ensure regenerate and loading states are visible.
# Wellness_plum_shreya
