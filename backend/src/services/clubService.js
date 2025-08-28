import {recordStatus} from "../constants/recordStatus.js";
import clubRepository from "../repositories/clubRepository.js";
import userRepository from "../repositories/userRepository.js";
import Result from "../utils/result.js";
import {CLUB_ACTIONS} from "../constants/clubActions.js";
import clubHistoryRepository from "../repositories/clubHistoryRepository.js";
import requestRepository from "../repositories/requestRepository.js";

const create = async (clubRecordDto, isStored, date) => {
    const { distilled, name, owner: originalOwner, waiterName } = clubRecordDto;

    let uniqueOwner = originalOwner;
    let suffix = 1;

    while (await clubRepository.existsByOwner(uniqueOwner)) {
        suffix++;
        uniqueOwner = `${originalOwner} ${suffix}`;
    }

    const clubData = {
        owner: uniqueOwner,
        name,
        distilled
    };

    const club = await clubRepository.create(clubData);

    const clubHistoryData = {
        clubId: club.id,
        type: CLUB_ACTIONS[0],
        waiterName
    };

    if (date) {
        const [year, month, day] = date.split("-").map(Number);
        clubHistoryData.createdAt = new Date(year, month - 1, day, 18, 0, 0);
    }

    await clubHistoryRepository.create(clubHistoryData);

    if(isStored) {
        const storedData = {
            clubId: club.id,
            type: CLUB_ACTIONS[2],
            waiterName
        };
        if(date){
            const [year, month, day] = date.split("-").map(Number);
            storedData.createdAt = new Date(year, month - 1, day, 18, 0, 0);
        }
        await clubHistoryRepository.create(storedData);

    }

    return new Result(true, 200, 'Club created', club);
};

const get = async (clubId) => {
    const club = await clubRepository.findById(clubId);

    if(!club) {
        return new Result(false, 404, `No club with id ${clubId}`);
    }

    const lastHistory = await clubHistoryRepository.findLastHistory(club.id);
    club.lastHistory = lastHistory.type;

    const isRequested = await requestRepository.findByClubId(club.id);
    club.isRequested = isRequested.length > 0;

    return new Result(true, 200, 'Club founded', club)
}

const getAll = async () => {
    const clubs = await clubRepository.findAll();
    if(clubs.length === 0) {
        return new Result(true, 200, 'No clubs found', []);
    }

    for(const club of clubs) {
        const lastHistory = await clubHistoryRepository.findLastHistory(club.id);
        club.lastHistory = lastHistory.type;
    }

    return new Result(true, 200, 'Clubs founded', clubs);
}

const update = async (clubId, clubData) => {
    const club = await clubRepository.findById(clubId);
    if(!club) {
        return new Result(false, 404, 'No club found', club);
    }
    const clubUpdated = await clubRepository.update(club.id, clubData);

    return new Result(true, 200, 'Club updated', clubUpdated);
}

const remove = async (clubId) => {
    const club = await clubRepository.findById(clubId);
    if(!club) {
        return new Result(false, 404, 'No club found', club);
    }
    const isClubDeleted = await clubRepository.delete(clubId);

    if(!isClubDeleted) {
        return new Result(false, 404, 'No club deleted', club);
    }
    return new Result(true, 200, 'Club deleted', club);
}

const getAllDistilled = async () => {
    const distilled = await clubRepository.findAllDistilled();
    if(!distilled){
        return new Result(false, 404, 'No distilled');
    }
    return new Result(true, 200, 'Distilled founded', distilled);
}

const getAllNames = async () => {
    const names = await clubRepository.findAllNames();
    if(!names){
        return new Result(false, 404, 'No names');
    }
    return new Result(true, 200, 'Names founded', names);
}

export default {
    create,
    get,
    getAll,
    update,
    remove,
    getAllDistilled,
    getAllNames
}