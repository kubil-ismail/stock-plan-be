"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("m_companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticker: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.TEXT,
      },
      office_address: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      fax: {
        type: Sequelize.STRING,
      },
      tin: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      listing_date: {
        type: Sequelize.DATE,
      },
      listing_board: {
        type: Sequelize.STRING,
      },
      main_business: {
        type: Sequelize.TEXT,
      },
      sector_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "m_sector",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      subsector_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "m_sub_sector",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      industry_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "m_industries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      subindustry_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "m_sub_industries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      share_registery_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "m_share_registery",
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
    await queryInterface.dropTable("m_companies");
  },
};
