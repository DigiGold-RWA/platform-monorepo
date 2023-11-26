"use strict";

const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("transactions", 
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            type: {
                type: DataTypes.ENUM("deposit", "withdrawal"),
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
            },
            amount_usd: {
                type: DataTypes.DECIMAL(10, 5),
            },
            platform_fee: {
                type: DataTypes.DECIMAL(10, 5),
                defaultValue: 0,
            },
            platform_fee_usd: {
                type: DataTypes.DECIMAL(10, 5),
                defaultValue: 0,
            },
            network_fee: {
                type: DataTypes.DECIMAL(10, 5),
                defaultValue: 0,
            },
            network_fee_usd: {
                type: DataTypes.DECIMAL(10, 5),
                defaultValue: 0,
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
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("transactions");
    },
};
