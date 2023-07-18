import mongoose from "mongoose";
import dotenv from 'dotenv'

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL! || 'mongodb+srv://maaz:28582858@cluster0.6c5n5cq.mongodb.net/next-auth?retryWrites=true&w=majority')
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('DATABASE CONNECTED 🚀');
        })

        connection.on('error', (error) => {
            console.log('MongoDB connection error' + error);
            process.exit();
        });

    } catch (error) {
        console.log("Somthing went wrong!")
        console.log(error)
    }
}