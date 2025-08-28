const classToJson = (obj) => {
    return {
        id: obj._id,
        owner: obj.owner,
        name: obj.name,
        distilled: obj.distilled,
    };
};

const jsonToGet = (obj) => {
    return {
        name: obj.name,
        distilled: obj.distilled,
    };
};

export default {
    classToJson,
    jsonToGet,
};
