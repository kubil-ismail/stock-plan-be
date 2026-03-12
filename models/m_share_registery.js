"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_share_registery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_share_registery.init(
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
      modelName: "m_share_registery",
      paranoid: true,
    }
  );
  return m_share_registery;
};
