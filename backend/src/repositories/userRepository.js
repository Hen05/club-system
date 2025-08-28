import User from "../models/userModel.js";
import userMapper from "../mapper/userMapper.js";

class UserRepository {
    async create(userData) {
        try {
            const user = await User.create(userData);
            return userMapper.classToJson(user);
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async findById(id) {
        if (!id) throw new Error("ID is required");
        try {
            const user = await User.findById(id).lean();
            return user ? userMapper.classToJson(user) : null;
        } catch (error) {
            return null;
            // throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    async findByUsername(username) {
        try {
            const user = await User.findOne({ username }).lean();
            return user ? userMapper.classToJson(user) : null;
        } catch (error) {
            throw new Error(`Error finding user by username: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const users = await User.find().lean();
            if (users.length === 0) return null;
            return users.map(userMapper.classToJson);
        } catch (error) {
            throw new Error(`Error finding all users: ${error.message}`);
        }
    }

    async update(id, userData) {
        try {
            const user = await User.findByIdAndUpdate(id, userData, { new: true, lean: true });
            return user ? userMapper.classToJson(user) : null;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            return user !== null;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

export default new UserRepository();
