const express = require("express");
const router = express.Router();

// Controllers
const {
    registerShip
} = require("../controllers/ship");

router.route("/login").post(registerShip);

module.exports = router;