import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Map from '../components/mapWrapper'
import { Button } from '@mui/material';
import { Divider, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import logo from '../assets/logo.webp';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Avatar } from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import InfoDashboard from './InfoDashboard';
import { API_PREFIX } from '../utils/Constants';
import { LoginComp } from '../atomic/loginComp';

export default function OrderPage(props) {
    const { id } = useParams();
    const { state } = useLocation();
    console.log('state', state);
    const navigate = useNavigate();
    const [trackingData, setTrackingData] = React.useState([]);

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
                url: `${API_PREFIX}api/ship/getShiptrack`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setTrackingData(response?.data?.data?.tracking_data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getTrackingDetails(localStorage.getItem('ship_token'), randomShipId);
    }, [])

    const handleListItemClick = (data) => {
        if (data === "Orders") {
            navigate('/dashboard');
        }
    }

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#EDEDED",
            display: "flex"
        }}>
            <div style={{
                width: "15%",
                height: "100%",
                background: "linear-gradient( #8A88FF, #EDEDED)"
            }}>
                <div style={{
                    height: "100%",
                    // borderTop: "1px solid #ccc",
                    width: "100%",
                    borderRadius: "0px 2rem 2rem 0px",
                    boxShadow: "0px 10px 20px grey",
                    backgroundColor: "#FFF",
                    // border: "1px solid red",
                }}>
                    <img style={{
                        height: "3.5rem",
                        width: "4rem",
                        display: "flex",
                        padding: "0.5rem"
                    }} src={logo} alt="logo" />
                    <List>
                        {['Orders', 'Tracking Dashboard'].map((text, index) => (
                            <div style={{
                                display: "flex"
                            }}>
                                {index % 2 != 0 ? <div style={{
                                    height: "3rem",
                                    width: "5px",
                                    backgroundColor: "black",
                                    borderRadius: "0px 4px 4px 0px"
                                }}>
                                </div> : null}
                                <ListItem
                                    onClick={() => handleListItemClick(text)}
                                    style={{
                                        height: "3rem",
                                        color: "black",
                                        marginLeft: "1rem",
                                        borderWidth: "90%",
                                        marginBottom: "0.5rem"
                                    }} button key={text}>
                                    <ListItemIcon style={{
                                        color: "black",
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
                display: "flex",
                width: "85%",
                height: "100%",
                flexDirection: "column",
                position: "relative"
            }}>
                <div style={{
                    height: "15%",
                }}>
                    <div style={{
                        height: "100%",
                        width: "100%",
                        background: "linear-gradient(to right, #8A88FF, #34C9FE)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}>
                        <Typography variant="h4" style={{
                            fontWeight: "700",
                            width: "22%",
                            paddingTop: "2.25rem",
                            fontSize: "1.5rem",
                            color: "#FBFBFF",
                        }}> Tracking Dashboard {id} </Typography>
                        <div className="avatarContainer">
                            <LoginComp />
                        </div>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "92%",
                    width: "100%",
                    position: "absolute",
                    top: "7.5%",
                }}>
                    <InfoDashboard address={trackingData?.shipment_track?.designation || "mumbai"} state={state} trackingData={trackingData} />
                </div>
            </div>
            {/* </div> */}
        </div >
    );
}