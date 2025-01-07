const express = require("express");
const port = 3000;
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/user.routes");
const CaptainRoutes = require("./routes/captain.routes");
const Maproutes = require("./routes/map.routes");
const RideRoutes = require("./routes/rides.routes");

require("dotenv").config();

connectToDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["https://88bg6ghv-5173.inc1.devtunnels.ms","http://localhost:5173"], credentials: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", UserRoutes);
app.use("/captains", CaptainRoutes);
app.use("/maps", Maproutes);
app.use("/rides", RideRoutes);

app.listen(port, () => {
  console.log("Server is running at port", port);
});

module.exports = app;


// <img
// className="h-full w-full object-cover"
// src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
// alt=""
// />