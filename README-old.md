# AutoScout - AI-Powered Car Sales Search

> A web-based application that aggregates car sales data using AI-powered web search, enabling users to compare prices, availability, and vehicle details across multiple platforms from a single interface.

## 🚗 Overview

AutoScout simplifies the car buying research process by leveraging **Google Gemini Pro AI** to dynamically search and extract car listings from 10+ car sales websites. No more visiting multiple sites—get comprehensive results in seconds.

## ✨ Key Features

- **AI-Powered Search**: Gemini Pro with web search grounding automatically finds listings
- **Multi-Source Aggregation**: Results from Autotrader, Cars.com, CarGurus, and more
- **Advanced Filtering**: Filter by price, mileage, year, distance, body style, transmission, fuel type
- **Side-by-Side Comparison**: Compare up to 4 listings simultaneously
- **Saved Searches**: Persist your search criteria for quick access
- **Confidence Scoring**: AI provides confidence levels for data accuracy
- **Real-Time Data**: Always up-to-date listings with intelligent caching

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React.js with ES6+
- Tailwind CSS for styling
- Responsive design (mobile, tablet, desktop)

**Backend:**
- Node.js with Express.js
- AI prompt management and orchestration
- Redis caching layer
- RESTful API design

**AI Integration:**
- **Google Gemini Pro (2.5 Flash)** - Primary AI service
- Built-in web search grounding (no separate search API needed)
- Automatic data extraction and normalization
- 1,000 requests/day FREE via CLI
- 1,500 grounded searches/day FREE

**Data Storage:**
- LocalStorage for user preferences
- Redis for server-side caching
- Optional: PostgreSQL/MongoDB for analytics

### System Flow

```
User → Frontend → Backend API → Gemini Pro AI → Web Search → Car Sales Sites
                      ↓              ↓                ↓
                 LocalStorage   Cache Layer    Structured Data
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ram911_autoScout.git
cd ram911_autoScout

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# Cache Configuration (optional)
REDIS_URL=redis://localhost:6379
CACHE_TTL=900  # 15 minutes in seconds

# API Rate Limiting
MAX_REQUESTS_PER_MINUTE=60
```

### Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# Run tests
npm test
```

The application will be available at `http://localhost:3000`

## 📖 Usage

1. **Search for a Vehicle**
   - Enter make, model, year range, and location
   - Click "Search" to initiate AI-powered search

2. **Filter Results**
   - Use sidebar filters to refine results
   - Sort by price, mileage, year, or distance

3. **View Details**
   - Click on any listing for full details
   - View image gallery, specifications, and seller info

4. **Compare Listings**
   - Select up to 4 listings
   - Click "Compare" for side-by-side view

5. **Save Searches**
   - Click "Save Search" to persist criteria
   - Access saved searches from the menu

## 🎯 Project Status

**Current Phase**: Phase 1 - MVP Development

- [x] Project setup and architecture design
- [x] AI integration research and planning
- [ ] Gemini Pro API integration
- [ ] Prompt engineering for data extraction
- [ ] Frontend UI components
- [ ] Backend API endpoints
- [ ] Caching layer implementation
- [ ] Testing and optimization

## 💰 Cost Optimization

- **Free Tier**: 1,000 requests/day via Gemini CLI
- **Grounding**: 1,500 free searches/day
- **Caching**: 50-70% cache hit rate target
- **Projected Cost**: ~$150/month at scale (with caching)
- **Per Search**: <$0.03 average cost

## 📊 Success Metrics

- ✅ 15+ listings per search (MVP)
- ✅ 95%+ data extraction accuracy
- ✅ <8 second response time
- ✅ 99% uptime during business hours
- ✅ 80%+ user satisfaction rating

## 🔒 Security & Privacy

- HTTPS for all connections
- API keys stored securely (never exposed to client)
- User search history stored locally only
- No personal data collection without consent
- Input validation to prevent injection attacks

## 📚 Documentation

- [Product Requirements Document](docs/car_sales_prd.md) - Full PRD with AI integration details
- [AI Model Comparison](docs/ai_comparison.md) - Analysis of AI options
- [Implementation Plan](docs/implementation_plan.md) - Development roadmap

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini Pro for AI-powered web search
- Car sales platforms for public data
- Open source community for tools and libraries

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Google Gemini Pro AI**
