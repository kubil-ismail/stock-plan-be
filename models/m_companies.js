"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_companies.belongsTo(models.m_industries, {
        foreignKey: "industry_id",
        as: "industry",
      });

      m_companies.belongsTo(models.m_sub_industries, {
        foreignKey: "subindustry_id",
        as: "subindustry",
      });

      m_companies.belongsTo(models.m_sector, {
        foreignKey: "sector_id",
        as: "sector",
      });

      m_companies.belongsTo(models.m_sub_sector, {
        foreignKey: "subsector_id",
        as: "subsector",
      });

      m_companies.hasMany(models.m_company_managements, {
        foreignKey: "company_id",
        as: "managements",
      });

      m_companies.hasMany(models.m_shareholder, {
        foreignKey: "company_id",
        as: "shareholders",
      });

      m_companies.hasMany(models.m_company_subsidiary, {
        foreignKey: "company_id",
        as: "subsidiaries",
      });
    }
  }
  m_companies.init(
    {
      ticker: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isAlpha: true,
          isLength(value) {
            if (String(value).length !== 4) {
              throw new Error("Need 4 characters");
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
      logo: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      office_address: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      fax: {
        type: DataTypes.STRING,
      },
      tin: {
        type: DataTypes.STRING,
      },
      website: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      listing_date: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      listing_board: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      main_business: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      sector_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      subsector_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      industry_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      subindustry_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      share_registery_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "m_companies",
      paranoid: true,
    }
  );
  return m_companies;
};
