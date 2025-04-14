const express = require('express');


//TODO: use Router
const router = express.Router();

//TODO: Import "Controllers" for Authentication: register and login
const {register,login} = require('../controllers/auth.js')

//! Base route is'api/auth' for example 'api/auth/register' and 'api/auth/login'

//TODO: Create Router for Register a new user:
router.post('/register', register);

//TODO: Create Router for Login a user:
router.post('/login', login);

//TODO: Export the router:
module.exports = router;