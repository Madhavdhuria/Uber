const UserModel = require("../models/user.model");
const userValidationSchema = require("../ZodSchema/ZodUserSchema");
const UserService = require("../services/user.service");
const BlackListTokenModel = require("../models/blacklistToken.model");

module.exports.RegisterUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const validationResult = userValidationSchema.safeParse({
      fullName,
      email,
      password,
    });
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResult.error.errors.map((e) => e.message),
      });
    }

    const { firstName, lastName } = fullName;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await UserModel.hashPassword(password);
    const user = await UserService.CreateUser(
      firstName,
      lastName,
      email,
      hashedPassword
    );

    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: "/",
      maxAge: 24 * 60 * 60 * 1000 
  });
  
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullName: {
          firstName: user.fullName.firstName,
          lastName: user.fullName.lastName,
        },
        email: user.email,
      },
    });
    
  } catch (error) {
    console.error("Registration failed:", error.message);
    return res.status(500).json({
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};

module.exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: "/",
      maxAge: 24 * 60 * 60 * 1000 
  });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: {
          firstName: user.fullName.firstName,
          lastName: user.fullName.lastName,
        },
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    return res.status(201).json({
      message: "User profile retrieved successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching user profile",
      error: error.message,
    });
  }
};

module.exports.LogoutUser = async (req, res) => {
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
