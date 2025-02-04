//routes->authRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { protect,admin} = require('../middlewares/auth');

// Public Routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

// Protected Routes
router.use(protect); // Protect all following routes

router.get('/user', userController.getUser);
router.put('/user', userController.updateUserProfile);
router.delete('/logout', userController.logout); // Use DELETE for logout
router.put('/change-password', userController.changePassword);


// Admin Routes
router.use(admin); // Admin protection for following routes

router.get('/admin/users', userController.getAllUsers);
router.get('/admin/users/:userId', userController.getSpecificUserByAdmin);
router.put('/admin/users/:userId', userController.updateUserProfileByAdmin);

module.exports = router;

