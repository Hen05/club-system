import {config} from "dotenv";

config();

const configDB = {
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/clubs',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'defaultSecretKey'
};

export default configDB;