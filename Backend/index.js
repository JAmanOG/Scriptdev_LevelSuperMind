import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30 // limit each IP to 30 requests per minute
});

app.use(limiter);
app.use(cors({
    origin: 'https://calm-grass-040f99400.4.azurestaticapps.net', // Allow all origins for testing
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express.json());

app.post('/proxy', async (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid authorization header' });
    }

    try {
        const response = await fetch('https://api.langflow.astra.datastax.com/lf/154dca2e-d514-4a19-91fc-f4d198ebd1d9/api/v1/run/cbafec6b-51a8-414e-9adf-5b01f6442ce4?stream=false', {
            method: 'POST',
            headers: {
                'Authorization': authHeader || "Bearer AstraCS:PTHYKJbrTJHxWPoISNNOrzoR:c2331dc003818b31bc690eaf74641b0e1c43b5c201a1b4a36d066c239d48975f",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(8080, () => console.log('Proxy server running on port 4000'));
