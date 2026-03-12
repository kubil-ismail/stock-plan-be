"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_sub_sector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_sub_sector.belongsTo(models.m_sector, {
        foreignKey: "sector_id",
        as: "sector",
      });
    }
  }
  m_sub_sector.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      sector_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "m_sub_sector",
      paranoid: true,
    }
  );
  return m_sub_sector;
};
