const classToJson = (obj) => {
    return {
        id: obj._id,
        clubId: obj.clubId,
        userId: obj.userId,
        type: obj.type,
        info: obj.info,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
    };
};

const jsonToGet = (obj) => {
    return {
        type: obj.type,
        createdAt: obj.createdAt,
    };
};

export default {
    classToJson,
    jsonToGet,
};