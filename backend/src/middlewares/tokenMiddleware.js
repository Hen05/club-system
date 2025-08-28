import getAccessToken from "../utils/getAccessToken.js";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import configDB from "../../config.js";

export default function tokenMiddleware(req, res, next) {
    const token = getAccessToken(req);

    if (!token) {
        return res.status(403).json({ message: 'User is not authenticated' });
    }

    jwt.verify(token, configDB.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie('access_token');
            return res.status(403).json({ message: 'Invalid session, please login again' });
        }
        userRepository.findById(decoded.id).then(user => {
            req.user = {
                username: user.username,
                role: user.role,
            }
            next();
        })
    });
}