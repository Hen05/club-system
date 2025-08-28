import Request from "../models/requestModel.js";
import requestMapper from "../mapper/requestMapper.js";

class RequestRepository {
    async create(requestData) {
        try {
            const request = await Request.create(requestData);
            return requestMapper.classToJson(request);
        } catch (error) {
            throw new Error(`Error creating request: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const request = await Request.findById(id);
            return request ? requestMapper.classToJson(request) : null;
        } catch (error) {
            throw new Error(`Error finding request by ID: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const requests = await Request.find().lean();
            return requests.length > 0
                ? requests.map(requestMapper.classToJson)
                : [];
        } catch (error) {
            throw new Error(`Error finding all requests: ${error.message}`);
        }
    }

    async findByClubId(clubId) {
        try {
            const requests = await Request.find({ clubId }).lean();
            return requests.length > 0
                ? requests.map(requestMapper.classToJson)
                : [];
        } catch (error) {
            throw new Error(`Error finding requests by club ID: ${error.message}`);
        }
    }

    async findByUserId(userId) {
        try {
            const requests = await Request.find({ userId }).lean();
            return requests.length > 0
                ? requests.map(requestMapper.classToJson)
                : [];
        } catch (error) {
            throw new Error(`Error finding requests by user ID: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const deleted = await Request.findByIdAndDelete(id);
            return deleted !== null;
        } catch (error) {
            throw new Error(`Error deleting request: ${error.message}`);
        }
    }

    async deleteByClubId(clubId) {
        try {
            const result = await Request.deleteMany({ clubId });
            return result.deletedCount > 0;
        } catch (error) {
            throw new Error(`Error deleting requests by club ID: ${error.message}`);
        }
    }

}

export default new RequestRepository();