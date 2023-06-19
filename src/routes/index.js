const router = require("express").Router();

router.use("/auth", require("./user.routes"));
router.use("/employee-laptop", require("./employee-laptop.routes"));

module.exports = router;
