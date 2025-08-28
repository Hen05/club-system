import mongoose from "mongoose";
import {USER_ROLES} from "../constants/roles.js";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        role: { type: String,
                enum: USER_ROLES,
                required: true }
    },
    { timestamps: true });

export default mongoose.model('Users', userSchema);