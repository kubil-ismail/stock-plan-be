const jwt = require("jsonwebtoken");

exports.decodeToken = (authorization) => {
  try {
    const { APP_SECRET_KEY } = process.env;

    const bearer = authorization.slice(6).trim();

    if (!bearer) return {};

    const decoded = jwt.verify(bearer, APP_SECRET_KEY);

    return decoded;
  } catch (error) {
    return {};
  }
};

exports.paginationOption = (params) => {
  const page = parseInt(params?.query?.page) || null;
  const limit = parseInt(params?.query?.limit) || null;
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

exports.isNumericPositive = (value) => {
  return /^\d+$/.test(value);
};

exports.formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Math.round(value));

exports.getNextSort = (field = "id:DESC") => {
  if (!field || field === "undefined") return ["id", "DESC"];
  const [currField, currDir] = field.split(":");

  return [currField, currDir];
};
