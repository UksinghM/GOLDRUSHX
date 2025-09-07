const express = require('express');
const router = express.Router();
const Publisher = require('../models/Publisher');
const bcrypt = require('bcryptjs');

// Registration route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await Publisher.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const publisher = new Publisher({ name, email, password: hashed });
    await publisher.save();
    res.status(201).json({ message: 'Registration submitted for approval' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all pending publishers
router.get('/pending', async (req, res) => {
  const pending = await Publisher.find({ status: 'pending' });
  res.json(pending);
});

// Approve publisher
router.post('/approve/:id', async (req, res) => {
  await Publisher.findByIdAndUpdate(req.params.id, { status: 'approved' });
  res.json({ message: 'Publisher approved' });
});

// Deny publisher
router.post('/deny/:id', async (req, res) => {
  await Publisher.findByIdAndUpdate(req.params.id, { status: 'denied' });
  res.json({ message: 'Publisher denied' });
});

module.exports = router;