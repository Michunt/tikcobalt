import serverlessHttp from 'serverless-http';
import express from 'express';

// Create a minimal Express app for Netlify
const app = express();

app.use(express.json());

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running on Netlify' });
});

// Main endpoint that explains the limitation
app.all('/api/*', (req, res) => {
  res.status(501).json({
    error: 'Not Implemented',
    message: 'The full Cobalt API requires a dedicated server environment with persistent processes and system dependencies like ffmpeg. Netlify Functions are stateless and cannot run the full Cobalt backend.',
    suggestion: 'Please deploy the Cobalt API on a VPS, dedicated server, or container platform like Heroku, Railway, or Render.'
  });
});

export const handler = serverlessHttp(app);
