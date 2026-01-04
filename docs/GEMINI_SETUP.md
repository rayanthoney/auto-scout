# Gemini API Setup Guide

## ✅ Setup Complete!

Your Google Gemini API has been successfully configured for the AutoScout project.

## 📁 Files Created

### 1. Environment Configuration
- **`.env`** - Contains your Gemini API key (secured, not tracked in git)
- **`.env.example`** - Template for other developers

### 2. Gemini Integration Module
- **`src/utils/gemini.js`** - Core Gemini AI utilities
  - `initializeGemini()` - Initialize Gemini client
  - `getGeminiModel()` - Get model with web search grounding
  - `searchCarListings()` - AI-powered car search
  - `validateListing()` - Data validation

### 3. Test Script
- **`test-gemini.js`** - Comprehensive API test suite

## 🧪 Testing Your Setup

Run the test script to verify everything works:

```bash
npm run test:gemini
```

This will:
1. ✓ Initialize Gemini AI
2. ✓ Configure model with web search grounding
3. ✓ Test simple prompt
4. ✓ Search for car listings (Toyota Camry example)
5. ✓ Display sample results

## 🔑 API Key Information

- **API Key**: Stored in `.env` file
- **Free Tier**: 1,000 requests/day via CLI
- **Grounding**: 1,500 searches/day FREE
- **Cost**: ~$0.01 per search (with caching)

## 📖 Usage Example

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

console.log(`Found ${results.length} listings`);
```

## 🔒 Security

- ✅ `.env` added to `.gitignore` - API key won't be committed
- ✅ Environment variables loaded via `dotenv`
- ✅ API key never exposed to client-side code

## 🚀 Next Steps

1. **Test the API**: Run `npm run test:gemini`
2. **Review Results**: Check the sample car listings
3. **Build Frontend**: Create UI components for search
4. **Implement Caching**: Add Redis for cost optimization
5. **Deploy**: Set environment variables on your hosting platform

## 📊 Monitoring Usage

Track your API usage at:
- [Google AI Studio](https://ai.google.dev/)
- [Google Cloud Console](https://console.cloud.google.com/)

## 💡 Tips

- **Caching**: Implement 5-15 minute cache to reduce costs
- **Rate Limiting**: Monitor free tier limits (1,000 req/day)
- **Prompt Optimization**: Refine prompts for better results
- **Error Handling**: Always wrap API calls in try-catch

## 🐛 Troubleshooting

**Error: "GEMINI_API_KEY is not set"**
- Check `.env` file exists in project root
- Verify API key is correctly formatted
- Restart dev server after adding `.env`

**Error: "API key invalid"**
- Verify key at https://ai.google.dev/
- Check for extra spaces or quotes in `.env`
- Generate new key if needed

**Error: "Rate limit exceeded"**
- Free tier: 1,000 requests/day
- Wait 24 hours or upgrade to paid tier
- Implement caching to reduce requests

---

**Setup Status**: ✅ Ready for Development
