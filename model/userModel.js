const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator'); // For email validation

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // Ensure unique email
        validate: [validator.isEmail, "Please provide a valid email address"], // Validate email format
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true, // Ensure unique username
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"], // Password length validation
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "You must be at least 18 years old"], // Ensure user is at least 18
    },
    resetPasswordToken: String, // Password reset token field
    resetPasswordExpires: Date, // Password reset expiration time
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare input password with stored hashed password
userSchema.methods.isPasswordValid = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
