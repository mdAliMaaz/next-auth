import mongoose from "mongoose";

export const connect = async()=>{
try {
    mongoose.connect(process.env.MONGODB_URL!)
    const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log('DATABASE CONNECTED 🚀');
})

connection.on('error',(error)=>{
    console.log('MongoDB connection error'+ error);
    process.exit();
});

} catch (error) {
    console.log("Somthing went wrong!")
    console.log(error)
}
}