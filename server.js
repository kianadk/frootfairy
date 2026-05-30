const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build'), { redirect: false }));

// API routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// SPA fallback: Any request that doesn't match an API route will send the index.html file
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
