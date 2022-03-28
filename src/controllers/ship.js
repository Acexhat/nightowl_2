const ErrorResponse = require("../utils/errorResponse");
const axios = require('axios');
exports.registerShip = async (req, res, next) => {
    var data = JSON.stringify({
        "email": "ashish.kataria+hackathon@shiprocket.com",
        "password": "hackathon@2022"
    });
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
    // const { token, pageNo } = req.body
    let pageNo = 1;
    let token = req.headers.authorization.split(" ")[1];
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
    // const { token, shipmentId } = req.body
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
    let { address } = req.body
    var config = {
        method: 'get',
        url: `http://api.positionstack.com/v1/forward?access_key=6098b9f368efb6feed8c1db1b5fd1c5c&query=${address}`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(response.data.data[0]);
            let results = {
                lat: response.data.data[0].latitude,
                lng: response.data.data[0].longitude
            }
            req.status(200).json({
                success: true,
                data: results
            })
        })
        .catch(function (error) {
            res.status(403)
        });
}