const classToJson = (obj) => {
    return {
        id: obj._id,
        name: obj.name,
        username: obj.username,
        password: obj.password,
        role: obj.role,
    }
}

const jsonToGet = (obj) => {
    return {
        name: obj.name,
        username: obj.username,
        role: obj.role,
    }
}

export default {
    classToJson,
    jsonToGet,
}