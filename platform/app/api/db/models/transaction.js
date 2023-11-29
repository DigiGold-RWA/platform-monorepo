/* eslint-disable no-unused-vars */
import { Sequelize, Model, DataTypes } from "sequelize";
import connection from "../connection";
import { formatDate } from "./helpers";

const initTransaction = (sequelize, DataTypes) => {
    class Transaction extends Model {}
    Transaction.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            type: {
                type: DataTypes.ENUM("deposit", "withdrawal", "swap"),
            },
            crypto: {
                type: DataTypes.ENUM("KLAY", "DGOLD"),
            },
            currency: {
                type: Sequelize.STRING,
            },
            status: {
                type: DataTypes.ENUM("pending", "completed", "failed"),
            },
            user_id: {
                type: DataTypes.UUID,
                references: {
                    model: "users", // name of Target model
                    key: "id",
                },
                allowNull: false,
                onDelete: "CASCADE",
            },
            amount: {
                type: DataTypes.DECIMAL(10, 5),
                get() {
                    const rawValue = this.getDataValue("amount");
                    return rawValue ? parseFloat(rawValue).toFixed(2) : "";
                },
                set(value) {
                    this.setDataValue(
                        "amount",
                        !isNaN(parseFloat(value))
                            ? parseFloat(value).toFixed(4)
                            : 0
                    );
                },
            },
            amount_usd: {
                type: DataTypes.DECIMAL(10, 5),
                get() {
                    const rawValue = this.getDataValue("amount_usd");
                    return rawValue ? parseFloat(rawValue).toFixed(2) : "";
                },
                set(value) {
                    this.setDataValue(
                        "amount_usd",
                        !isNaN(parseFloat(value))
                            ? parseFloat(value).toFixed(4)
                            : 0
                    );
                },
            },
            platform_fee: {
                type: DataTypes.DECIMAL(10, 5),
                defaultValue: 0,
                get() {
                    const rawValue = this.getDataValue("platform_fee");
                    return rawValue ? parseFloat(rawValue).toFixed(5) : "";
                },
                set(value) {
                    this.setDataValue(
                        "platform_fee",
                        !isNaN(parseFloat(value))
                            ? parseFloat(value).toFixed(5)
                            : 0
                    );
                },
            },
            platform_fee_usd: {
                type: DataTypes.DECIMAL(10, 5),
                defaultValue: 0,
                get() {
                    const rawValue = this.getDataValue("platform_fee_usd");
                    return rawValue ? parseFloat(rawValue).toFixed(5) : "";
                },
                set(value) {
                    this.setDataValue(
                        "platform_fee_usd",
                        !isNaN(parseFloat(value))
                            ? parseFloat(value).toFixed(5)
                            : 0
                    );
                },
            },
            network_fee: {
                type: DataTypes.DECIMAL(10, 5),
                defaultValue: 0,
                get() {
                    const rawValue = this.getDataValue("network_fee");
                    return rawValue ? parseFloat(rawValue).toFixed(5) : "";
                },
                set(value) {
                    this.setDataValue(
                        "network_fee",
                        !isNaN(parseFloat(value))
                            ? parseFloat(value).toFixed(5)
                            : 0
                    );
                },
            },
            network_fee_usd: {
                type: DataTypes.DECIMAL(10, 5),
                defaultValue: 0,
                get() {
                    const rawValue = this.getDataValue("network_fee_usd");
                    return rawValue ? parseFloat(rawValue).toFixed(5) : "";
                },
                set(value) {
                    this.setDataValue(
                        "network_fee_usd",
                        !isNaN(parseFloat(value))
                            ? parseFloat(value).toFixed(5)
                            : 0
                    );
                },
            },
            tx_id: {
                type: DataTypes.STRING,
            },
            source_address: {
                type: DataTypes.STRING,
            },
            destination_address: {
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                get() {
                    const rawValue = this.getDataValue("createdAt");
                    return rawValue ? formatDate(rawValue, 2) : "";
                },
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            sequelize,
            tableName: "transactions",
            modelName: "Transaction",
        }
    );
    return Transaction;
};

export default initTransaction(connection, DataTypes);
