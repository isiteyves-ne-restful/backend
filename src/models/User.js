// models/User.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const User = sequelize.define("User", {
  names: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Method to create a JWT token for the user
User.prototype.createToken = function () {
  const token = jwt.sign({ user: this }, process.env.JWT_SECRET_KEY);
  return token;
};

// Method to compare provided password with the stored hashed password
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
