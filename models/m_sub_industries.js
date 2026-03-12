"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_sub_industries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_sub_industries.belongsTo(models.m_industries, {
        foreignKey: "industries_id",
        as: "industry",
      });
    }
  }
  m_sub_industries.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      industries_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "m_sub_industries",
    }
  );
  return m_sub_industries;
};
