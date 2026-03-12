"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_company_subsidiary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_company_subsidiary.belongsTo(models.m_companies, {
        foreignKey: "company_id",
        as: "company",
      });
    }
  }
  m_company_subsidiary.init(
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
        },
      },
      asset: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      percentage: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "m_company_subsidiary",
      paranoid: true,
    }
  );
  return m_company_subsidiary;
};
