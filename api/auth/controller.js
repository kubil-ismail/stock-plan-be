const service = require("./service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { decodeToken } = require("../../utils/helper");

const bcryptSalt = bcrypt.genSaltSync(10);

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const check = await service.findOneUserByEmail(email);

    if (!check) {
      throw {
        code: 400,
        message: "Email not registered",
      };
    }

    const compare = bcrypt.compareSync(password, check?.dataValues?.password);

    if (!compare) throw { code: 422, message: "Wrong password" };

    const {
      password: pass,
      deletedAt,
      createdAt,
      updatedAt,
      ...result
    } = check?.dataValues ?? {};

    const token = jwt.sign(result, process.env.APP_SECRET_KEY);

    res.json({
      status: true,
      message: "success",
      data: { user: result, token },
    });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    const findUser = await service.findOneUserByEmail(email);

    if (findUser) {
      throw {
        code: 400,
        message: "Email already registered",
      };
    }

    const hashPassword = bcrypt.hashSync(password, bcryptSalt);
    const create = await service.createNewUser({
      fullname,
      email: email.toLowerCase(),
      password: hashPassword,
    });

    const {
      password: pass,
      deletedAt,
      createdAt,
      updatedAt,
      ...result
    } = create?.dataValues ?? {};

    const token = jwt.sign(result, process.env.APP_SECRET_KEY);

    res.json({ status: true, message: "Success", data: { token } });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.profile = async (req, res, next) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    const findUser = await service.findOneUserById(auth.id);

    res.json({ status: true, message: "Success", data: findUser });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};
