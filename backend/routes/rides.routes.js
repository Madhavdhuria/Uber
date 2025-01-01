const express = require("express");
const app = express.Router();
const AuthMiddleware = require("../middlerwares/auth.middleware");
const RideController = require("../controllers/ride.controller");

app.post("/create", AuthMiddleware.authUser, RideController.CreateRide);
app.get("/get-fares", AuthMiddleware.authUser, RideController.GetFare);

module.exports = app;
