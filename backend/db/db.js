const mongoose = require("mongoose");

 async function connectToDb() {
    try {
        await mongoose.connect("mongodb+srv://madhav:2003%40Mongo2024@cluster0.xaijqpg.mongodb.net/uber");
        console.log("Connected to DB!");
    } catch (error) {
        console.error("Failed to connect to DB:", error);
    }
}

module.exports=connectToDb;
