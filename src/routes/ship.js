const express = require("express");
const router = express.Router();

// Controllers
const {
    registerShip,
    getAllOrders
} = require("../controllers/ship");

router.route("/login").post(registerShip);
router.route("/getOrders").post(getAllOrders);

module.exports = router;