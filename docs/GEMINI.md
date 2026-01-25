# AI Integration Guide

AutoScout leverages AI for intelligent car listing search and data extraction.

---

## Google Gemini Pro

**Primary AI service** for web search and data extraction.

### Why Gemini?
- ✅ Built-in web search grounding
- ✅ Free tier: 1,000 requests/day
- ✅ 1,500 grounded searches/day FREE
- ✅ ~$0.01-0.03 per search with caching
- ✅ Real-time data (no knowledge cutoff)

### Setup
1. Get API key: [Google AI Studio](https://aistudio.google.com/)
2. Add to `.env`: `GEMINI_API_KEY=your_key`
3. Test: `npm run test:gemini`

### Usage
```javascript
import { searchCarListings } from './src/utils/gemini.js';

const results = await searchCarListings({
  make: 'Toyota',
  model: 'Camry',
  yearMin: 2020,
  yearMax: 2024,
  priceMin: 20000,
  priceMax: 30000,
  location: '90210',
  radius: 50
});
```

### Cost Optimization
- **Caching**: 10-minute TTL reduces API calls ~50%
- **Free tier**: 1,000 requests/day via CLI
- **Projected**: ~$150/month at scale

---

## Anthropic Claude

**Alternative/supplementary AI** for enhanced analysis and natural language.

### Why Claude?
- ✅ Superior reasoning and analysis
- ✅ Better at structured data extraction
- ✅ More natural conversation flow
- ✅ Strong at explaining pricing insights

### Potential Use Cases
- Price trend analysis
- Vehicle comparison narratives
- Smart search suggestions
- User query understanding

### Setup (Future)
1. Get API key: [Anthropic Console](https://console.anthropic.com/)
2. Add to `.env`: `ANTHROPIC_API_KEY=your_key`

### Integration Status
- [ ] Claude API integration
- [ ] Price analysis feature
- [ ] Comparison tool with Claude narratives

---

## Comparison

| Feature | Gemini Pro | Claude |
|---------|------------|--------|
| Web Search | ✅ Built-in | ❌ Needs tool |
| Data Extraction | ✅ Good | ✅ Excellent |
| Analysis | ✅ Good | ✅ Superior |
| Cost | Lower | Higher |
| Primary Use | Search | Analysis |

---

## Architecture

```
[User Search] 
     │
     ▼
[Gemini Pro] ──▶ Web Search ──▶ Extract Listings
     │
     ▼
[Cache Results]
     │
     ▼
[Claude (Optional)] ──▶ Price Analysis / Insights
     │
     ▼
[Display Results]
```

---

See [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for setup instructions.
