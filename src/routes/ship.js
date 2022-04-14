const express = require("express");
const router = express.Router();

// Controllers
const {
    registerShip,
    getAllOrders,
    getTrackingDetails,
    getlatlang,
    getAllShipment,
    getAllShipmentLocation,
    getAllOrdersById
} = require("../controllers/ship");

router.route("/login").post(registerShip);
router.route("/getOrders").post(getAllOrders);
router.route("/getShiptrack").get(getTrackingDetails);
router.route("/getlatlang").post(getlatlang);
router.route("/getAllShipment").get(getAllShipment);
router.route('/getAllLatLang').get(getAllShipmentLocation);
router.route('/getAllOrdersById').get(getAllOrdersById);

module.exports = router;