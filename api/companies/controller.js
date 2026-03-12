const service = require("./service");
const { paginationOption } = require("../../utils/helper");

exports.getAllCompanies = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findCompanies({ page, limit, offset });

    res.json({
      status: true,
      message: "success",
      data: find.rows,
      options: {
        page,
        limit,
        total: find?.count,
      },
    });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.getAllListCompanies = async (req, res) => {
  try {
    const find = await service.findListCompanies();

    res.json({
      status: true,
      message: "success",
      data: find,
    });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.getOneCompanies = async (req, res) => {
  try {
    const { company_id } = req.params;

    const find = await service.findOneCompanies(company_id);

    res.json({
      status: true,
      message: "success",
      data: find,
    });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.getAllManagements = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findManagements({
      page,
      limit,
      offset,
      company_id: req.params?.company_id,
    });

    res.json({
      status: true,
      message: "success",
      data: find?.rows,
      options: {
        page,
        limit,
        total: find?.count,
      },
    });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.getAllShareholders = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findShareholders({
      page,
      limit,
      offset,
      company_id: req.params?.company_id,
    });

    res.json({
      status: true,
      message: "success",
      data: find?.rows,
      options: {
        page,
        limit,
        total: find?.count,
      },
    });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.getAllSubsidiaries = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findSubsidiaries({
      page,
      limit,
      offset,
      company_id: req.params?.company_id,
    });

    res.json({
      status: true,
      message: "success",
      data: find?.rows,
      options: {
        page,
        limit,
        total: find?.count,
      },
    });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};
