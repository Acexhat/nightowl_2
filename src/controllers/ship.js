const ErrorResponse = require("../utils/errorResponse");
var axios = require('axios');
exports.registerShip = async (req, res, next) => {
    var data = JSON.stringify({
        "email": "ashish.kataria+hackathon@shiprocket.com",
        "password": "hackathon@2022"
    });
    console.log("hitting here", data);
    var config = {
        method: 'post',
        url: `https://apiv2.shiprocket.in/v1/external/auth/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    axios(config)
        .then(function (response) {
            res
                .status(200)
                .json({
                    success: true,
                    data: response.data,
                });
        })
        .catch(function (error) {
            res.status(403)
        });
};

exports.getAllOrders = async (req, res, next) => {
    const { token, pageNo = 1 } = req.body
    var config = {
        method: 'get',
        url: `https://apiv2.shiprocket.in/v1/external/orders?page=${pageNo}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    axios(config)
        .then(function (response) {
            res
                .status(200)
                .json({
                    success: true,
                    data: response.data,
                });
        })
        .catch(function (error) {
            res.status(403)
        });
}

exports.getTrackingDetails = async (req, res, next) => {
    const working_shipment_ids = [191686343, 193234428, 193234500, 193234599, 193235366, 193235441, 193235510, 193260621, 193264210, 197340105]
    let shipmentId = working_shipment_ids[Math.floor(Math.random() * working_shipment_ids.length)];
    let token = req.headers.authorization.split(" ")[1];
    var config = {
        method: 'get',
        url: `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };

    axios(config)
        .then(function (response) {
            res
                .status(200)
                .json({
                    success: true,
                    data: response.data,
                });
        })
        .catch(function (error) {
            res.status(403)
        });
}

exports.getlatlang = async (req, res, next) => {
    const { address } = req.body;
    console.log(address)
    var config = {
        method: 'get',
        url: `http://api.radar.io/v1/geocode/forward?query=${address}`,
        headers: {
            'Authorization': 'prj_live_sk_9493aeeb5ed665c75c611da2dc7379d296dea19d'
        }
    };
    axios(config)
        .then(function (response) {
            res.status(200).json({
                success: true,
                data: response.data
            })
        })
        .catch(function (error) {
            res.status(403)
        });
}