import mongoose from "mongoose";
import {CLUB_ACTIONS} from "../constants/clubActions.js";

const requestSchema = new mongoose.Schema(
    {
        clubId: { type: String, required: true },
        userId: { type: String, required: true },
        type: {
            type: String,
            enum: CLUB_ACTIONS,
            required: true },
        info: { type: String, required: false },
    },
    { timestamps: true });

export default mongoose.model('Requests', requestSchema);