import userRepository from "../repositories/userRepository.js";
import Result from "../utils/result.js";
import {recordStatus} from "../constants/recordStatus.js";
import clubHistoryRepository from "../repositories/clubHistoryRepository.js";
import clubRepository from "../repositories/clubRepository.js";
import {CLUB_ACTIONS} from "../constants/clubActions.js";

const create = async (recordDto) => {
    const { clubId, type, waiterNameOrId, status} = recordDto;

    const isValidType = CLUB_ACTIONS.find(e => e === type.toLowerCase());

    if(!isValidType) {
        return new Result(false, 404, `Invalid type, should be ${CLUB_ACTIONS.toString()}`);
    }

    const data = {
        clubId,
        type: type.toLowerCase(),
        waiterName: waiterNameOrId
    }

    const clubHistory = await clubHistoryRepository.create(data);
    if(!clubHistory) {
        return Result(false, 401, 'Not created');
    }

    return Result(true, 200, 'Created with success', clubHistory);
}

const getByClubId = async (clubId) => {
    const club = await clubRepository.findById(clubId);
    if(!club) {
        return new Result(false, 404, `No club with id ${clubId}`);
    }

    const response = [];
    const clubHistory = await clubHistoryRepository.findByClubId(clubId);

    for(const history of clubHistory) {
        const responseData = {
            type: history.type,
            waiterName: history.waiterName,
            createdAt: history.createdAt
        }

        const user = await userRepository.findByUsername(history.waiterName);
        if(user) {
           responseData.waiterName = user.name;
        }

        response.push(responseData);
    }

    return new Result(true, 200, 'Histories founded', response);
}

const deleteByClubId = async (clubId) => {
    const club = await clubRepository.findById(clubId);
    if(!club){
        return new Result(false, 404, `No club with id ${clubId}`);
    }

    const result = await clubHistoryRepository.deleteByClubId(clubId);
    if (!result){
        return new Result(false, '401', 'Something went wrong')
    }

    return new Result(true, '200', 'Deleted with success', result);
}

export default {
    create,
    getByClubId,
    deleteByClubId
}