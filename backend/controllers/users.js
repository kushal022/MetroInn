//TODO: Import User Collection:
const UserCollection = require('../models/userModel.js');

// Import Error Handling Functionality:
const createError = require('../utils/error.js')

//TODO:---------------------------------------- CREATE Controller --------------------------------------
// const createUser = async(req,res,next)=>{
//     try{
//         const newHotel = req.body;
//         await HotelCollection.create(newHotel);
//         res.status(200).json({message:'Hotel saved successfully'})
//     }
//     catch(err){
//         // console.log('Error in saving Hotel..',err);
//         // res.status(500).send('Server Error: Save Hotel',err);
//         next(err)

//     }
// };

//TODO:---------------------------------------- UPDATE USER Controller --------------------------------------
const updateUser = async (req,res,next)=>{
    try{
        const  {id} = req.params;
        const updatedData = req.body;
        const updatedUser = await UserCollection.findOneAndUpdate({_id:id},updatedData,{new:true});

        if(!updatedUser){
            return res.status(404).json({message:'User not found'});
        }
        return res.status(200).json({message: 'User updated successfully'});
    }
    catch(err){
        next(err)
    }
}

//TODO:---------------------------------------- DELETE USER Controller --------------------------------------
const deleteUser = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const deletedUser = await UserCollection.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({message: 'User not found!!'})
        }
        return res.status(200).json({message: 'User has been deleted successfully'})
    }
    catch(err){
        next(err);
    }
}

//TODO:---------------------------------------- GET ONE USER Controller --------------------------------------
const getUser = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const user = await UserCollection.findById(id)
        if(!user){
            return res.status(404).json({message: 'User not found'});
        };
        return res.status(200).json(user);
    }
    catch(err){
        next(err)
    }
}

//TODO:---------------------------------------- GET ALL USER Controller --------------------------------------
const getAllUsers = async(req,res,next)=>{
    try{
        const users = await UserCollection.find();
        res.json(users);
    }
    catch(err){
        next(err);
    }
}

//TODO: Export the function:
module.exports = {updateUser,deleteUser,getUser,getAllUsers};