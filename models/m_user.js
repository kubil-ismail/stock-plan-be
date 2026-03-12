"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class m_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_user.hasMany(models.m_trading_setup, {
        foreignKey: "createdBy",
        sourceKey: "id",
        as: "tradingSetups",
      });
    }
  }
  m_user.init(
    {
      fullname: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
          isLowercase: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          min: 8,
        },
      },
    },
    {
      sequelize,
      modelName: "m_user",
      paranoid: true,
    }
  );
  return m_user;
};
