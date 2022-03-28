const express = require("express");
const router = express.Router();

// Controllers
const {
    registerShip,
    getAllOrders,
    getTrackingDetails,
    getlatlang
} = require("../controllers/ship");

router.route("/login").post(registerShip);
router.route("/getOrders").get(getAllOrders);
router.route("/getShiptrack").get(getTrackingDetails);
router.route("/getlatlang").post(getlatlang);

module.exports = router;