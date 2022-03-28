import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Map from '../components/mapWrapper'
import { Button } from '@mui/material';

export default function OrderPage(props) {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [trackingData, setTrackingData] = React.useState();

    const working_shipment_ids = [191686343, 193234428, 193234500, 193234599, 193235366, 193235441, 193235510, 193260621, 193264210, 197340105]

    React.useEffect(() => {
        const randomShipId = working_shipment_ids[Math.floor(Math.random() * working_shipment_ids.length)];

        const getTrackingDetails = (token, shipmentId) => {
            var data = JSON.stringify({
                "email": "ashish.kataria+hackathon@shiprocket.com",
                "password": "hackathon@2022"
            });
            var proxy = "https://cors-anywhere.herokuapp.com/";
            var config = {
                method: 'get',
                url: `${proxy}https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setTrackingData(response.data.tracking_data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getTrackingDetails(localStorage.getItem('ship_token'), randomShipId);

    }, [])

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#EDEDED",
        }}>
            WELCOME TO ORDER TRACKING PAGE - {id}
            <br />
            CLICK ON THE MAP TO GET ORDER DETAILS
            <br />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem"
            }}><Map address={trackingData?.shipment_track?.designation || "delhi"} data={state} /></div>
            <Button onClick={() => navigate(-1)} variant="contained" style={{ marginTop: "0.5rem" }}>
                Go Back
            </Button>
        </div>
    );
}