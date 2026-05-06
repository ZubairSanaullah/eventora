const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// User Authentication Middleware
const protect = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            next();
        }
        catch (err) {
            res.status(401).json({ message: 'Not authorized' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
}

// Admin Authentication Middleware
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
}

module.exports = {
    protect,
    admin
}