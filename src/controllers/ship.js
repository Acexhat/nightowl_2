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
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0OTc2MDIsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4NDEyNTc0LCJleHAiOjE2NDkyNzY1NzQsIm5iZiI6MTY0ODQxMjU3NCwianRpIjoiS3F6blVCNmJOQWhmVVpQMyJ9.sJh8K34SgPBNPv0B_5WtGDqh8cPeLcq6ba3QjFRhAAo";
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
    let shipmentId = 191686343;
    let token = localStorage.getItem('ship_token');
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