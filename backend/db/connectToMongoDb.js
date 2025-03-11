import mongoose from "mongoose";

const connectToMongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDb");
        
    } catch (error) {
        console.error('Error connection to MongoDb',error.mongoose)
    }
} 

export default connectToMongoDb