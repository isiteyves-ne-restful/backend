const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const User = require("../models/User");

exports.register = async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to register a user'
  try {
    const { names, username, password, passwordConfirm } = req.body;
    // Check if the passwords match
    if (password !== passwordConfirm) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await User.create({
      names,
      username,
      password: hashedPassword,
    });

    res.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to login a user'
  try {
    const { username, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password using the custom method
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token using the custom method
    const token = user.createToken();

    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
