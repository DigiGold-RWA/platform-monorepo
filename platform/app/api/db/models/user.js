/* eslint-disable no-unused-vars */
import { Sequelize, Model, DataTypes } from "sequelize";
import connection from "../connection";
import { formatDate } from "./helpers";

const initUser = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            image: { type: DataTypes.STRING },
            email_verified: { type: DataTypes.DATE },
            name: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            kyc_status: {
                type: DataTypes.ENUM("pending", "approved", "rejected"),
            },
            gender: {
                type: Sequelize.STRING,
            },
            dob: {
                type: Sequelize.DATE,
            },
            address: {
                type: DataTypes.TEXT("long"),
            },
            wallet_address: {
                type: Sequelize.STRING,
            },
            account_type: {
                type: DataTypes.ENUM("individual", "corporate"),
                defaultValue: "individual",
            },
            shuftipro_reference: {
                type: Sequelize.STRING,
            },
            shuftipro_kyc_url: {
                type: Sequelize.STRING,
            },
            country_code: {
                type: Sequelize.STRING,
            },
            country_currency: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            sequelize,
            tableName: "users",
            modelName: "User",
            defaultScope: {
                attributes: { exclude: ["password"] },
            },
            scopes: {
                withPassword: {
                    attributes: {},
                },
            },
        }
    );

    return User;
};

export default initUser(connection, DataTypes);
