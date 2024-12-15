const express = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware");

const router = express.Router();

// Public routes
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

// Protected routes
router.use(authMiddleware);
router.post("/", postController.createPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;