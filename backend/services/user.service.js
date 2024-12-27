const userModel = require("../models/user.model");

module.exports.CreateUser = async (firstName, lastName, email, password) => {

  const newUserData = {
    fullName: {
      firstName,
      lastName: lastName || undefined,
    },
    email,
    password,
  };

  
  const newUser = await userModel.create(newUserData);
  return newUser;
};
