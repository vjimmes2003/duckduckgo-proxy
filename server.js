const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get('/search', async (req, res) => {
  const query = req.query.q;
  const searchUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(searchUrl);
    const htmlText = await response.text();
    res.send(htmlText);
  } catch (error) {
    res.status(500).send('Error fetching results');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
