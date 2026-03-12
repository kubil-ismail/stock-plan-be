"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_trading_setup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_trading_setup.belongsTo(models.m_user, {
        foreignKey: "createdBy",
        targetKey: "id",
        as: "user",
      });
      
    }
  }
  m_trading_setup.init(
    {
      setup_slug: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      timeframe: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      script: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "m_trading_setup",
      paranoid: true,
    }
  );
  return m_trading_setup;
};
