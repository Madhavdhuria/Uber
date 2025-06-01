const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("Connected to DB!");
  } catch (error) {
    console.error("Failed to connect to DB:", error);
  }
}

module.exports = connectToDb;
