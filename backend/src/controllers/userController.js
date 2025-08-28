import userService from "../services/userService.js";

const getAllWaiters = async (req, res) => {
    try{
        const result = await userService.getWaiters();
        return res.status(200).json(result.data);
    } catch (error){
        return res.status(400).send({error: error});
    }
}

export default {
    getAllWaiters
}