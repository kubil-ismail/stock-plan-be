const express = require("express");
const controller = require("./controller");
const authentication = require("../../utils/authentication");

const router = express.Router();

router.get("/setup", authentication, controller.getSetup);
router.get("/setup/list", authentication, controller.getListSetup);
router.get("/setup/:id", authentication, controller.getSetupDetail);
router.get("/plan", authentication, controller.getPlan);
router.get("/plan/:id", authentication, controller.getPlanDetail);

router.post("/setup", authentication, controller.addNewSetup);
router.post("/plan", authentication, controller.addNewPlan);

router.patch("/setup/:id", authentication, controller.updateSetup);

router.delete("/setup/:id", authentication, controller.deleteSetup);
router.delete("/plan/:id", authentication, controller.deletePlan);

module.exports = router;
