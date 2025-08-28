import userRepository from "../repositories/userRepository.js";
import Result from "../utils/result.js";

const getWaiters = async () => {
    const waiters = await userRepository.findAll();
    return new Result(true, 200, 'Get Users', waiters);
}

export default {
    getWaiters
}