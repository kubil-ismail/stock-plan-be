"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_trading_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_trading_plan.belongsTo(models.m_companies, {
        foreignKey: "ticker",
        targetKey: "ticker",
      });

      m_trading_plan.belongsTo(models.m_trading_setup, {
        foreignKey: "setup",
        targetKey: "setup_slug",
      });
    }
  }
  m_trading_plan.init(
    {
      ticker: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isLength(value) {
            if (String(value).length !== 4) {
              throw new Error("Need 4 characters");
            }
          },
        },
      },
      setup: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      entry_price: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          notEmpty: true,
        },
      },
      entry_reason: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      risk_note: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      entry_date: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isDate: true,
        },
      },
      psychology: {
        type: DataTypes.JSON,
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
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
        defaultValue: "ARCHIVE",
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
      modelName: "m_trading_plan",
    }
  );
  return m_trading_plan;
};
