const jwt = require('jsonwebtoken');
const User = require('../db/Model/userModel');
const dotenv = require('dotenv');
dotenv.config();

const control_data = require('../Controller/control-Data.json');

exports.accessControl = async function (access_types, req, res, next) {
    try {
        // If all roles are allowed (access_types = "*"), skip the role validation
        if (access_types === "*") {
            return next();
        }

        // Extract authorization token from request headers
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: "Please login to continue" });
        }

        // Split token from "Bearer <token>"
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: "Invalid access token" });
        }

        // Verify JWT token
        jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Authentication failed" });
            }

            // Log decoded token to debug (Ensure the token contains the correct ID)
            console.log("Decoded Token ID:", decoded.id);

            // Retrieve the user based on the decoded ID and populate 'userType' to get role
            const user_data = await User.findOne({ _id: decoded.id }).populate('userType');
            if (!user_data) {
                return res.status(404).json({ message: "User not found" });
            }

            // Extract the user role (Default to "Admin" if not available)
            const user_role = user_data.userType?.userType || "Admin";
            console.log("Extracted User Role:", user_role);

            // Split the access_types string and map it to the roles in control_data
            const allowedRoles = access_types.split(',').map((type) => control_data[type]);

            // Check if the user role is in the list of allowed roles
            if (!allowedRoles.includes(user_role)) {
                return res.status(403).json({ message: "Not allowed to access this route" });
            }

            // Attach the user data and role to the request object for downstream middleware
            req.user = {
                id: user_data._id,
                role: user_role
            };
            req.user_data = user_data;

            // Proceed to the next middleware/route handler
            return next();
        });
    } catch (error) {
        console.log("Access Control Error:", error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
};
