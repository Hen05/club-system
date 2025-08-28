import mongoose from "mongoose";
import {CLUB_ACTIONS} from "../constants/clubActions.js";

const clubHistorySchema = new mongoose.Schema(
    {
        clubId: { type: String, required: true },
        type: {
            type: String,
            enum: CLUB_ACTIONS,
            required: true },
        waiterName: { type: String },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: false });

export default mongoose.model('ClubHistories', clubHistorySchema);