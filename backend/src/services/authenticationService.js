import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import revokedTokenRepository from "../repositories/revokedTokenRepository.js";
import Result from "../utils/result.js";
import configDB from "../../config.js";
import {USER_ROLES} from "../constants/roles.js";

const register = async (name, username, password, role) => {
    const userExistsUsername = await userRepository.findByUsername(username.toLowerCase());

    if (userExistsUsername) {
        return Result(false, 409, "User already exists");
    }

    if (!USER_ROLES.includes(role.toLowerCase())){
        return Result(false, 404, "Role does not exist");
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const userData = { name: name, username: username.toLowerCase(), password: passwordHash, role: role.toLowerCase() };
    const user = await userRepository.create(userData);

    return Result(true, 200, "User registered", user);
};

const login = async (username, password) => {
    const user = await userRepository.findByUsername(username);

    if (!user) {
        return Result(false, 401, 'Invalid username');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return Result(false, 422, 'Invalid password');
    }

    const secret = configDB.JWT_SECRET;
    const token = jwt.sign({ id: user.id }, secret);

    return Result(true, 200, "User authenticated", token);
};

const logout = async (token) => {
    await revokedTokenRepository.create({ token });
    return Result(true, 200, 'Logged out successfully', null);
};

const getUserInfos = async (access_token) => {
    const result = await getUserIdByAccessToken(access_token);
    if (!result.success) {
        return Result(false, 401, 'User not found');
    }

    const user = await userRepository.findById(result.data);

    if (!user) {
        return Result(false, 404, 'User not found');
    }

    return Result(true, 200, 'User information retrieved', { username: user.username, role: user.role });
};

const getUserIdByAccessToken = async (access_token) => {
    const decoded = jwt.verify(access_token, configDB.JWT_SECRET);
    return Result(true, 200, 'User id retrieved with success', decoded.id);
};

export default {
    register,
    login,
    logout,
    getUserInfos,
    getUserIdByAccessToken
}