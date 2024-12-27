const express = require("express");
const port = 3000;
const app = express();
const cors=require("cors");
const connectToDb = require("./db/db");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/user.routes");
const CaptainRoutes = require("./routes/captain.routes");
require('dotenv').config();

connectToDb();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,                 
}));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", UserRoutes);
app.use("/captains", CaptainRoutes);

app.listen(port, () => {
  console.log("server is running at port", port);
});