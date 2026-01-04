# Car Sales Search Application - Project Overview

## Executive Summary

This project builds a web-based application that aggregates car sales data using **AI-powered web search**, allowing users to compare prices, availability, and vehicle details in a centralized interface. The goal is to simplify the car buying research process by eliminating the need to visit multiple disparate websites.

## Core Objectives

- **AI-Powered Search**: Leverage Google Gemini Pro to dynamically search and extract car listings from the web
- **Unified Interface**: Query multiple platforms simultaneously through intelligent AI prompts
- **Comparison Tools**: Side-by-side comparison of vehicle listings
- **Market Visibility**: Provide clear pricing trends and deal identification
- **User Focus**: Cater to individual buyers, enthusiasts, and researchers

## Key Features

### Primary

- **AI Web Search**: Google Gemini Pro with grounding searches 10+ car sales websites
- **Intelligent Data Extraction**: AI automatically extracts structured listing data
- **Multi-Source Aggregation**: Consolidates results from Autotrader, Cars.com, CarGurus, and more
- **Advanced Filtering**: Price, Mileage, Year, Distance, Body Style, Transmission, Fuel Type
- **Results Display**: Clean cards with key info; consolidated result grid
- **Detailed Views**: Comprehensive vehicle specs, images, and seller info
- **Saved Searches**: Persist search criteria for quick access

### Secondary

- **AI Price Analysis**: Historical pricing context and market insights
- **Export**: CSV export for offline analysis
- **Watchlist**: Favoriting specific listings
- **Confidence Scoring**: AI provides confidence levels for extracted data

## Technical Architecture

### Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+), React.js or Vue.js
- **Backend**: Node.js with Express.js (AI orchestration, prompt management, caching)
- **AI Service**: Google Gemini Pro (2.5 Flash) - FREE for 1 year via Android service
  - Built-in web search grounding
  - 1,000 requests/day free via CLI
  - 1,500 grounded searches/day free
  - Lowest cost: ~$8 per 1,000 searches
- **Data**: LocalStorage for user preferences; Redis for caching (optional)
- **Fallback**: Optional direct API integrations for critical sources

### System Design

```
User Browser <-> Frontend App <-> Backend API Server <-> AI Service (Gemini Pro)
                      |                    |                        |
                 [LocalStorage]       [Cache Layer]          [Web Search Tool]
                                                                    |
                                                        [Car Sales Websites]
```

### AI-Powered Search Flow

1. User submits search query (make, model, filters)
2. Backend constructs AI prompt with search parameters
3. Gemini Pro executes web searches with built-in grounding
4. AI extracts and structures data from search results
5. Backend normalizes, validates, and caches results
6. Frontend displays aggregated listings with confidence scores

## Implementation Roadmap

1. **Phase 1 (MVP - Weeks 1-4)**: 
   - Basic search with Gemini Pro integration
   - Prompt engineering for data extraction
   - Simple results display
   - Caching layer
   - **Target**: 15+ listings, 90%+ accuracy, <$0.05/search

2. **Phase 2 (Enhanced - Weeks 5-8)**: 
   - Advanced filtering and sorting
   - Saved searches
   - Enhanced prompts for 8+ sources
   - Confidence scoring display
   - **Target**: 25+ listings, 95%+ accuracy, $0.03/search, 50% cache hit rate

3. **Phase 3 (Advanced - Weeks 9-12)**: 
   - Comparison tool
   - AI-powered price analysis
   - Smart search suggestions
   - Hybrid approach with API fallbacks
   - **Target**: 40+ listings, <$0.02/search, 70%+ cache hit rate

## AI Integration Highlights

### Why Google Gemini Pro?

- ✅ **FREE** for 1 year through Android service
- ✅ **Built-in web search** - No separate search API needed
- ✅ **Automatic citations** - Returns source links
- ✅ **Real-time data** - Overcomes knowledge cutoffs
- ✅ **Lowest cost** - $8/1K searches vs $40+ for alternatives
- ✅ **1M token context** - Can process large amounts of data

### Cost Optimization

- Aggressive caching (5-15 min TTL)
- Free tier: 1,000 requests/day via CLI
- Free grounding: 1,500 searches/day
- Projected cost: ~$150/month with 50% cache hit rate
- Scales efficiently with usage-based pricing

### Data Quality

- AI confidence scoring for each listing
- Validation rules for price, mileage, year
- Automatic deduplication across sources
- Error handling with retry logic
- Transparency about data sources

## Success Metrics

- Search results in <8 seconds (target: 6 seconds)
- 95%+ data extraction accuracy
- Reliable filtering and sorting
- 99% uptime during business hours
- Positive user satisfaction (80%+)
- Average cost per search <$0.03
- Cache hit rate >60%
- AI confidence scores >0.85

## Advantages Over Traditional API Integration

1. **No API contracts** - No subscriptions with car sales platforms
2. **Broader coverage** - Access sites without public APIs (Craigslist, Facebook Marketplace)
3. **Adaptability** - AI handles website changes automatically
4. **Natural language** - Can handle complex search queries
5. **Future-proof** - Adding new sources requires no code changes
6. **Lower initial cost** - No need to learn multiple API specifications

---

_Generated from `docs/car_sales_prd.md` - Version 2.0 (AI-Powered)_
