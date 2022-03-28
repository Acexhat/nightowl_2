const ErrorResponse = require("../utils/errorResponse");
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