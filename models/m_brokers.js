"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_brokers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_brokers.init(
    {
      ticker: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isAlpha: true,
          isLength(value) {
            if (String(value).length !== 2) {
              throw new Error("Need 2 characters");
            }
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmpty: true,
          isValidType(value) {
            const allowed = [
              "Penjamin Emisi Efek",
              "Perantara Pedagang Efek",
              "Manajer Investasi",
            ];

            if (!Array.isArray(value)) {
              throw new Error("Type must be an array");
            }

            for (const v of value) {
              if (!allowed.includes(v)) {
                throw new Error(`Invalid type: ${v}`);
              }
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "m_brokers",
      paranoid: true,
    }
  );
  return m_brokers;
};
