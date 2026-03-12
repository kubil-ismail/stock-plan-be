"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_sector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_sector.hasMany(models.m_sub_sector, {
        foreignKey: "sector_id",
        as: "sub_sectors",
      });
    }
  }
  m_sector.init(
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
      modelName: "m_sector",

      paranoid: true,
    }
  );
  return m_sector;
};
