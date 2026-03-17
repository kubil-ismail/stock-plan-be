const model = require("../../models");

exports.findSector = async (params) => {
  try {
    const { limit, offset, search } = params;

    let filter = {};

    if (search) {
      filter = {
        name: search,
      };
    }

    const find = await model.m_sector.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
      where: filter,
      attributes: [
        "id",
        "name",
        [
          model.sequelize.literal(`(
            SELECT COUNT(id)
            FROM m_companies c
            WHERE c.sector_id = m_sector.id
          )`),
          "total_companies",
        ],
      ],
    });

    return find;
  } catch (error) {
    throw (
      { ...error?.errors?.[0], code: 400 } ?? {
        code: 500,
        message: "Something Wrong in our app",
      }
    );
  }
};

exports.findSubSector = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset } = params;

      const find = await model.m_sub_sector.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        include: [
          {
            model: model.m_sector,
            as: "sector",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            required: true,
          },
        ],
        attributes: {
          exclude: ["sector_id", "createdAt", "updatedAt", "deletedAt"],
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

exports.findIndustries = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset } = params;

      const find = await model.m_industries.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
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

exports.findSubIndustries = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset } = params;

      const find = await model.m_sub_industries.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        include: [
          {
            model: model.m_industries,
            as: "industry",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            required: true,
          },
        ],
        attributes: {
          exclude: ["industries_id", "createdAt", "updatedAt", "deletedAt"],
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

exports.findShareRegistery = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset } = params;

      const find = await model.m_share_registery.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
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

exports.findMarketIndex = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset } = params;

      const find = await model.m_market_indexes.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        attributes: [
          "id",
          "ticker",
          [
            model.sequelize.literal(`(
              SELECT COUNT(id)
              FROM m_company_indexes mci
              WHERE mci.indexes_id = m_market_indexes.id
            )`),
            "total_companies",
          ],
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

exports.findMarketIndexbyCode = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset } = params;

      const find = await model.m_company_indexes.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: model.m_companies,
            as: "company",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            required: true,
          },
          // {
          //   model: model.m_market_indexes,
          //   as: "indexes",
          //   attributes: {
          //     exclude: ["createdAt", "updatedAt", "deletedAt"],
          //   },
          //   required: true,
          // },
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
