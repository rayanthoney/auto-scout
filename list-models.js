import 'dotenv/config';

async function testApiKey() {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log('🔑 Testing Gemini API Key...\n');
    console.log(`API Key: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}\n`);

    // Try fetching models list via REST API
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log('✅ API Key is valid!\n');
            console.log('📦 Available Models:\n');
            data.models.forEach(model => {
                console.log(`   - ${model.name}`);
                console.log(`     Display Name: ${model.displayName}`);
                console.log(`     Methods: ${model.supportedGenerationMethods.join(', ')}`);
                console.log('');
            });
        } else {
            console.error('❌ API Error:', data);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testApiKey();
