const express = require("express");
const phieugiahan = require("../controllers/giahan.controller");
const router = express.Router();

router
  .route("/")
  .get(phieugiahan.getAllPhieuGiaHan)
  .post(phieugiahan.createPhieuGiaHan);

router.route("/:id")
   .get(phieugiahan.getInforById);

router.route("/details")
   .post(phieugiahan.getInforDetails);
module.exports = router;
