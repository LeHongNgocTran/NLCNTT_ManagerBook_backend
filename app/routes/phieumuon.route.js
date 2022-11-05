const express = require("express");
const phieumuon = require("../controllers/phieumuon.controller");
const router = express.Router();

router.route("/").get(phieumuon.getAllPhieu);

module.exports = router;
