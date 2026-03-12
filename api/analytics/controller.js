const service = require("./service");

exports.getShareholdersRelated = async (req, res) => {
  try {
    const find = await service.findShareholderRelated({
      shareholder_name: req.query.shareholder_name,
      ticker: req.query.ticker,
    });

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

exports.getSubsidiariesRelated = async (req, res) => {
  try {
    const find = await service.findSubsidiariesRelated({
      subsidiary_name: req.query.subsidiary_name,
      ticker: req.query.ticker,
    });

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

exports.getManagementRelated = async (req, res) => {
  try {
    const find = await service.findManagementRelated({
      management_name: req.query.management_name,
      ticker: req.query.ticker,
    });

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

exports.getCompanyRelationships = async (req, res) => {
  try {
    const [subsidiaries, managements, shareholders] = await Promise.all([
      service.findSubsidiariesRelated({
        ticker: req.query.ticker,
      }),
      service.findManagementRelated({
        ticker: req.query.ticker,
      }),
      service.findShareholderRelated({
        ticker: req.query.ticker,
      }),
    ]);

    res.json({
      status: true,
      message: "success",
      data: {
        related_subsidiaries: {
          total: subsidiaries.length,
          data: subsidiaries,
        },
        related_managements: {
          total: managements.length,
          data: managements,
        },
        related_shareholders: {
          total: shareholders.length,
          data: shareholders,
        },
      },
    });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};
