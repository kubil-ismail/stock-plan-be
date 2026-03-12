"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("m_company_managements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "m_companies",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM(
          "DIREKSI",
          "KOMISARIS",
          "KOMITE AUDIT",
          "SEKRETARIS PERUSAHAAN"
        ),
      },
      position: {
        type: Sequelize.ENUM(
          "PRESIDEN DIREKTUR",
          "WAKIL PRESIDEN DIREKTUR",
          "DIREKTUR UTAMA",
          "WAKIL DIREKTUR UTAMA",
          "DIREKTUR",
          "KOMISARIS UTAMA",
          "KETUA",
          "ANGGOTA",
          "SEKRETARIS PERUSAHAAN"
        ),
      },
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      is_affiliated: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("m_company_managements");
  },
};
