const express = require("express");
const phieugiahan = require("../controllers/giahan.controller");
const router = express.Router();

router.route("/")
  .get(phieugiahan.getAllPhieuGiaHan)
  .post(phieugiahan.createPhieuGiaHan);

router.route("/PGH")
   .post(phieugiahan.getInforUser);

router.route("/:id")
   .get(phieugiahan.getInforById)
   .put(phieugiahan.duyetphieu);
 

router.route("/details")
   .post(phieugiahan.getInforDetails);



module.exports = router;
