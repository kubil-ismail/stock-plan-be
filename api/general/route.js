const express = require("express");
const controller = require("./controller");
const authentication = require("../../utils/authentication");

const router = express.Router();

router.get("/sector", authentication, controller.getAllSector);
router.get("/sub-sector", authentication, controller.getAllSubSector);
router.get("/industries", authentication, controller.getAllIndustries);
router.get("/sub-industries", authentication, controller.getAllSubIndustries);
router.get("/share-registery", authentication, controller.getAllShareRegistery);
router.get("/market-indexes", authentication, controller.getAllMarketIndex);
router.get("/market-indexes/:id", authentication, controller.getDetailMarketIndex);

module.exports = router;
