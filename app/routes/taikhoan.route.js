const express = require("express");
const account = require("../controllers/taikhoan.controller");
const router = express.Router();

router.route("/")
    .get(account.getAll);

module.exports = router;