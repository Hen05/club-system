import RevokedToken from "../models/revokedTokenModel.js";

class RevokedTokenRepository {
    async create(tokenData) {
        try {
            const token = await RevokedToken.create(tokenData);
            return token.toJSON();
        } catch (error) {
            throw new Error(`Error revoking token: ${error.message}`);
        }
    }

    async findByToken(token) {
        try {
            const revokedToken = await RevokedToken.findOne({ token });
            return revokedToken ? revokedToken.toJSON() : null;
        } catch (error) {
            throw new Error(`Error finding revoked token: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const tokens = await RevokedToken.find();
            return tokens.map(token => token.toJSON());
        } catch (error) {
            throw new Error(`Error finding all revoked tokens: ${error.message}`);
        }
    }
}

export default new RevokedTokenRepository();