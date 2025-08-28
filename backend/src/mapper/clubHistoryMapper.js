const classToJson = (obj) => {
    return {
        id: obj._id,
        clubId: obj.clubId,
        type: obj.type,
        waiterName: obj.waiterName,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
    };
};

const jsonToGet = (obj) => {
    return {
        type: obj.type,
        waiterName: obj.waiterName,
        createdAt: obj.createdAt,
    };
};

export default {
    classToJson,
    jsonToGet,
};
