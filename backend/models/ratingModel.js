const { model, Schema } = require('../connection');

const mySchema = new Schema({
    extension: { type: Schema.Types.ObjectId, ref: 'req-publish', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('ratings', mySchema);
