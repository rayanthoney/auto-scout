import { initializeGemini, getGeminiModel, searchCarListings } from './src/utils/gemini.js';

/**
 * Test script to verify Gemini API integration
 */
async function testGeminiAPI() {
    console.log('🚀 Testing Gemini API Integration...\n');

    try {
        // Test 1: Initialize Gemini
        console.log('✓ Test 1: Initializing Gemini AI...');
        const genAI = initializeGemini();
        console.log('  ✅ Gemini AI initialized successfully\n');

        // Test 2: Get model with grounding
        console.log('✓ Test 2: Getting Gemini model with web search grounding...');
        const model = getGeminiModel();
        console.log('  ✅ Model configured successfully\n');

        // Test 3: Simple prompt test
        console.log('✓ Test 3: Testing simple prompt...');
        const testResult = await model.generateContent('What is the current year?');
        const testResponse = await testResult.response;
        console.log('  ✅ Response:', testResponse.text().substring(0, 100) + '...\n');

        // Test 4: Car listing search (small test)
        console.log('✓ Test 4: Testing car listing search...');
        console.log('  Searching for: 2020-2024 Toyota Camry near 90210, $20k-$30k');

        const searchParams = {
            make: 'Toyota',
            model: 'Camry',
            yearMin: 2020,
            yearMax: 2024,
            priceMin: 20000,
            priceMax: 30000,
            location: '90210',
            radius: 50
        };

        const listings = await searchCarListings(searchParams);
        console.log(`  ✅ Found ${listings.length} listings\n`);

        // Display first listing as example
        if (listings.length > 0) {
            console.log('  📋 Sample Listing:');
            const sample = listings[0];
            console.log(`     Year: ${sample.year}`);
            console.log(`     Make: ${sample.make}`);
            console.log(`     Model: ${sample.model}`);
            console.log(`     Price: $${sample.price.toLocaleString()}`);
            console.log(`     Mileage: ${sample.mileage.toLocaleString()} miles`);
            console.log(`     Location: ${sample.location.city}, ${sample.location.state}`);
            console.log(`     Source: ${sample.source}`);
            console.log(`     URL: ${sample.listing_url}\n`);
        }

        console.log('✅ All tests passed! Gemini API is working correctly.\n');
        console.log('📊 API Usage Summary:');
        console.log('   - Free tier: 1,000 requests/day via CLI');
        console.log('   - Grounding: 1,500 searches/day free');
        console.log('   - Cost per search: ~$0.01 (with caching)\n');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('\nTroubleshooting:');
        console.error('1. Check that GEMINI_API_KEY is set in .env file');
        console.error('2. Verify API key is valid at https://ai.google.dev/');
        console.error('3. Ensure you have internet connection for web search grounding');
        process.exit(1);
    }
}

// Run tests
testGeminiAPI();
