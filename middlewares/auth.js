const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

// Protect route middleware
const protect = async (req, res, next) => {
  let token;

  // Check if there's a token in the header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token to get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user ID to request object
      req.user = decoded.userId;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin check middleware
const admin = async (req, res, next) => {
  try {
    // Find the user based on the ID in the token
    const user = await User.findById(req.user);

    // If the user doesn't exist or isn't an admin
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized as an admin' });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { protect, admin };

