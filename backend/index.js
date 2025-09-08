const express = require('express');
const cors = require('cors');
const UserRouter = require('./routers/userRouter');
const adminRouter = require('./routers/admin');
const extensionRouter = require('./routers/extensionRouter');
const ratingRouter = require('./routers/ratingRouter');
const adminHandleRequestRouter = require('./routers/adminHandleRequest');
const publisherRouter = require('./routers/publisher');
require('./connection');

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/user', UserRouter);
app.use('/admin', adminRouter);
app.use('/admin', adminHandleRequestRouter);
app.use('/extensions', extensionRouter);
app.use('/rating', ratingRouter);
app.use('/publisher', publisherRouter);

app.get('/', (req, res) => {
  res.send('Response From Express');
});

app.get('/add', (req, res) => {
  res.send('Response From Add All Route');
});

app.get('/getall', (req, res) => {
  res.send('Response From Get All Route');
});

app.listen(port, () => {
  console.log(`Server is running on Port - ${port}`);
});