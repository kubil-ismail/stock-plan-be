const model = require("../../models");
const { fn, col, where } = require("sequelize");

exports.findOneUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const find = await model.m_user.findOne({
        where: where(fn("lower", col("email")), email.toLowerCase()),
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

exports.findOneUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const find = await model.m_user.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password", "deletedAt", "createdAt", "updatedAt"],
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

exports.createNewUser = async (props) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { fullname, email, password } = props;

      const create = await model.m_user.create({
        fullname,
        email,
        password,
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
