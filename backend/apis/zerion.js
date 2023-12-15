require('dotenv').config();
const axios = require('axios');

const headers = {
  accept: 'application/json',
  authorization: `Basic ${process.env.ZERION_API_KEY}`
};

// Get wallet's portfolio
const getWalletPortfolio = async (address, currency) => {
  try {
    const response = await axios.get(`https://api.zerion.io/v1/wallets/${address}/portfolio?currency=${currency}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet portfolio from Zerion API:', error);
    throw error;
  }
};

module.exports = {
  getWalletPortfolio
};
