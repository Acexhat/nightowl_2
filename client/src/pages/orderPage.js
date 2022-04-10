import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Map from '../components/mapWrapper'
import { Button } from '@mui/material';
import { Divider, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import logo from '../assets/logo.webp';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

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
                "token": token,
                "shipmentId": shipmentId
            });
            var config = {
                method: 'get',
                url: `http://localhost:5000/api/ship/getShiptrack`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setTrackingData(response.data.data.tracking_data);
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
            <div style={{
                // padding: "0rem 0.75rem",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                flexDirection: "column"
            }}>
                <div style={{
                    height: "10%",
                    width: "100%",
                    backgroundColor: "#388F81",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    // position: "relative",
                }}>
                    <picture>
                        <source srcset={logo} type="image/webp" />
                        <img style={{
                            height: "3.5rem",
                            // position: "absolute",
                            left: "1.5rem",
                            top: "0.5rem",
                        }} src={logo} alt="logo" />
                    </picture>
                    <Typography variant="h4" style={{
                        fontWeight: "700",
                        color: "#fff",
                        marginLeft:"27.5rem"
                    }}> Order Details and Real Time Tracking </Typography>
                </div>
                <div style={{
                    display: "flex",
                    width: "100%",
                    height: "90%"
                }}>
                    <div style={{
                        width: "20%",
                        height: "100%",
                    }}>
                        <div style={{
                            height: "100%",
                            // borderTop: "1px solid #ccc",
                            width: "100%",
                            backgroundColor: "#388F81",
                            // border: "1px solid red",
                        }}>
                            <List>
                                {['Orders', 'Tracking Dashboard'].map((text, index) => (
                                    <div style={{
                                        display: "flex"
                                    }}>
                                        {index % 2 != 0 ? <div style={{
                                            height: "3rem",
                                            width: "5px",
                                            backgroundColor: "white",
                                            borderRadius: "0px 4px 4px 0px"
                                        }}>
                                        </div> : null}
                                        <ListItem style={{
                                            // backgroundColor: "#388F81",
                                            height: "3rem",
                                            color: "#fff",
                                            marginLeft: "1rem",
                                            borderWidth: "90%",
                                            marginBottom: "0.5rem"
                                        }} button key={text}>
                                            <ListItemIcon style={{
                                                color: "#fff",
                                            }}>
                                                {index % 2 === 0 ? <BackupTableIcon /> : <QueryStatsIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    </div>
                                ))}
                            </List>
                        </div>
                    </div>
                    <div style={{
                        width: "80%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgb(41 56 53)",
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}><Map address={trackingData?.shipment_track?.designation || "mumbai"} data={state} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}