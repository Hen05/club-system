import ClubRecordDto from "../dtos/clubRecordDto.js";
import clubService from "../services/clubService.js";

const createClub = async (req, res) => {
    const { owner, distilled, name, waiterName, isStored, date } = req.body;
    const recordDto = new ClubRecordDto(owner, name, distilled, waiterName);

    const result = await clubService.create(recordDto, isStored, date);
    if (!result.success) {
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.message);
}

const getClub = async (req, res) => {
    const { id } = req.params;
    const result = await clubService.get(id);

    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

const getAllClubs = async (req, res) => {
    const result = await clubService.getAll();
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

const updateClub = async (req, res) => {
    const { id } = req.params;
    const { owner, distilled, name } = req.body;

    const data = {};

    if(owner) data.owner = owner;
    if(distilled) data.distilled = distilled;
    if(name) data.name = name;

    const result = clubService.update(id, data);
    if(!result.success){
        return res.status(404).send(result.message);
    }
    return res.status(200).send(result.data);
}

const deleteClub = async (req, res) => {
    const { id } = req.params;

    const result = await clubService.remove(id);
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.message);
}

const getAllDistilled = async (req, res) => {
    const result = await clubService.getAllDistilled();
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

const getAllNames = async (req, res) => {
    const result = await clubService.getAllNames();
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

export default {
    createClub,
    getClub,
    getAllClubs,
    updateClub,
    deleteClub,
    getAllDistilled,
    getAllNames
}