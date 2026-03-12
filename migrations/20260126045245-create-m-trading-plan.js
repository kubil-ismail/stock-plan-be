"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("m_trading_plans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticker: {
        type: Sequelize.STRING,
        references: {
          model: "m_companies",
          key: "ticker",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      setup: {
        type: Sequelize.STRING,
        references: {
          model: "m_trading_setup",
          key: "setup_slug",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      entry_price: {
        type: Sequelize.INTEGER,
      },
      entry_reason: {
        type: Sequelize.STRING,
      },
      risk_note: {
        type: Sequelize.STRING,
      },
      entry_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      psychology: {
        type: Sequelize.JSONB,
      },
      script: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM("ARCHIVE", "ACTIVE", "SUCCESS", "FAILED"),
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "m_users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("m_trading_plans");
  },
};
