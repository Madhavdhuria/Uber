const express = require("express");
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

app.use(
  cors({
    origin: "https://uber-frontend-wheat.vercel.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", UserRoutes);
app.use("/captains", CaptainRoutes);
app.use("/maps", Maproutes);
app.use("/rides", RideRoutes);

module.exports = app;
