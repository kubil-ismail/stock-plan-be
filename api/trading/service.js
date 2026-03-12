const model = require("../../models");
const { Op, where, cast, col } = require("sequelize");
const { isNumericPositive, getNextSort } = require("../../utils/helper");

exports.findSetup = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset, createdBy, search } = params;

      const find = await model.m_trading_setup.findAndCountAll({
        limit,
        offset,
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "createdBy"],
        },
        where: {
          createdBy,
          name: { [Op.iLike]: `%${search}%` },
        },
        order: [["id", "DESC"]],
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

exports.findListSetup = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { createdBy } = params;

      const find = await model.m_trading_setup.findAll({
        attributes: ["id", "name", "setup_slug", "script"],
        where: {
          createdBy,
        },
        order: [["id", "DESC"]],
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

exports.findPlan = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset, createdBy, search, sort } = params;
      const parseSort = getNextSort(sort);

      const find = await model.m_trading_plan.findAndCountAll({
        limit,
        offset,
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "createdBy"],
        },
        order: [parseSort],
        include: [
          {
            model: model.m_trading_setup,
            attributes: ["name", "setup_slug"],
            required: true,
          },
        ],
        where: {
          createdBy,
          [Op.or]: [
            { ticker: { [Op.iLike]: `%${search}%` } },
            { setup: { [Op.iLike]: `%${search}%` } },
          ],
        },
      });

      resolve(find);
    } catch (error) {
      console.log(error);

      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};

exports.findOneSetup = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, createdBy } = params;

      let filter = {};

      if (isNumericPositive(id)) {
        filter.id = parseInt(id);
      } else {
        filter.setup_slug = id;
      }

      const find = await model.m_trading_setup.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "createdBy"],
        },
        include: [
          {
            model: model.m_user,
            as: "user",
            attributes: ["fullname"],
            required: true,
          },
        ],
        where: {
          ...filter,
          createdBy,
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

exports.findOnePlan = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, createdBy } = params;

      let filter = {};

      if (isNumericPositive(id)) {
        filter.id = parseInt(id);
      } else {
        filter.setup_slug = id;
      }

      const find = await model.m_trading_plan.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "createdBy"],
        },
        where: {
          ...filter,
          createdBy,
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

exports.addSetup = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, timeframe, description, script, createdBy } = params;

      const setup_slug = `${createdBy}_${name
        ?.toUpperCase()
        .split(" ")
        .join("_")}`;

      const create = await model.m_trading_setup.create({
        setup_slug,
        name,
        timeframe,
        description,
        script,
        createdBy,
      });

      resolve(create);
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

exports.addPlan = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        entry_date,
        ticker,
        setup,
        entry_price,
        entry_reason,
        risk_note,
        psychology,
        script,
        createdBy,
      } = params;

      const create = await model.m_trading_plan.create({
        entry_date,
        ticker,
        setup,
        entry_price,
        entry_reason,
        risk_note,
        psychology,
        script,
        createdBy,
      });

      resolve(create);
    } catch (error) {
      console.log(error);
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};

exports.updateSetup = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, name, timeframe, description, script, createdBy } = params;

      const setup_slug = `${createdBy}_${name
        ?.toUpperCase()
        .split(" ")
        .join("_")}`;

      const update = await model.m_trading_setup.update(
        {
          setup_slug,
          name,
          timeframe,
          description,
          script,
        },
        { where: { id, createdBy } }
      );

      resolve(update);
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

exports.deletePlan = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, createdBy } = params;

      const deleted = await model.m_trading_plan.destroy({
        where: {
          id,
          createdBy,
        },
        force: true,
      });

      resolve(deleted);
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

exports.deleteSetup = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, createdBy } = params;

      const deleted = await model.m_trading_setup.destroy({
        where: {
          id,
          createdBy,
        },
        force: true,
      });

      resolve(deleted);
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
