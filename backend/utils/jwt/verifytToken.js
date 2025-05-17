import jwt from 'jsonwebtoken';

/**
 * @function verifyToken
 * @description Verifies the JWT token
 * @param {string} token - The JWT token from the request
 * @returns {Object} Decoded token data or null if invalid
 */
const verifyToken = (token) => {
    try {
        // Ensure the secret key is available
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Verify and decode the token
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        // Handle specific JWT verification errors
        if (error instanceof jwt.JsonWebTokenError) {
            console.error('JWT Error:', error.message);
        }
        if (error instanceof jwt.TokenExpiredError) {
            console.error('Token expired:', error.message);
        }

        return null;
    }
}

export default verifyToken;
