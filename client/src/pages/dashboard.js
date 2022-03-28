import * as React from 'react';
import axios from 'axios'
import { getShipRocketAuth } from '../services/service';
import { Divider, Typography } from '@mui/material';
import TableDetails from '../components/table';

export default function Dashboard(props) {

    const [userData, setUserData] = React.useState();
    const [ship_token, setShipToken] = React.useState(localStorage.getItem('ship_token'));
    const [allOrders, setAllOrders] = React.useState([]);

    const getAllOrder = (token, pageNo) => {
        var data = JSON.stringify({
            "email": "ashish.kataria+hackathon@shiprocket.com",
            "password": "hackathon@2022"
        });

        var config = {
            method: 'get',
            url: `https://apiv2.shiprocket.in/v1/external/orders?page=${pageNo}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setAllOrders([...allOrders, ...response.data.data])
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    React.useEffect(() => {
        // Get authenticated with shiprocket
        if (!ship_token) {
            setUserData(getShipRocketAuth());
        }
    }, [])

    React.useEffect(() => {
        if (ship_token) {
            getAllOrder(ship_token, 1);
        }
    }, [ship_token])

    const getMoreOrder = (pageNo) => {
        getAllOrder(ship_token, pageNo + 1);
    }

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#EDEDED",
        }}>
            <div style={{
                padding: "0.75rem",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                height: "90%",
                flexDirection: "column"
            }}>
                <Typography variant="h4" style={{
                    fontWeight: "800",
                    width: "65%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "0.5rem",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                    marginBottom: "2rem"

                }}> ORDER TABLE </Typography>
                {allOrders?.length > 0 ? <TableDetails rows={allOrders} getMoreOrder={getMoreOrder} /> : "NO DATA"}
            </div>
        </div>
    );
}