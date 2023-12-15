// Import express module
const express = require('express');

// Initialize express app
const app = express();

// Specify a port
const PORT = process.env.PORT || 3001;

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Financial Portfolio App Backend is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
