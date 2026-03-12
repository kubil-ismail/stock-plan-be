"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_company_managements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_company_managements.belongsTo(models.m_companies, {
        foreignKey: "company_id",
        as: "company",
      });
    }
  }
  m_company_managements.init(
    {
      company_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isIn: [
            "DIREKSI",
            "KOMISARIS",
            "KOMITE AUDIT",
            "SEKERTARIS PERUSAHAAN",
          ],
        },
      },
      position: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isIn: [
            "PRESIDEN DIREKTUR",
            "WAKIL PRESIDEN DIREKTUR",
            "DIREKTUR UTAMA",
            "DIREKTUR",
            "KOMISARIS UTAMA",
            "KETUA",
            "ANGGOTA",
            "SEKERTARIS PERUSAHAAN",
            "-",
          ],
        },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      is_affiliated: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "m_company_managements",
      paranoid: true,
    }
  );
  return m_company_managements;
};
