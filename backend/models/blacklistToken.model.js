const mongoose = require("mongoose");

const BlackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const BlackListTokenModel = mongoose.model("BlackListToken", BlackListTokenSchema);

module.exports = BlackListTokenModel;
