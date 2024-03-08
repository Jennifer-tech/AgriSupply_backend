const { encode_jwt } = require('../utils/jwtUtil');
const userService = require("../services/authService")

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await userService.findOne({
        email: email,
        deleted: false,
      });
      if (!existingUser)
        return res.status(404).json({ message: "User does not exist" });
  
      const checkPassword = await existingUser.matchPassword(password);
      if (!checkPassword)
        return res.status(400).json({ message: "Incorrect Password" });
  
      const token = encode_jwt({ _id: existingUser._id });
  
      res.status(200).json({
        token: token,
        Token_Type: "Bearer",
        USER_ID: existingUser._id,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.register = async (req, res) => {
    const userInfo = req.body;
  
    try {
      // CrossCheck if the email or phone number is existing in the database
      const existingEmail = await userService.findOne({
        email: userInfo.email,
      });
      console.log("existingEmail", existingEmail)
      const existingNumber = await userService.findOne({
        phoneNumber: userInfo.phoneNumber,
      });
      console.log("existingNumber", existingNumber)
  
      // Throw error if email or phone number is already existing
      if (existingEmail || existingNumber) {
        return res.status(400).json({ message: "User data already exists" });
      }
      
      // Create Patient
      const userData = await userService.createUser(userInfo);
  
      // Response
      res.status(200).json({ Success: true, message: userData });
  
    } catch (error) {
      res.status(500).json({ Success: false, message: error.message }) 
    }
  };