const express = require("express");
const authMiddleware = require("../middleware");
const authController = require("../controllers/authController");

// This creates an instance of the express router which is used to define routes
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.put("/update", authMiddleware, authController.update);


router.get("/bulk", authController.bulk);
router.get("/profile", authMiddleware, authController.profile);

module.exports = router;