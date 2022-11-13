const express = require("express");
const phieumuon = require("../controllers/phieumuon.controller");
const router = express.Router();

router.route("/")
    .get(phieumuon.getAllPhieu)
    .post(phieumuon.create)
    
router.route("/:id")
    .get(phieumuon.getId)
    .put(phieumuon.update);

router.route("/QLPM")
    .post(phieumuon.getAllPhieuMuonByName);
module.exports = router;
