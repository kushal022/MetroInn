const express = require('express');
const router = express.Router();

//TODO: Import Controllers for Hotel:
const {createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getAllHotels,
    countByCity,
    countByType,
    getHotelRooms} = require('../controllers/hotels.js');

//TODO: Import Middleware for verify:
const {verifyAdmin} = require('../utils/verifyToken.js');

//*------------------------------------- CREATE HOTEL [Router] --------------------------------------
router.post('/',verifyAdmin, createHotel);
//*------------------------------------- UPDATE HOTEL [Router] ------------------------------------------
router.put('/find/:id',verifyAdmin, updateHotel);
//*------------------------------------- DELETE HOTEL [Router] -----------------------------------------------
router.delete('/find/:id',verifyAdmin,deleteHotel);
//*------------------------------------- GET ONE HOTEL [Router] -------------------------------------------------
router.get('/find/:id',getHotel);
//*------------------------------------- GET ALL HOTELS [Router] ---------------------------------------------------
router.get('/',getAllHotels);
//*------------------------------------- GET ALL HOTELS Count by Cities [Router] ---------------------------------------------------
router.get('/countByCity',countByCity);
//*------------------------------------- GET ALL HOTELS Count by Type [Router] ---------------------------------------------------
router.get('/countByType',countByType);
//*------------------------------------- GET HOTEL's all Rooms by id [Router] ---------------------------------------------------
router.get('/room/:id', getHotelRooms );

//TODO: Export hotel router:
module.exports = router;