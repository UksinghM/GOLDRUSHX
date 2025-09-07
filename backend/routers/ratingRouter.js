const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel');
const Extension = require('../models/Extension');

const jwt = require('jsonwebtoken');

// Add new review
router.post('/add', async (req, res) => {
    try {
        const { extensionId, rating, comment } = req.body;
        let userId = req.body.userId;

        // If userId is not provided, try to decode from token
        if (!userId) {
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1];
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
                    userId = decoded.id || decoded._id;
                } catch (err) {
                    return res.status(401).json({ error: 'Invalid token' });
                }
            } else {
                return res.status(401).json({ error: 'No userId or token provided' });
            }
        }

        const newRating = new Rating({
            extension: extensionId,
            user: userId,
            rating,
            comment
        });
        const savedRating = await newRating.save();

        // Update extension's average rating
        const allRatings = await Rating.find({ extension: extensionId });
        const avgRating = allRatings.length > 0 ? allRatings.reduce((acc, curr) => acc + curr.rating, 0) / allRatings.length : 0;
        await Extension.findByIdAndUpdate(extensionId, { 'stats.rating': avgRating });

        res.status(200).json(savedRating);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get reviews by extension
router.get('/byextension/:id', async (req, res) => {
    try {
        const reviews = await Rating.find({ extension: req.params.id })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get average rating for extension
router.get('/average/:id', async (req, res) => {
    try {
        const reviews = await Rating.find({ extension: req.params.id });
        const avgRating = reviews.length > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length : 0;
        res.status(200).json({ averageRating: avgRating });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
