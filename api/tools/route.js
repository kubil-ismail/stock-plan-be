const express = require("express");
const controller = require("./controller");
const authentication = require("../../utils/authentication");

const router = express.Router();

router.get("/entry-plan", authentication, controller.getEntryPlan);

module.exports = router;
