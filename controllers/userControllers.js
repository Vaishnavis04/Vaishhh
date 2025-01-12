require('dotenv').config();  // Load environment variables from .env

const User = require('../model/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // To generate a unique token
const validator = require('validator'); // For email validation

// Forgot password controller
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User with this email not found' });
        }

        // Generate a password reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Set the reset token and expiration time (1 hour from now)
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Create a nodemailer transporter using environment variables
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You have requested to reset your password. Please click the following link to reset your password: ${resetLink}`,
        };

        // Send reset email
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Password reset link sent to your email' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Reset password controller
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Find user with the reset token and check expiration
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },  // Token should not be expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Update the user's password
        user.password = newPassword;
        user.resetPasswordToken = undefined;  // Clear the reset token
        user.resetPasswordExpires = undefined;  // Clear the expiration time

        await user.save();
        return res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
