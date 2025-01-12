const User = require('../model/userModel');

const validatePassword = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        return { error: "Invalid email or password" };
    }

    const isValidPassword = await user.isPasswordValid(password);

    if (!isValidPassword) {
        return { error: "Invalid email or password" };
    }

    return { user };  // Return the valid user for further processing
};

module.exports = validatePassword;
