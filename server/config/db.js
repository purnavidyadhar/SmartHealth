const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.log('No MONGODB_URI found. Vercel/Local environment detected.');
            console.log('⚠️ ACTIVATING HYBRID MODE: Using local/in-memory file database.');
            isConnected = false;
            return;
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        console.log('⚠️ FALLBACK: Activating Hybrid Mode (Local JSON Database).');
        isConnected = false;
    }
};

const isMongoConnected = () => isConnected;

module.exports = { connectDB, isMongoConnected };
