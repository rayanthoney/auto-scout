# Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Gemini API key to .env
# GEMINI_API_KEY=your_key_here

# Start both servers
npm run dev:all
```

**Frontend**: http://localhost:5173  
**Backend API**: http://localhost:3001

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `PORT` | Backend server port | 3001 |
| `NODE_ENV` | Environment mode | development |
| `CACHE_TTL` | Cache duration (seconds) | 900 |

Get your API key: [Google AI Studio](https://aistudio.google.com/)

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Frontend only (Vite) |
| `npm run server` | Backend only (Express) |
| `npm run dev:all` | Both servers |
| `npm run build` | Production build |
| `npm run test:gemini` | Test AI integration |
| `npm run lint` | ESLint check |

---

## Testing

### Test AI Integration
```bash
npm run test:gemini
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:3001/api/health

# Search cars
curl -X POST http://localhost:3001/api/search \
  -H "Content-Type: application/json" \
  -d '{"make": "Toyota", "model": "Camry"}'

# Cache stats
curl http://localhost:3001/api/cache/stats
```

### Test Search Flow
1. Open http://localhost:5173
2. Enter: Make: `Toyota`, Model: `Camry`
3. Click "Search Vehicles with AI"
4. View results (5-10 seconds for AI search)

---

## Troubleshooting

### "GEMINI_API_KEY is not set"
- Check `.env` file exists
- Verify key format (no quotes needed)
- Restart server after changes

### "Failed to fetch" / CORS errors
- Ensure both servers are running (`npm run dev:all`)
- Backend should be on port 3001
- Frontend should be on port 5173

### No results / Empty response
- Check API key is valid
- Try different make/model
- Check server logs for errors

### Rate limit exceeded
- Free tier: 1,000 requests/day
- Wait 24 hours or use caching
- Cache reduces API calls by ~50%

---

## Performance

| Metric | Expected |
|--------|----------|
| First search | 5-10 seconds |
| Cached search | <1 second |
| Cache duration | 10 minutes |
| Results count | 10-20 listings |

---

See [legacy/](./legacy/) for original setup documentation.
