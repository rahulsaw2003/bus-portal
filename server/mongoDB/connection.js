import mongoose from 'mongoose';

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "bus-portal"
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Error in MongoDb Connection", error);
    }
}


export default connectDB;