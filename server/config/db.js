const mongoose = require("mongoose");

//connect to MongoDb using mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected sucessfully");
    } catch (error) {
        console.error("MongoDB connection failed: ", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;