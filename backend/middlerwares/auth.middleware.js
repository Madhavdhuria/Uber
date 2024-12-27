const UserModel = require("../models/user.model");
const CaptainModel = require("../models/captain.model");
const BlackListTokenModel = require("../models/blacklistToken.model");

const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || (req.headers.authorization?.split(" ")[1] ?? null);

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is required",
      });
    }

    const isBlackListed = await BlackListTokenModel.findOne({ token });

    if (isBlackListed) {
      return res.status(401).json({
        message: "UnAuthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found or token invalid",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    console.error("Authentication failed:", error);
    return res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || (req.headers.authorization?.split(" ")[1] ?? null);

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is required",
      });
    }

    const isBlackListed = await BlackListTokenModel.findOne({ token });

    if (isBlackListed) {
      return res.status(401).json({
        message: "UnAuthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await CaptainModel.findById(decoded.id);

    if (!captain) {
      return res.status(401).json({
        message: "captain not found or token invalid",
      });
    }

    req.captain = captain;

    return next();
  } catch (error) {
    console.error("Authentication failed:", error);
    return res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};
