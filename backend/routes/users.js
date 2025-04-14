// const express = require('express');

// const router = express.Router();


// router.get('/',(req,res)=>{
//     res.send('Hello, World! from users routes');
// })


// module.exports = router;
//--------------------------------------------------------------------------
const express = require('express');
const router = express.Router();

//TODO:!Import Controllers for Hotel:
const {updateUser,deleteUser,getUser,getAllUsers} = require('../controllers/users.js');

//TODO:!Import Verify middleware:
const {verifyToken,verifyUser,verifyAdmin} = require('../utils/verifyToken.js');
//! endpoint is /users/.....
// router.get('/checkauth', verifyToken, (req,res,next)=>{
//     res.send("hello user, you are logged in!")
// })
// router.get('/checkuser/:id', verifyUser, (req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account!")
// })
// router.get('/checkadmin/:id', verifyAdmin, (req,res,next)=>{
//     res.send("hello Admin, you are logged in and you can delete all account!")
// })

//TODO:------------------------------------- UPDATE USER ------------------------------------------
router.put('/:id',verifyUser, updateUser)
//TODO:------------------------------------- DELETE USER -----------------------------------------------
router.delete('/:id',verifyUser,deleteUser)
//TODO:------------------------------------- GET ONE USER -------------------------------------------------
router.get('/:id',verifyUser,getUser)
//TODO:------------------------------------- GET ALL USERS ---------------------------------------------------
router.get('/',verifyToken,verifyAdmin,getAllUsers)
// router.get('/',verifyToken,getAllUsers)
// router.get('/',getAllUsers)


//TODO: Export user router:
module.exports = router;