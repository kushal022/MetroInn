const mongoose = require('mongoose');

// Connect to Mongodb:
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...😎');
    }
    catch(err){
        console.log('MongoDB not connected !!!! 😢',err)
    }
}

connectDb();