const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error('User not found');
        }

        // Add user info to request
        req.user = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            user_type: user.user_type
        };
        req.token = token;
        
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: 'Please authenticate.' });
    }
};

module.exports = auth;
