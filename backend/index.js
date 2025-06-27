//TODO: Import express:
const express = require('express');
const app = express();

//TODO: Import Middleware for cookie-parser:
const cookieParser = require('cookie-parser')
//TODO:5. Use Middleware:
app.use(cookieParser()); //! cookie parser
app.use(express.json());

//todo: import cors:
const cors = require('cors');
app.use(cors(
    {
        origin: ['*'], // specify the domain where you want to use the cookies
        methods: ['POST', 'PUT', 'GET', 'OPTIONS','DELETE', 'HEAD'],
        credentials: true, // enable setting the cookies
        secure: false, // only send cookies over http, not https
        exposedHeaders: ['set-cookie']
    }
));

//TODO:1. Import and config dotenv:
require('dotenv').config();
const PORT = process.env.PORT || 3000;


//TODO:2. Import MongoDB connection:
require('./config/db');

//TODO:3. Import Collections:
const UserCollection = require('./models/userModel'); 
const HotelCollection = require('./models/hotelModel');

//TODO:4. Import Routers:
const authRouter = require('./routes/auth.js');
const hotelsRouter = require('./routes/hotels.js');
const roomsRouter = require('./routes/rooms.js');
const usersRouter = require('./routes/users.js');



app.get('/',(req,res)=>{
    res.send('Hello, World!');
})

//TODO:6. Use Routes: Middleware
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/users', usersRouter);

//TODO:7. Error handling middleware:
app.use((err,req,res,next)=>{
    const  errorStatus = err.status || 500;
    const  errorMessage = err.message || "Something went wrong!!";
    console.log(errorStatus);
    console.log(errorMessage);
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

//TODO: Start the server:
app.listen(PORT, (err)=>{
    if(err) console.log(err);
    console.log(`Server is running on port ${PORT}`);
});
