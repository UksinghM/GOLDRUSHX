const express = require('express');
const UserRouter = require('./routers/userRouter'); //importing user router
const adminRouter = require('./routers/admin'); // or './routes/admin' if that's your folder name
const cors = require('cors');
const extensionRouter = require('./routers/extensionRouter');
const ratingRouter = require('./routers/ratingRouter');
const adminHandleRequestRouter = require('./routers/adminHandleRequest');
const publisherRouter = require('./routers/publisher');
require('./connection'); // Import database connection

//creating new express app

const app = express();

const port = process.env.PORT || 5000;

//middleware

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://yourdomain.com'] 
      : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

app.use(express.json({ limit: '10mb' })); //to parse json data from request body with increased limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // to parse urlencoded data with increased limit

app.use('/user', UserRouter);
app.use('/admin', adminRouter);
app.use('/admin', adminHandleRequestRouter);
app.use('/extensions', extensionRouter);
app.use('/rating', ratingRouter);
app.use('/publisher', publisherRouter);

//routes or endpoints
app.get('/', (req, res) => {
    res.send('Response From Express')
})

app.get('/add', (req, res) => {
    res.send('Response From Add All Route')
})

app.get('/getall', (req, res) => {
    res.send('Response From Get All Route')
})

app.listen(port, () => {
    console.log(`Server is running on Port - ${port}`);
})