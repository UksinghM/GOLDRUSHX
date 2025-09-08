const mongoose = require('mongoose');

const extensionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  publisher: { type: String, required: true },
  identifier: { type: String, required: true, unique: true },
  version: { type: String, required: true },
  logo: { type: String },
  description: { type: String },
  published: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String },
  features: [{ type: String }],
  stats: {
    downloads: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Extension', extensionSchema);