import axios from 'axios';


export const getShipRocketAuth = () => {
    let headersList = {
        "Content-Type": "application/json"
    }

    let reqOptions = {
        url: "/api/ship/login",
        method: "POST",
        headers: headersList,
    }

    axios.request(reqOptions).then(function (response) {
        localStorage.setItem('ship_token', response.data.data.token)
    }).catch((err) => {
        console.log(err);
    })
}

export const getAllOrder = (token, callback) => {
    var axios = require('axios');
    var data = JSON.stringify({
        "email": "ashish.kataria+hackathon@shiprocket.com",
        "password": "hackathon@2022"
    });

    var config = {
        method: 'get',
        url: 'https://apiv2.shiprocket.in/v1/external/orders',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            callback(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

}

export const getSpecificOrder = (token, orderId) => {
    var axios = require('axios');
    var data = JSON.stringify({
        "email": "ashish.kataria+hackathon@shiprocket.com",
        "password": "hackathon@2022"
    });

    var config = {
        method: 'get',
        url: `https://apiv2.shiprocket.in/v1/external/orders/show/${orderId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}

export const getTrackingDetails = (token, shipmentId) => {
    var data = JSON.stringify({
        "email": "ashish.kataria+hackathon@shiprocket.com",
        "password": "hackathon@2022"
    });

    var config = {
        method: 'get',
        url: `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}