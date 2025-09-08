const mongoose = require('mongoose');
const url = process.env.DB_URL || 'mongodb://localhost:27017/extendease';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit(0);
});

module.exports = mongoose;