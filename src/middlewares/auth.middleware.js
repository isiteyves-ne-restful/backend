const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token
    const { user } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the user exists and attach it to the request object
    User.findByPk(user.id)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = user;
        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
