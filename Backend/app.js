const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const errMiddleware = require('./middlewares/error')
const cookieParser= require('cookie-parser')
const cors = require('cors')
const path = require('path')
const dotenv=require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// app.use(express.json())
const products= require('./routes/product')
const auth= require('./routes/auth')
const order= require('./routes/order')
const payment= require('./routes/payment')

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);


app.use(errMiddleware)

module.exports = app;