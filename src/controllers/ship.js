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

exports.getAllShipment = async (req, res, next) => {
    const working_shipment_ids = [191686343, 193234428, 193234500, 193234599, 193235366, 193235441, 193235510, 193260621, 193264210, 197340105]
    let shipmentURLs = working_shipment_ids.map(shipmentId => `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`)
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0OTc2MDIsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ5ODY1OTI2LCJleHAiOjE2NTA3Mjk5MjYsIm5iZiI6MTY0OTg2NTkyNiwianRpIjoiZHVaSXZlQXNBdEQ1UEx6QiJ9.uh149MxEnC-Nj4xMRhS-8LYBUI-V0KC1akTi6yvcVkM";
    const fetchUrl = (url, token) => {
        var config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };
        return axios(config)
            .then(function (response) {
                return {
                    success: true,
                    data: response.data,
                };
            })
            .catch(function (error) {
                res.status(403)
            });
    }
    const promiseArray = shipmentURLs.map((url) => fetchUrl(url, token));
    const resArray = Promise.all(promiseArray).then((response) => {
        // console.log(response)
        return response
    })
    return resArray;
}

exports.getAllShipmentLocation = (req, res, next) => {
    const locations = ['Central Delhi', 'pitampura', 'mumbai', 'Qutub minar', 'taj mahal', 'india gate', 'South-ex Delhi', 'anand vihar', 'bangalore', 'lucknow']
    let locationUrls = locations.map(location => `http://api.radar.io/v1/geocode/forward?query=${location}`)
    const fetchUrl = (url) => {
        var config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': 'prj_live_sk_9493aeeb5ed665c75c611da2dc7379d296dea19d'
            }
        };
        return axios(config)
            .then(function (response) {
                return {
                    success: true,
                    data: response.data
                }
            })
            .catch(function (error) {
                res.status(403)
            });
    }
    const promiseArray = locationUrls.map((url) => fetchUrl(url));
    const latlangArray = Promise.all(promiseArray).then((response) => {
        return response;
    })
    return latlangArray;
}

exports.getAllOrdersById = (req, res, next) => {
    const orderIDs = [192165293, 193715700, 193715772, 193715871, 193716639, 193716713, 193716783, 193741912, 193745506, 197828898]
    const orderURLs = orderIDs.map(orderId => `https://apiv2.shiprocket.in/v1/external/orders/show/${orderId}`)
    let token = req.headers.authorization.split(" ")[1] || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0OTc2MDIsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ5ODY1OTI2LCJleHAiOjE2NTA3Mjk5MjYsIm5iZiI6MTY0OTg2NTkyNiwianRpIjoiZHVaSXZlQXNBdEQ1UEx6QiJ9.uh149MxEnC-Nj4xMRhS-8LYBUI-V0KC1akTi6yvcVkM";
    const fetchUrl = (url, token) => {
        var config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        return axios(config)
            .then(function (response) {
                return {
                    success: true,
                    data: response.data
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const promiseArray = orderURLs.map((url) => fetchUrl(url, token));
    Promise.all(promiseArray).then((response) => {
        return res.send(response);
    })
} 
