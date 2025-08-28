import RequestRecordDto from "../dtos/requestRecordDto.js";
import requestService from "../services/requestService.js";
import {handleNewRequestNotification, sendNotificationToAll} from "../websocket/notificationServer.js";

const createRequest = async (req, res) => {
    const { clubId, type, info } = req.body;
    const recordDto = new RequestRecordDto(clubId, req.user.username, type);

    const result = await requestService.create(recordDto, info);
    if(!result.success) {
        return res.status(result.status).send(result.message);
    }

    await handleNewRequestNotification();
    return res.status(result.status).send(result.message);
}

const getAllRequests = async (req, res) => {
    const result = await requestService.getAllRequests();
    if(!result.success){
        return res.status(result.status).send(result.message);
    }

    return res.status(result.status).send(result.data);
}

const getRequestByClubId = async (req, res) => {
    const { clubId } = req.params;
    const result = await requestService.getByClubId(clubId);
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

const acceptRequest = async (req, res) => {
    const { clubId } = req.params;
    const result = await requestService.acceptRequest(clubId);
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.message);
}

const rejectRequest = async (req, res) => {
    const { clubId } = req.params;
    const result = await requestService.rejectRequest(clubId);
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.message);
}

export default {
    createRequest,
    getAllRequests,
    getRequestByClubId,
    acceptRequest,
    rejectRequest,
}