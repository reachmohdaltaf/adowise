

import { User } from "../models/user.model.js";
import verifyToken from "../utils/jwt/verifytToken.js";



/**
 * @function authMiddleware
 * @description Middleware to protect routes
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} 401 Unauthorized with error message or next middleware function
 */


const authMiddleware = async (req, res, next) => {
   try {
     // @step Get token from cookies
     const token = req.cookies.token;

     // @step Check if token existss
     if (!token) {
         return res.status(401).json({ error: "Unauthorized" });
     }
 
     // @step Verify token
     const decoded = verifyToken(token);
     if (!decoded) {
         return res.status(401).json({ error: "Unauthorized" });
     }
 
     // @step Find user by id from decoded token
     const user = await User.findById(decoded.id);
     if(!user) {
         return res.status(401).json({ error: "Unauthorized" });
     }
 
     // @step Attach user to request object
     req.user = user;
     next();
     
   } catch (error) {
     console.error("Error in auth middleware:", error);
     res.status(500).json({ error: "Internal server error" });
   }

}

export default authMiddleware
