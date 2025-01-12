const UserController = require('../controllers/userControllers');  // Ensure correct import
const express = require('express');
const router = express.Router();

// Existing routes
router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.get("/profile", UserController.getProfile); // Profile retrieval
router.put("/profile", UserController.updateProfile); // Profile update

// Forgot password route
router.post("/forgot-password", UserController.forgotPassword); // Add this route for forgot password

// Reset password route
router.post("/reset-password", UserController.resetPassword); // Add this route for resetting password

module.exports = router;
