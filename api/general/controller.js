const service = require("./service");
const { paginationOption } = require("../../utils/helper");

exports.getAllSector = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findSector({
      page,
      limit,
      offset,
      search: req.query?.search,
    });

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

exports.getAllSubSector = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findSubSector({ page, limit, offset });

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

exports.getAllIndustries = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findIndustries({ page, limit, offset });

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

exports.getAllSubIndustries = async (req, res, next) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findSubIndustries({ page, limit, offset });

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

exports.getAllShareRegistery = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findShareRegistery({ page, limit, offset });

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

exports.getAllMarketIndex = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);
    const find = await service.findMarketIndex({ page, limit, offset });

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

exports.getDetailMarketIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const search = req.query.search;

    const { page, limit, offset } = paginationOption(req);
    const find = await service.findMarketIndexbyCode({
      page,
      limit,
      offset,
      id,
      search,
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
