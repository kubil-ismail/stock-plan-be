const express = require("express");
const controller = require("./controller");
const authentication = require("../../utils/authentication");

const router = express.Router();

router.get("/profile", authentication, controller.profile);
router.post("/login", controller.login);
router.post("/register", controller.register);

module.exports = router;
