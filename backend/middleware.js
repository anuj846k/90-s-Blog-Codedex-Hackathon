const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  } 

  const token = authHeader.split(" ")[1];

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to the request object
    req.userId = decoded.id;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // Handle token verification errors
    return res.status(401).json({
      success: false,
      message: "Invalid token! Can't find user",
    });
  }
};

module.exports = authMiddleware ;