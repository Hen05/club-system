import mongoose from "mongoose";

const revokedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    revokedAt: { type: Date, default: Date.now }
});

export default mongoose.model('RevokedTokens', revokedTokenSchema);