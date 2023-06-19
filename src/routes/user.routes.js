const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { register, login } = require("../services/UserService");

router.use(
  "/signup",
  [
    check("names", "names are required").exists(),
    check("username", "username must be a valid email").exists().isEmail(),
    check("password", "password is required").exists(),
    check("passwordConfirm", "password confirmation is required").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    register(req, res);
  }
);

router.use(
  "/login",
  [
    check("username", "username is required (must be email)")
      .exists()
      .isEmail(),
    check("password", "password is required").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    login(req, res);
  }
);

module.exports = router;
