"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_industries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_industries.hasMany(models.m_sub_industries, {
        foreignKey: "industries_id",
        as: "sub_industries",
      });
    }
  }
  m_industries.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "m_industries",
      paranoid: true,
    }
  );
  return m_industries;
};
