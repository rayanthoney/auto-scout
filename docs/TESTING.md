    # Testing the AI-Powered Search Interface

## Quick Start

### 1. Start Both Servers

Run both the Vite dev server and the Express API server:

```bash
npm run dev:all
```

This will start:
- **Frontend**: http://localhost:5173 (Vite)
- **Backend API**: http://localhost:3001 (Express)

### 2. Test the Search Flow

1. **Open the app**: Navigate to http://localhost:5173
2. **Fill in the search form**:
   - Make: `Toyota`
   - Model: `Camry`
   - Min Year: `2020`
   - Max Year: `2024`
   - Min Price: `20000`
   - Max Price: `30000`
   - Zip Code: `90210`
   - Radius: `50 miles`
3. **Click "Search Vehicles with AI"**
4. **Watch the loading animation** (AI searching message)
5. **View results** - Should show 10-20 real car listings

### 3. What to Expect

✅ **Loading State**: Animated spinner with "Searching with AI..." message
✅ **Results**: Real car listings from Autotrader, Cars.com, etc.
✅ **Vehicle Cards**: Display price, mileage, location, features
✅ **External Links**: Click "View Listing" to see original listing
✅ **Cache Indicator**: Shows if results are cached (faster subsequent searches)
✅ **Search Time**: Displays how long the AI search took

### 4. Test Caching

1. Perform a search (e.g., Toyota Camry)
2. Note the search time (e.g., "5.2s")
3. Click search again with same parameters
4. Should see "Cached" indicator and much faster response

## API Endpoints

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Search Cars
```bash
curl -X POST http://localhost:3001/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "make": "Toyota",
    "model": "Camry",
    "yearMin": 2020,
    "yearMax": 2024,
    "priceMin": 20000,
    "priceMax": 30000,
    "location": "90210",
    "radius": 50
  }'
```

### Cache Stats
```bash
curl http://localhost:3001/api/cache/stats
```

### Clear Cache
```bash
curl -X POST http://localhost:3001/api/cache/clear
```

## Troubleshooting

### Server Not Starting
- Make sure port 3001 is available
- Check `.env` file has `GEMINI_API_KEY`
- Kill any existing server: `pkill -f "node server.js"`

### No Results Returned
- Check API server logs in terminal
- Verify Gemini API key is valid
- Try a different make/model combination
- Check network connection

### CORS Errors
- Make sure both servers are running
- Frontend should be on port 5173
- Backend should be on port 3001

### Images Not Loading
- This is normal - AI may not always return valid image URLs
- Fallback placeholder will display

## Expected Performance

- **First Search**: 5-10 seconds (AI processing)
- **Cached Search**: <1 second
- **Results Count**: 10-20 listings
- **Cache Duration**: 10 minutes

## Next Steps

After testing:
1. ✅ Verify search works end-to-end
2. ✅ Check results display correctly
3. ✅ Test caching functionality
4. ⏭️ Add filtering and sorting
5. ⏭️ Implement pagination
6. ⏭️ Mobile responsiveness testing

---

**Status**: Ready for Testing! 🚀
