"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_shareholder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_shareholder.init(
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
      total: {
        type: DataTypes.STRING,
      },
      percentage: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "m_shareholder",
    }
  );
  return m_shareholder;
};
