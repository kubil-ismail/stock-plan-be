const service = require("./service");
const { decodeToken } = require("../../utils/helper");
const { paginationOption } = require("../../utils/helper");

exports.getSetup = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);

    const auth = decodeToken(req.headers.authorization);
    const find = await service.findSetup({
      page,
      limit,
      offset,
      search: req.query?.search ?? "",
      createdBy: auth?.id,
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
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getListSetup = async (req, res) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    const find = await service.findListSetup({
      createdBy: auth?.id,
    });

    res.json({
      status: true,
      message: "success",
      data: find,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getSetupDetail = async (req, res) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    const find = await service.findOneSetup({
      id: req.params.id,
      createdBy: auth?.id,
    });

    res.json({
      status: true,
      message: "success",
      data: find,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getPlan = async (req, res) => {
  try {
    const { page, limit, offset } = paginationOption(req);

    const auth = decodeToken(req.headers.authorization);
    const find = await service.findPlan({
      page,
      limit,
      offset,
      search: req.query?.search ?? "",
      sort: req.query?.sort,
      createdBy: auth?.id,
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
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getPlanDetail = async (req, res) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    const find = await service.findOnePlan({
      id: req.params.id,
      createdBy: auth?.id,
    });

    res.json({
      status: true,
      message: "success",
      data: find,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getPlanDetail = async (req, res) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    const find = await service.findOneSetup({
      id: req.params.id,
      createdBy: auth?.id,
    });

    res.json({
      status: true,
      message: "success",
      data: find,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.addNewSetup = async (req, res) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    await service.addSetup({ ...req.body, createdBy: auth?.id });

    res.json({
      status: true,
      message: "success",
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.addNewPlan = async (req, res) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    await service.addPlan({ ...req.body, createdBy: auth?.id });

    res.json({
      status: true,
      message: "success",
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateSetup = async (req, res) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    await service.updateSetup({
      ...req.body,
      id: req.params.id,
      createdBy: auth?.id,
    });

    res.json({
      status: true,
      message: "success",
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    await service.deletePlan({ id: req.params.id, createdBy: auth?.id });

    res.json({
      status: true,
      message: "success",
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteSetup = async (req, res) => {
  try {
    const auth = decodeToken(req.headers.authorization);
    await service.deleteSetup({ id: req.params.id, createdBy: auth?.id });

    res.json({
      status: true,
      message: "success",
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      status: false,
      message: error.message,
    });
  }
};
