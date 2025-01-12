const validator = require('validator');  // This is the module that was missing

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,  // Ensure unique email
        validate: [validator.isEmail, "Please provide a valid email address"],  // Email validation
    },
    // Other fields
});

