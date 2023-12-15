// Import express, CORS middleware, and other required modules
const express = require('express');
const cors = require('cors'); // Include CORS middleware
const { getWalletPortfolio } = require('./apis/zerion'); // Import the Zerion integration

// Initialize express app
const app = express();

// Specify a port
const PORT = process.env.PORT || 3001;

// Use CORS to allow requests from other domains
app.use(cors());

// Enable JSON body parsing for POST requests
app.use(express.json());

// Route to fetch wallet's portfolio
app.get('/wallet/:address/portfolio', async (req, res) => {
  try {
    const portfolio = await getWalletPortfolio(req.params.address, 'cad');
    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching wallet portfolio:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Financial Portfolio App Backend is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
