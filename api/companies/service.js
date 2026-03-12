const model = require("../../models");
const { Op } = require("sequelize");
const { isNumericPositive } = require("../../utils/helper");

exports.findCompanies = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset } = params;

      const find = await model.m_companies.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        attributes: {
          exclude: [
            "sector_id",
            "subsector_id",
            "industry_id",
            "subindustry_id",
            "share_registery_id",
            "createdAt",
            "updatedAt",
            "deletedAt",
          ],
        },
        include: [
          {
            model: model.m_sector,
            as: "sector",
            attributes: ["id", "name"],
          },
          {
            model: model.m_sub_sector,
            as: "subsector",
            attributes: ["id", "name"],
          },
        ],
      });

      resolve(find);
    } catch (error) {
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};

exports.findListCompanies = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const find = await model.m_companies.findAll({
        order: [["ticker", "ASC"]],
        attributes: ["id", "ticker", "name"],
      });

      resolve(find);
    } catch (error) {
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};

exports.findOneCompanies = (company_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let search;

      if (isNumericPositive(company_id)) {
        search = {
          id: {
            [Op.eq]: parseInt(company_id, 10),
          },
        };
      } else {
        search = {
          ticker: {
            [Op.eq]: company_id,
          },
        };
      }

      const company = await model.m_companies.findOne({
        where: search,
        attributes: {
          exclude: [
            "sector_id",
            "subsector_id",
            "industry_id",
            "subindustry_id",
            "share_registery_id",
            "createdAt",
            "updatedAt",
            "deletedAt",
          ],
        },
        include: [
          {
            model: model.m_sector,
            as: "sector",
            attributes: ["id", "name"],
          },
          {
            model: model.m_sub_sector,
            as: "subsector",
            attributes: ["id", "name"],
          },
          {
            model: model.m_industries,
            as: "industry",
            attributes: ["id", "name"],
          },
          {
            model: model.m_sub_industries,
            as: "subindustry",
            attributes: ["id", "name"],
          },
        ],
        raw: true,
        nest: true,
      });

      if (!company) {
        throw {
          errors: [{ message: "Company not found" }],
        };
      }

      const [managements, shareholders, subsidiaries] = await Promise.all([
        model.m_company_managements.findAll({
          where: { company_id: company.id },
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          raw: true,
        }),
        model.m_shareholder.findAll({
          where: { company_id: company.id },
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          raw: true,
        }),
        model.m_company_subsidiary.findAll({
          where: { company_id: company.id },
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          raw: true,
        }),
      ]);

      resolve({ ...company, managements, shareholders, subsidiaries });
    } catch (error) {
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};

exports.findManagements = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset, company_id } = params;

      if (!company_id && typeof company_id === "number") {
        throw {
          errors: [{ message: "Required company_id" }],
        };
      }

      const find = await model.m_company_managements.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        where: {
          company_id,
        },
        attributes: {
          exclude: ["company_id", "createdAt", "updatedAt", "deletedAt"],
        },
      });

      resolve(find);
    } catch (error) {
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};

exports.findShareholders = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset, company_id } = params;

      if (!company_id && typeof company_id === "number") {
        throw {
          errors: [{ message: "Required company_id" }],
        };
      }

      const find = await model.m_shareholder.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        where: { company_id },
        attributes: {
          exclude: ["company_id", "createdAt", "updatedAt", "deletedAt"],
        },
      });

      resolve(find);
    } catch (error) {
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};

exports.findSubsidiaries = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset, company_id } = params;

      if (!company_id && typeof company_id === "number") {
        throw {
          errors: [{ message: "Required company_id" }],
        };
      }

      const find = await model.m_company_subsidiary.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        where: { company_id },
        attributes: {
          exclude: ["company_id", "createdAt", "updatedAt", "deletedAt"],
        },
      });

      resolve(find);
    } catch (error) {
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};
