const mongoose = require('mongoose');

const ExtensionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  developer: { type: String },
  publisher: { type: String, required: true },
  logo: { type: String }, // base64 or URL
  description: { type: String, required: true },
  category: { type: String },
  features: [{ type: String }],
  user: { type: String },
  version: { type: String, required: true },
  published: { type: Boolean, default: false },
  identifier: { type: String, required:true }, // Unique identifier for the extension
  stats: {
    downloads: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Extension', ExtensionSchema); 