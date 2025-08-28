import ClubHistory from "../models/clubHistoryModel.js";
import clubHistoryMapper from "../mapper/clubHistoryMapper.js";

class ClubHistoryRepository {
    async create(historyData) {
        try {
            const history = await ClubHistory.create(historyData);
            return clubHistoryMapper.classToJson(history);
        } catch (error) {
            throw new Error(`Error creating club history: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const history = await ClubHistory.findById(id);
            return history ? clubHistoryMapper.classToJson(history) : null;
        } catch (error) {
            throw new Error(`Error finding club history by ID: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const histories = await ClubHistory.find().lean();
            return histories.length > 0
                ? histories.map(clubHistoryMapper.classToJson)
                : [];
        } catch (error) {
            throw new Error(`Error finding all club histories: ${error.message}`);
        }
    }

    async findByClubId(clubId) {
        try {
            const histories = await ClubHistory.find({ clubId })
                .sort({ createdAt: -1 }) // Ordena por data de criação (mais recente primeiro)
                .lean();
            return histories.length > 0
                ? histories.map(clubHistoryMapper.classToJson)
                : [];
        } catch (error) {
            throw new Error(`Error finding histories by club ID: ${error.message}`);
        }
    }

    async findLastHistory(clubId) {
        try {
            const lastHistory = await ClubHistory.findOne({ clubId })
                .sort({ createdAt: -1 }) // Pega o mais recente
                .lean();
            return lastHistory ? clubHistoryMapper.classToJson(lastHistory) : null;
        } catch (error) {
            throw new Error(`Error finding last club status: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const deleted = await ClubHistory.findByIdAndDelete(id);
            return deleted !== null;
        } catch (error) {
            throw new Error(`Error deleting club history: ${error.message}`);
        }
    }

    async deleteByClubId(clubId){
        try{
            const deleted = await ClubHistory.deleteMany({clubId});
            return deleted !== null;
        } catch (error) {
            throw new Error(`Error deleting club history: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const result = await ClubHistory.findOneAndUpdate(
                { _id: id },
                { $set: data },
                { timestamps: false, new: true }
            );
            return result !== null;
        } catch (error) {
            throw new Error('Error updating club history: ' + error.message);
        }
    }
}

export default new ClubHistoryRepository();