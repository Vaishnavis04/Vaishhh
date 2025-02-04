//controllers->userController.js
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
// const TokenBlacklist = require('../models/TokenBlacklist');
// Signup
exports.signup = async (req, res) => {
  const { firstName, lastName, email, username, password, age, gender } = req.body;

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if the username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
      age,
      gender,
    });

    // Log the user creation for debugging
    console.log('User created:', user);

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Send success response with token
    return res.status(201).json({
      message: 'User created successfully',
      token: token,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
// Change Password
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  try {
    // Find the user from the database using the user ID from the token
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the old password matches the password stored in the database
    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash the new password before saving it
    user.password = await bcrypt.hash(newPassword, 10);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `You have requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`;
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get User Information
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update User Profile by User
exports.updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, username, age, gender } = req.body;
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: 'Username already in use' });
      }
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.age = age || user.age;
    user.gender = gender || user.gender;

    await user.save();

    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update User Profile by Admin
exports.updateUserProfileByAdmin = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, username, age, gender } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.age = age || user.age;
    user.gender = gender || user.gender;

    await user.save();

    res.status(200).json({ message: 'User profile updated by admin successfully', user });
  } catch (error) {
    console.error('Error updating user profile by admin:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Users by Admin
exports.getAllUsers = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const users = await User.find().select('-password');

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Specific User by Admin
exports.getSpecificUserByAdmin = async (req, res) => {
  const { userId } = req.params;

  try {
    const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching specific user by admin:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Logout (Mark as Inactive)
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user); // Get the logged-in user from the token

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Mark the user as inactive (this can help indicate that the user is logged out)
    user.isActive = false;
    await user.save();

    res.status(200).json({ message: 'Logout successful. User marked as inactive' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
