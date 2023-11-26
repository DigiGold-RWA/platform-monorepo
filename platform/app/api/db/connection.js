import Sequelize from "sequelize";
import mysql2 from "mysql2";
import config from "./config/config.js";

let sequelize;
if (process.env.NODE_ENV === "production") {
    const options = config.production;
    options.dialectModule = mysql2;
    sequelize = new Sequelize(options);
} else if (process.env.NODE_ENV === "staging") {
    sequelize = new Sequelize(config.staging);
} else {
    const options = config.development;
    options.dialectModule = mysql2;
    sequelize = new Sequelize(options);
}

const connection = sequelize;

export default connection;
