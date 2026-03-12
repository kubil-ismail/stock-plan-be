const model = require("../../models");

exports.findSector = async (params) => {
  try {
    const { limit, offset } = params;

    const find = await model.m_sector.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
      attributes: [
        "id",
        "name",
        [
          model.sequelize.fn("COUNT", model.sequelize.col("companies.id")),
          "total_companies",
        ],
      ],
      include: [
        {
          model: model.m_companies,
          as: "companies",
          attributes: [],
          required: false,
        },
      ],
      group: ["m_sector.id"],
      subQuery: false,
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
