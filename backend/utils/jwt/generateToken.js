import jwt from 'jsonwebtoken'

/**
 * @function generateToken
 * @description Generates a JWT token with the given payload
 * @param {Object} payload - The payload to be included in the token
 * @returns {string} The generated JWT token
 */

export const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '30d'})
}