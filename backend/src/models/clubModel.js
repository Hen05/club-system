import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
    {
        owner: {type: String, required: true},
        name: {type: String},
        distilled: {type: String, required: true}
    },
    { timestamps: false });

export default mongoose.model('Clubs', clubSchema);