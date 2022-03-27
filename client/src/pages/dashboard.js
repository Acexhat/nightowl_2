import * as React from 'react';
import axios from 'axios'
export default function Dashboard(props) {

    const [userData, setUserData] = React.useState();

    React.useEffect(() => {
        // Get authenticated with shiprocket
        var data = JSON.stringify({
            "email": "ashish.kataria+hackathon@shiprocket.com",
            "password": "hackathon@2022"
        });

        var config = {
            method: 'post',
            url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setUserData(response.data);
                localStorage.setItem('ship_token', response.data.token);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    return (
        <div>

        </div>
    );
}