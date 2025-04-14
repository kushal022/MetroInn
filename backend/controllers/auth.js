//TODO: Import User Collection:
const UserCollection = require('../models/userModel.js');

//TODO: Import bcrypt for password hashing:
const bcrypt = require('bcrypt');

//TODO: Import JWT for token generation:
const jwt = require('jsonwebtoken');

//TODO: Import dotenv for environment variables:
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

//TODO: Import Error Handling Functionality:
const createError = require('../utils/error.js')

//TODO:1. Create Controller for user registration or sign-in:
const register = async(req,res,next)=>{
    // res.send('Hello, User! from auth register router!!!!')
    try{
        const {username,email,password, isAdmin,
            country,
            phone,
            city,
        img} = req.body;
        // Validate input: check if username and email are provided:
        if(!username || !email || !password){
            return next(createError(400, 'Please provide username, email, and password'));
        }
        // Check if Username should be > than 3;
        if(username.length < 3){
            return next(createError(400, 'Username should be at least 3 characters long'));
        }
        // check if email is in correct format:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return next(createError(400, 'Invalid email format'));
        }
        // Check if username or email already exists:
        const existingUser = await UserCollection.findOne({email});
        if(existingUser){
            return next(createError(400, 'Email already exists'));
        }
        
        // Validate password: check if password meets the criteria (e.g., length, complexity, etc.)
        if(password.length < 4){
            return next(createError(400, 'Password should be at least 4 characters long'));
        }
        //! Hash Password: convert normal password to hash password 
        const hashedPassword = await bcrypt.hash(password,10);
        // Resister new User:
        const newUser = new UserCollection({...req.body,password:hashedPassword});
        //or
        // const newUser = new UserCollection({
        //     username,
        //     email,
        //     password: hashedPassword,
        //     isAdmin,
        //     country,
        //     phone,
        //     city,
        //     img,
            
        // });
        // Save new User to the database:
        await newUser.save();
        res.status(201).json({message:'User registered successfully'});
    }
    catch(err){
        // console.error(err);
        // res.status(500).send('Server Error');
        next(err)
    }
};

//TODO:2. Create Controller for User Login:
const login = async(req,res,next)=>{
    try{
        const {email} = req.body;
        console.log(req.body)
        // console.log(email,(req.body.password))
        // Check if email and password are provided:

        // if(!req.body.email || !req.body.password[0]){
        if(req.body.email == '' || req.body.password == null){
            return next(createError(400, 'Please provide both email and password'));
        };

        // Check if user exists:
        const existingUser = await UserCollection.findOne({email: req.body.email});
        // console.log(existingUser)
        if(!existingUser){
            return next(createError(401, 'User not found!'));
        };
        
        // Check if password is correct:
        const isPasswordCorrect = await bcrypt.compare(req.body.password[0], existingUser.password);
        // console.log(isPasswordCorrect, " ispwd?")
        if(!isPasswordCorrect){
            return next(createError(401, 'Invalid Password'));
        };

        //! Generate JWT Token:
        const token = jwt.sign({id: existingUser._id,isAdmin: existingUser.isAdmin}, SECRET_KEY, {expiresIn: '10h'});

        // Remove sensitive data:
        const { password, isAdmin, ...otherDetails} = existingUser._doc;
        //! Send res to user: 
        // res.status(200).json({...otherDetails ,message:"User Logged in successfully"})
        //! res send with cookie and jwt token:
        console.log('user login successfully: ',token)
        res.cookie('access_token', token, 
            {httpOnly: true,secure:false,sameSite:"None",expires:new Date(Date.now()+10000000)}).status(200)
        // res.cookie('access_token', token, {httpOnly: true}).status(200)
        .json({details:{...otherDetails},isAdmin,token,message:"User Logged in successfully"});
        // .json(existingUser._doc);
    }
    catch(err){
       next(err)
    }
}

//TODO:3. Create Controller for User Logout:
module.exports = {register,login};