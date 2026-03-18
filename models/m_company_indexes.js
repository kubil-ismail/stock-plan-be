"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_company_indexes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_company_indexes.belongsTo(models.m_companies, {
        foreignKey: "company_id",
        targetKey: "id",
        as: "company",
      });

      m_company_indexes.belongsTo(models.m_market_indexes, {
        foreignKey: "indexes_id",
        as: "indexes",
      });
    }
  }
  m_company_indexes.init(
    {
      company_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      indexes_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "m_company_indexes",
      paranoid: true,
    }
  );
  return m_company_indexes;
};
