//Todo: Import Room and Hotel Collections:
const RoomCollection = require('../models/roomModel.js');
const HotelCollection = require('../models/hotelModel.js');

//TODO: Import Error Handling Functionality:
const {createError} = require('../utils/error.js');

//Todo: ---------------------------------------- CREATE ROOM Controller --------------------------------------

const createRoom = async(req,res,next)=>{

    //Get hotel id:
    const hotelId = req.params.hotelId;
    //Get data from request body:
    const roomData = req.body;
    //create room
    const newRoom = new RoomCollection(roomData);
    try{
        //Save Room:
        const saveRoom = await newRoom.save()
        try{
            //!If room is successfully saved, add room id to hotel's rooms array:
            await HotelCollection.findByIdAndUpdate(hotelId,{
                $push:{rooms:saveRoom._id}
            })
        }
        catch(err){
            // next(createError(500, 'Failed to save room', err));
            next(err);
        }
        //send back the saved room:
        res.status(200).json(saveRoom);
    }
    catch(err){
        next(err)
    }

    //find hotel by id and save room to it:
    // const hotel = await HotelCollection.findByIdAndUpdate(hotelId,{$push:{rooms:newRoom}},{new:true});
};

//TODO:---------------------------------------- UPDATE ROOM Controller --------------------------------------
const updateRoom = async (req,res,next)=>{
    try{
        // get id of that room:
        const  {id} = req.params;
        // get updated data:
        const updatedData = req.body;
        // console.log(updatedData)
        // console.log(id)
        //! Update Room and save data:
        // const updatedRoom = await RoomCollection.findOneAndUpdate({_id:id},{$set:updatedData});
        const updatedRoom = await RoomCollection.findOneAndUpdate({_id:id},updatedData,{new:true});
        if(!updatedRoom){
            return res.status(404).json({message:'Room not found'});
        };
        // return the updated Room:
        return res.status(200).json({message: 'Room updated successfully'})
    }
    catch(err){
        next(err)
    }
}
//TODO:---------------------------------------- UPDATE Availability ROOM Controller --------------------------------------
const updateRoomAvailability = async (req,res,next)=>{
    try{
        await RoomCollection.updateOne(
            {'roomNumbers._id': req.params.id}, // id=> roomNumbers (nested collection of rooms)
            {$push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        )
        // return the updated Room:
        return res.status(200).json({message: 'Room Availability updated successfully'})
    }
    catch(err){
        next(err)
    }
}

//TODO:---------------------------------------- DELETE ROOM Controller --------------------------------------
const deleteRoom = async(req,res,next)=>{
    //Get hotel id:
    const hotelId = req.params.hotelId;
    try{
        // get id of that room:
        const {id} = req.params;
        //! Find room and delete:
        const deletedRoom = await RoomCollection.findByIdAndDelete(id);
        if(!deletedRoom){
            return res.status(404).json({message: 'Room not found!!'})
        }
        // remove room id from hotel's rooms array:
        try{
            await HotelCollection.findByIdAndUpdate(hotelId,{
                $pull:{rooms: req.params.id}
            })
        }
        catch(err){
            // next(createError(500, 'Failed to save room', err));
            next(err);
        }
        // return the deleted hotel:
        return res.status(200).json({message: 'Room has been deleted successfully'})
    }
    catch(err){
        next(err);
    }
}

//TODO:---------------------------------------- GET ONE ROOM Controller --------------------------------------
const getRoom = async (req,res,next)=>{
    try{
        // get id of that Room:
        const {id} = req.params;
        // console.log(id)
        //! Find Room by id and return it:
        const room = await RoomCollection.findById(id)
        // console.log(room)
        // if there is no Room:
        if(!room){
            return res.status(404).json({message: 'Room not found'});
        };
        // return the founded Room:
        return res.status(200).json(room);
    }
    catch(err){
        next(err)
    }
}

//TODO:---------------------------------------- GET ALL ROOM Controller --------------------------------------
const getAllRooms = async(req,res,next)=>{
    try{
        // Find/Get all Rooms:
        const rooms = await RoomCollection.find();
        // Return the founded Rooms:
        res.json(rooms);
    }
    catch(err){
        next(err);
    }
}

//TODO: Export the function:
module.exports = {createRoom,updateRoom,deleteRoom,getRoom,getAllRooms,updateRoomAvailability};