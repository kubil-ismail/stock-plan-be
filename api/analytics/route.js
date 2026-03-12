const express = require("express");
const controller = require("./controller");
const authentication = require("../../utils/authentication");

const router = express.Router();

router.get(
  "/shareholders/related",
  authentication,
  controller.getShareholdersRelated
);
router.get(
  "/subsidiaries/related",
  authentication,
  controller.getSubsidiariesRelated
);
router.get(
  "/management/related",
  authentication,
  controller.getManagementRelated
);
router.get(
  "/company-relationships",
  authentication,
  controller.getCompanyRelationships
);

module.exports = router;
