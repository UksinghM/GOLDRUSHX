const mongoose = require('mongoose');

const RequestExtensionSchema = new mongoose.Schema({
  name: { type: String, required: true },
//   publisher: { type: String, required: true },
  identifier: { type: String, required: true },
  version: { type: String, required: true },
  logo: { type: String }, // base64 or image URL
  description: { type: String, required: true },
  confirm: { type: Boolean, required: true },
  status: { type: String, default: 'pending' }, // can be "pending", "approved", "rejected"
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RequestExtension', RequestExtensionSchema);
