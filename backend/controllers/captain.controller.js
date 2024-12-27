const CaptainModel = require("../models/captain.model");
const captainValidationSchema = require("../ZodSchema/ZodCaptainSchema");
const createCaptain = require("../services/captain.service");
const BlackListTokenModel=require("../models/blacklistToken.model");

module.exports.RegisterCaptain = async (req, res) => {
  try {
    const existingCaptain = await CaptainModel.findOne({
      email: req.body.email,
    });

    if (existingCaptain) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const validationResult = captainValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.errors.map((e) => e.message),
      });
    }

    const validatedData = validationResult.data;

    const hashedPassword = await CaptainModel.hashPassword(
      validatedData.password
    );

    validatedData.password = hashedPassword;

    const newCaptain = await createCaptain(validatedData);

    const token = await newCaptain.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax', 
      path: "/", 
      maxAge: 24 * 60 * 60 * 1000 
    });

    return res.status(201).json({
      success: true,
      message: "Captain registered successfully",
      newCaptain,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the captain",
      error: error.message,
    });
  }
};

module.exports.LoginCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({
        error: "Invalid credentials!",
      });
    }

    const isValid = await captain.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({
        error: "Invalid credentials!",
      });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax', 
      path: "/", 
      maxAge: 24 * 60 * 60 * 1000 
    });


    return res.status(201).json({
      message: "Login successful",
      captain,
      token,
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    return res.status(500).json({
      error: "An error occurred during login",
    });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  try {
    if (!req.captain) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

   return res.json({
      message: "captain profile retrieved successfully",
      captain: req.captain,
    });
  } catch (error) {
    console.error("Error fetching captain profile:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching captain profile",
      error: error.message,
    });
  }
};

module.exports.Logoutcaptain = async (req, res) => {
  try {
    res.clearCookie("token");

    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (token) {
      await BlackListTokenModel.create({ token });
    }

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout failed:", error.message);
    res.status(500).json({
      message: "An error occurred during logout",
      error: error.message,
    });
  }
};
