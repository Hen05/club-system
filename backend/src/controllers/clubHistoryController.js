import clubHistoryRecordDto from "../dtos/clubHistoryRecordDto.js";
import clubHistoryService from "../services/clubHistoryService.js";

const createClubHistory = async (req, res) => {
    const { clubId, type, waiterName } = req.body;
    const recordDto = new clubHistoryRecordDto(clubId, type, waiterName);

    const result = await clubHistoryService.create(recordDto);
    if(!result.success) {
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.message);
}

const getByClubId = async (req, res) => {
    const { clubId } = req.params;
    const result = await clubHistoryService.getByClubId(clubId);
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

const deleteByClubId = async (req, res) => {
    const { clubId } = req.params;
    const result = await clubHistoryService.deleteByClubId(clubId);
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.message);
}

export default {
    createClubHistory,
    getByClubId,
    deleteByClubId
}