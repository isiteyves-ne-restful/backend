const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const EmployeeLaptop = require("../models/EmployeeLaptop");

exports.createNewRecord = async (req, res) => {
  // #swagger.tags = ['EmployeeLaptop']
  // #swagger.description = 'Endpoint to register an employee to an equipment'
  try {
    const {
      firstname,
      lastname,
      nationalIdentity,
      telephone,
      email,
      department,
      position,
      laptopManufacturer,
      model,
      serialNumber,
    } = req.body;

    const employeeLaptop = await EmployeeLaptop.create({
      firstname,
      lastname,
      nationalIdentity,
      telephone,
      email,
      department,
      position,
      laptopManufacturer,
      model,
      serialNumber,
    });
    res.json({
      message: "Employee laptop created successfully",
      employeeLaptop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRecords = async (req, res) => {
  // #swagger.tags = ['EmployeeLaptop']
  // #swagger.description = 'Endpoint to get all employee laptop records'
  try {
    const employeeLaptops = await EmployeeLaptop.findAll();
    res.json({ employeeLaptops });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
