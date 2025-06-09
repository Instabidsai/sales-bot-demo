const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Widget route
app.get('/widget', (req, res) => {
    res.sendFile(path.join(__dirname, 'widget.html'));
});

// Embed script route
app.get('/embed.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'embed.js'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Proxy chat endpoint (temporary - will be replaced with actual bot URL)
app.post('/chat', async (req, res) => {
    try {
        // For demo purposes, return a mock response
        // In production, this would proxy to the actual sales bot
        const responses = {
            "start": "Hello! I'm your AI sales assistant from Instabids. I'm here to help you explore how we can bring your software ideas to life. Could you tell me a bit about your project or what you're looking to build?",
            "default": "I understand you're interested in our services. To give you the most accurate proposal, could you tell me more about your specific requirements? For example, are you looking to build a web app, mobile app, or perhaps an AI solution?"
        };
        
        const userMessage = req.body.message.toLowerCase();
        const response = responses[userMessage] || responses.default;
        
        res.json({
            response: response,
            thread_id: req.body.thread_id
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Sales bot demo server running on port ${PORT}`);
});