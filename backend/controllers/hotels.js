//TODO: Import Hotel Collection:
const HotelCollection = require('../models/hotelModel.js');
const RoomCollection = require('../models/roomModel.js');

//TODO: Import Error Handling Functionality:
const createError = require('../utils/error.js')

//TODO:---------------------------------------- CREATE HOTEL [Controller] --------------------------------------
const createHotel = async(req,res,next)=>{
    try{
        // get hotel data:
        const newHotel = req.body;
        // save hotel data:
        await HotelCollection.create(newHotel);
        // return the saved hotel:
        res.status(200).json({message:'Hotel saved successfully'})
    }
    catch(err){
        // console.log('Error in saving Hotel..',err);
        // res.status(500).send('Server Error: Save Hotel',err);
        next(err)
    }
};

//TODO:---------------------------------------- UPDATE HOTEL [Controller] --------------------------------------
const updateHotel = async (req,res,next)=>{
    try{
        // get id of that hotel:
        const  {id} = req.params;
        // get updated data:
        const updatedData = req.body;
        // console.log(updatedData)
        // console.log(id)
        //! Update hotel and save data:
        // const updatedHotel = await HotelCollection.findOneAndUpdate({_id:id},{$set:updatedData});
        const updatedHotel = await HotelCollection.findOneAndUpdate({_id:id},updatedData,{new:true});
        if(!updatedHotel){
            return res.status(404).json({message:'Hotel not found'});
        };
        // return the updated hotel:
        return res.status(200).json({message: 'Hotel updated successfully'})
    }
    catch(err){
        // console.log('Error in updating Hotel..',err);
        // res.status(500).send('Error in updating Hotel..',err);
        next(err)
    }
}

//TODO:---------------------------------------- DELETE HOTEL [Controller] --------------------------------------
const deleteHotel = async(req,res,next)=>{
    try{
        // get id of that hotel:
        const {id} = req.params;
        //! Find hotel and delete:
        const deletedHotel = await HotelCollection.findByIdAndDelete(id);
        if(!deletedHotel){
            return res.status(404).json({message: 'Hotel not found!!'})
        }
        // return the deleted hotel:
        return res.status(200).json({message: 'Hotel has been deleted successfully'})
    }
    catch(err){
        // console.log('Error in deleting Hotel..',err);
        // res.status(500).send('Error in deleting Hotel..',err);
        next(err);
    }
}

//TODO:---------------------------------------- GET ONE HOTEL [Controller] --------------------------------------
const getHotel = async (req,res,next)=>{
    try{
        // get id of that hotel:
        const {id} = req.params;
        // console.log(id)
        //! Find hotel by id and return it:
        const hotel = await HotelCollection.findById(id)
        // console.log(hotel)
        // if there is no hotel:
        if(!hotel){
            return res.status(404).json({message: 'Hotel not found'});
        };
        // return the founded hotel:
        return res.status(200).json(hotel);
    }
    catch(err){
        // console.log('Error in fetching Hotel..',err);
        // res.status(500).send('Server Error: Fetch Hotel',err);
        next(err)
    }
}

//TODO:---------------------------------------- GET ALL HOTEL [Controller] --------------------------------------
const getAllHotels = async(req,res,next)=>{
    // res.send('Hello, World! from hotels routes');
    // HotelCollection.find()
    //    .then(hotels=>res.json(hotels))
    //    .catch(err=>res.status(400).json({error:err}));

    try{
      //! Find/Get all hotels:
      // const hotels = await HotelCollection.find()

      // const hotels = await HotelCollection.find(req.query)
      // const hotels = await HotelCollection.find(req.query).limit(req.query.limit);

      // const { limit, ...filters } = req.query; // Extract limit separately
      // const hotels = await HotelCollection.find(filters).limit(parseInt(limit) || 2);

      const { min, max, limit, ...others } = req.query;
      const hotels = await HotelCollection.find({
        ...others,
        cheapestPrice: { $gt: min || 1, $lt: max || 1000000 },
      }).limit(parseInt(limit));
      // console.log(hotels)

      //! Return the founded hotels:
      res.json(hotels);
    }
    catch(err){
        // console.log('Error in fetching hotels..',err);
        // res.status(500).send('Server Error: Fetch Hotels',err);
        next(err);
    }
}


//TODO:---------------------------------------- GET ALL HOTEL Count by City [Controller] --------------------------------------

const countByCity = async(req,res,next)=>{
    //get city query:
    const cities = req.query.cities.split(",") //!endPoint: /countByCity?cities=Alwar,Jaipur,Delhi
    // console.log(cities);
    try{
        const list = await Promise.all(cities.map(city=>{
            // count by city:
            // return HotelCollection.find({city:city}).length;
            return HotelCollection.countDocuments({city:city});
        }));
        // Return the founded hotels count:
        // console.log(list)
        res.json(list);
    }
    catch(err){
        next(err);
    }
}
//TODO:---------------------------------------- GET ALL HOTEL Count by Type [Controller] --------------------------------------

const countByType = async(req,res,next)=>{
    try{
        const hotelCount = await HotelCollection.countDocuments({type:"hotel"});
        const apartmentCount = await HotelCollection.countDocuments({type:"apartment"});
        const resortCount = await HotelCollection.countDocuments({type:"resort"});
        const villaCount = await HotelCollection.countDocuments({type:"villa"});
        const cabinCount = await HotelCollection.countDocuments({type:"cabin"});

        res.status(200).json([
            {type:"hotels",count:hotelCount},
            {type:"apartments",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villaCount},
            {type:"cabins",count:cabinCount}
        ]);
    }
    catch(err){
        next(err);
    }
}

//TODO:---------------------------------------- GET HOTEL's all Rooms by Id [Controller] --------------------------------------

const getHotelRooms = async (req,res,next)=>{
    try{
        const hotel = await HotelCollection.findById(req.params.id);
        if(!hotel){
            return res.status(404).json({message: 'Hotel not found'});
        }
        const roomsList = await Promise.all(
            hotel.rooms.map((room)=>{
                return RoomCollection.findById(room);
            })
        );
        res.status(200).json(roomsList);
    }
    catch(err){
        next(err);
    }
}

//TODO: Export the function:
module.exports = {createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getAllHotels,
    countByCity,
    countByType,
    getHotelRooms,
};