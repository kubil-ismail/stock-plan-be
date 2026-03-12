const express = require("express");
const controller = require("./controller");
const authentication = require("../../utils/authentication");

const router = express.Router();

router.get("/", authentication, controller.getAllCompanies);
router.get("/list", authentication, controller.getAllListCompanies);
router.get("/:company_id", authentication, controller.getOneCompanies);
router.get(
  "/:company_id/managements",
  authentication,
  controller.getAllManagements
);
router.get(
  "/:company_id/shareholders",
  authentication,
  controller.getAllShareholders
);
router.get(
  "/:company_id/subsidiaries",
  authentication,
  controller.getAllSubsidiaries
);

module.exports = router;
