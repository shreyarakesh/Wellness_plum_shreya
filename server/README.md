# Node/Express Proxy for Wellness Board

Securely call the AI provider without exposing keys to the browser.

## Quickstart
```bash
cd server
npm install
cp .env.example .env
# edit .env and add your OPENAI_API_KEY
npm start
# server runs on http://localhost:8787
```

### Endpoints
- `POST /api/chat-completions`
  - body: `{ "prompt": string, "model": "gpt-4o-mini" }`
  - response: `{ "text": string }` (model output)

### Environment
- `OPENAI_API_KEY` (required)
- `OPENAI_BASE` (optional; defaults to OpenAI API)
- `OPENAI_MODEL` (optional; default `gpt-4o-mini`)
- `PORT` (default 8787)
