# System Architecture

## Overview

AutoScout is an AI-powered car sales search application that aggregates listings from multiple sources using Google Gemini Pro.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4, React Router 7 |
| **Backend** | Node.js, Express.js 5 |
| **AI** | Google Gemini Pro (2.5 Flash) |
| **Caching** | In-memory (Map), optional Redis |
| **Deployment** | Vercel |

## System Design

```
┌─────────────┐     ┌─────────────┐     ┌───────────────┐     ┌─────────────────┐
│   Browser   │────▶│  Vite Dev   │────▶│  Express API  │────▶│  Gemini Pro AI  │
│   (React)   │     │  :5173      │     │    :3001      │     │  (Web Search)   │
└─────────────┘     └─────────────┘     └───────────────┘     └─────────────────┘
                                               │
                                        ┌──────┴──────┐
                                        │   Cache     │
                                        │  (10 min)   │
                                        └─────────────┘
```

## Key Components

### Frontend (`src/`)
- `pages/HomePage.jsx` - Search form
- `pages/ResultsPage.jsx` - Search results grid
- `pages/DetailsPage.jsx` - Vehicle details
- `components/VehicleCard.jsx` - Result cards
- `components/FilterPanel.jsx` - Filtering UI

### Backend (`server.js`)
- `POST /api/search` - AI-powered search
- `GET /api/health` - Health check
- `GET /api/cache/stats` - Cache statistics
- `POST /api/cache/clear` - Clear cache

### AI Integration (`src/utils/gemini.js`)
- `searchCarListings()` - Execute AI web search
- `validateListing()` - Data validation

## Data Flow

1. User submits search (make, model, filters)
2. Frontend calls `/api/search`
3. Backend checks cache → returns if hit
4. Backend constructs AI prompt
5. Gemini Pro searches web & extracts listings
6. Backend validates, normalizes, caches results
7. Frontend displays vehicle cards

---

See [car_sales_prd.md](./car_sales_prd.md) for full specifications.
