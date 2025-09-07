const express = require('express');
const axios = require('axios');
const RequestExtension = require('../models/requestModel');
const router = express.Router();

// PUT /extensions/publish/:identifier
router.put('/publish/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    const data = req.body;
    let request = await RequestExtension.findOne({ identifier, status: 'pending' });
    if (request) {
      Object.assign(request, data);
    } else {
      request = new RequestExtension(data);
    }
    await request.save();
    res.status(200).json({ success: true, request });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /extensions?published=false&user=userId
router.get('/', async (req, res) => {
  try {
    const { published, user } = req.query;
    if (published === 'false' && user) {
      const requests = await RequestExtension.find({ user, status: 'pending' });
      return res.status(200).json(requests);
    }
    res.status(400).json({ error: 'Invalid query params' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /extensions/api/validate-extension?publisher=...&identifier=...
router.get('/api/validate-extension', async (req, res) => {
  const { publisher, identifier } = req.query;
  if (!publisher || !identifier) {
    return res.status(400).json({ valid: false, message: 'Missing publisher or identifier' });
  }
  const fullId = `${publisher}.${identifier}`;
  const url = `https://marketplace.visualstudio.com/items?itemName=${fullId}`;
  try {
    const response = await axios.get(url, {
      maxRedirects: 0,
      validateStatus: (status) => status < 400 || status === 302,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    let responseUrl = '';
    try {
      responseUrl = response?.request?.res?.responseUrl || '';
    } catch (e) {
      responseUrl = '';
    }
    if (responseUrl.includes('itemName=')) {
      return res.status(200).json({ valid: true });
    }
    return res.status(404).json({ valid: false, message: 'Extension not found' });
  } catch (error) {
    let responseUrl = '';
    if (error.response) {
      try {
        responseUrl = error.response?.request?.res?.responseUrl || '';
      } catch (e) {
        responseUrl = '';
      }
      if (responseUrl.includes('itemName=')) {
        return res.status(200).json({ valid: true });
      }
    }
    return res.status(404).json({ valid: false, message: 'Extension does not exist' });
  }
});

module.exports = router;
