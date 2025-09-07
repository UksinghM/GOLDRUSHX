const express = require('express');
const router = express.Router();
const Extension = require('../models/Extension');
const axios = require('axios');

// Create a new extension
router.post('/', async (req, res) => {
  console.log('POST /extensions called with body:', req.body);
  try {
    const {
      name,
      publisher,
      identifier,
      version,
      logo,
      description,
      confirm,
      published,
      user
    } = req.body;

    // Only require the fields provided by the frontend
    const extension = new Extension({
      name,
      publisher,
      identifier,
      version,
      logo,
      description,
      published: published || false,
      user: user || undefined
    });
    await extension.save();
    console.log('Extension saved successfully:', extension);
    res.status(201).json(extension);
  } catch (error) {
    console.error('Error saving extension:', error);
    res.status(500).json({ error: error.message });
  }
});


// Get all extensions
router.get('/', async (req, res) => {
  try {
    const extensions = await Extension.find();
    res.json(extensions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single extension by ID
router.get('/:id', async (req, res) => {
  try {
    const extension = await Extension.findById(req.params.id);
    if (!extension) return res.status(404).json({ error: 'Extension not found' });
    res.json(extension);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an extension
router.put('/:id', async (req, res) => {
  try {
    const updated = await Extension.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Extension not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an extension
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Extension.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Extension not found' });
    res.json({ message: 'Extension deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle publish status
router.patch('/:id/publish', async (req, res) => {
  try {
    const extension = await Extension.findById(req.params.id);
    if (!extension) return res.status(404).json({ error: 'Extension not found' });
    extension.published = !extension.published;
    await extension.save();
    res.json(extension);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Extension existence validation route
router.get('/api/validate-extension', async (req, res) => {
  const { publisher, identifier } = req.query;
  if (!publisher || !identifier) {
    return res.status(400).json({ valid: false, message: 'Missing publisher or identifier' });
  }
  const fullId = `${identifier}`;
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
    console.log('Marketplace validation:', { status: response.status, responseUrl });
    if (responseUrl.includes('search?')) {
      return res.status(404).json({ valid: false, message: 'Extension not found' });
    }
    return res.status(200).json({ valid: true });
  } catch (error) {
    // Defensive: handle error.response for redirects/errors
    let responseUrl = '';
    if (error.response) {
      try {
        responseUrl = error.response?.request?.res?.responseUrl || '';
      } catch (e) {
        responseUrl = '';
      }
      console.log('Marketplace validation (error):', { status: error.response.status, responseUrl });
      if (responseUrl.includes('search?')) {
        return res.status(404).json({ valid: false, message: 'Extension not found' });
      }
    }
    console.error('Validation error:', error.message);
    return res.status(404).json({ valid: false, message: 'Extension does not exist' });
  }
});

module.exports = router; 