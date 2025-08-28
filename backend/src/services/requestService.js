import requestRepository from "../repositories/requestRepository.js";
import Result from "../utils/result.js";
import clubRepository from "../repositories/clubRepository.js";
import clubHistoryRepository from "../repositories/clubHistoryRepository.js";
import userRepository from "../repositories/userRepository.js";
import {CLUB_ACTIONS} from "../constants/clubActions.js";

const create = async (data, info) => {
    const { clubId, username, type } = data;

    const club = await clubRepository.findById(clubId);
    if(!club) {
        return new Result(false, 404, `No club with id ${clubId}`);
    }

    const user = await userRepository.findByUsername(username);
    if(!user) {
        return new Result(false, 404, `No user with id ${user.id}`);
    }

    const isValidType = CLUB_ACTIONS.find(e => e === type.toLowerCase());
    if(!isValidType) {
        return new Result(false, 404, `Invalid type, should be ${CLUB_ACTIONS.toString()}`);
    }

    const isThereARequest = await requestRepository.findByClubId(clubId);
    if(isThereARequest.length > 0) {
        return new Result(false, 401, `There is a request on club with id ${clubId}`);
    }

    const requestData = {
        clubId,
        userId: user.id,
        type: type.toLowerCase(),
    }

    if(info){
        requestData.info = info;
    }

    const request = await requestRepository.create(requestData);
    if(!request){
        return new Result(false, 404, 'Something went wrong');
    }
    return new Result(true, 200, 'Request created', request);
}

const getAllRequests = async () => {
    const requests = await requestRepository.findAll();
    if(requests.length === 0) {
        return new Result(true, 200, 'No requests found', []);
    }

    console.log(requests);
    const response = [];

    for(const request of requests) {
        const completeRequest = await getInfos(request);
        response.push(completeRequest.data);
    }

    return new Result(true, 200, 'All requests', response);
}

const getByClubId = async (clubId) => {
    const club = await clubRepository.findById(clubId);
    if(!club) {
        return new Result(false, 404, `No club with id ${clubId}`);
    }
    const result = await clubHistoryRepository.findByClubId(clubId);
    if(!result){
        return new Result(false, 404, `No history for club with id ${clubId}`);
    }
    return new Result(true, 200, 'Club history found', result);
}

const acceptRequest = async (clubId) => {
    const club = await clubRepository.findById(clubId);
    if(!club) {
        return new Result(false, 404, `No club with id ${clubId}`);
    }

    const requestArr = await requestRepository.findByClubId(clubId);
    if(requestArr.length <= 0){
        return new Result(false, 404, `No history for club with id ${clubId}`);
    }
    const request = requestArr[0];

    const user = await userRepository.findById(request.userId);
    if(!user) {
        return new Result(false, 404, `No user with id ${user.id}`);
    }

    const data = {
        clubId: clubId,
        type: request.type,
        waiterName: user.username
    }

    await clubHistoryRepository.create(data);
    await requestRepository.deleteByClubId(clubId);

    return new Result(true, 200, 'Request accepted', request);
}

const rejectRequest = async (clubId) => {
    await requestRepository.deleteByClubId(clubId);
    return new Result(true, 200, 'Request rejected with success');
}

const getInfos = async (request) => {
    const club = await clubRepository.findById(request.clubId);
    if(!club) {
        return new Result(false, 404, `No club with id ${request.clubId}`);
    }

    const user = await userRepository.findById(request.userId);
    if(!user) {
        return new Result(false, 404, `No user with id ${user.id}`);
    }

    const data = {
        id: request.id,
        club,
        user: {
            username: user.username,
        },
        type: request.type,
        info: request.info
    }

    return new Result(true, 200, 'Get infos with success', data);
}

const isThereARequest = async () => {
    const requests = await requestRepository.findAll();
    return requests.length > 0;
}

export default {
    create,
    getAllRequests,
    getByClubId,
    acceptRequest,
    rejectRequest,
    isThereARequest
}