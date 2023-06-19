const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const {
  createNewRecord,
  getRecords,
} = require("../services/EmployeeLaptopService");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/",
  [
    check("firstname", "Firstname is required").notEmpty(),
    check("lastname", "Lastname is required").notEmpty(),
    check(
      "nationalIdentity",
      "National Identity is required and must be 16 characters long"
    ).isNumeric(),
    check(
      "telephone",
      "Telephone is require and must be at least 10 or 12 characters long"
    )
      .notEmpty()
      .isLength({ min: 10, max: 12 }),
    check("email", "Email is required").notEmpty().isEmail(),
    check("department", "Department is required").notEmpty(),
    check("position", "Position is required").notEmpty(),
    check("laptopManufacturer", "Laptop Manufacturer is required").notEmpty(),
    check("model", "Model is required").notEmpty(),
    check("serialNumber", "Serial Number is required").notEmpty(),
    authMiddleware,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createNewRecord(req, res);
  }
);

router.get("/", authMiddleware, getRecords);

module.exports = router;
