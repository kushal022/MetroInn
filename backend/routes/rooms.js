// const express = require('express');

// const router = express.Router();


// router.get('/',(req,res)=>{
//     res.send('Hello, World! from rooms routes');
// })
// module.exports = router;




//----------------------------------------------------------------------------------------------
const express = require('express');
const router = express.Router();

//TODO: Import Controllers for Room:
const {createRoom,updateRoom,deleteRoom,getRoom,getAllRooms,updateRoomAvailability} = require('../controllers/rooms.js');

//TODO: Import Middleware for verify:
const {verifyAdmin} = require('../utils/verifyToken.js');

//*------------------------------------- CREATE ROOM Router --------------------------------------
router.post('/:hotelId',verifyAdmin, createRoom);
//*------------------------------------- UPDATE ROOM Router ------------------------------------------
router.put('/:id',verifyAdmin, updateRoom);
//*------------------------------------- UPDATE ROOM Number Availability Dates Router ------------------------------------------
router.put('/availability/:id', updateRoomAvailability); // id => roomNumber
//*------------------------------------- DELETE ROOM Router -----------------------------------------------
router.delete('/:id/:hotelId',verifyAdmin,deleteRoom);
//*------------------------------------- GET ONE ROOM Router -------------------------------------------------
router.get('/:id',getRoom);
//*------------------------------------- GET ALL ROOMS Router ---------------------------------------------------
router.get('/',getAllRooms);

//TODO: Export Room router:
module.exports = router;