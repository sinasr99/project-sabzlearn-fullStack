import mongoose from "mongoose";

const connectToMongo = async () => {
    if (mongoose.connection.readyState >= 1) {
        // اتصال فعال است، نیازی به اتصال مجدد نیست
        return;
    }

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/sabzlearn-db", {
            dbName: "sabzlearn-db",
        });
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
};

export default connectToMongo;
