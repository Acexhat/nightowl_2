import * as React from 'react';
import axios from 'axios'
import { Divider, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import TableDetails from '../components/table';
import logo from '../assets/logo.webp';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export default function Dashboard(props) {

    const [userData, setUserData] = React.useState();
    const [ship_token, setShipToken] = React.useState(localStorage.getItem('ship_token'));
    const [allOrders, setAllOrders] = React.useState([]);

    const getAllOrder = (token, pageNo) => {
        // let headersList = {
        //     "Content-Type": "application/json"
        // }

        let bodyContent = {
            "token": token,
            "pageNo": pageNo
        };

        let reqOptions = {
            url: "api/ship/getOrders",
            method: "get",
            // headers: headersList,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: bodyContent
        }

        axios.request(reqOptions).then(function (response) {
            setAllOrders([...allOrders, ...response.data.data.data])
        }).catch((err) => {
            console.log(err);
        })

    }

    React.useEffect(() => {
        // Get authenticated with shiprocket
        if (!ship_token) {
            const getShipRocketAuth = () => {
                let headersList = {
                    "Content-Type": "application/json"
                }

                let reqOptions = {
                    url: "api/ship/login",
                    method: "POST",
                    headers: headersList,
                }

                axios.request(reqOptions).then(function (response) {
                    localStorage.setItem('ship_token', response.data.data.token);
                    setShipToken(response.data.data.token)
                }).catch((err) => {
                    console.log(err);
                })
            }
            getShipRocketAuth();
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
                    justifyContent: "flex-start",
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
                        marginLeft:"40rem"
                    }}> Order Overview </Typography>
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
                                        {index % 2 === 0 ? <div style={{
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
                        {allOrders?.length > 0 ? <TableDetails style={{
                        }} originalRows={allOrders} getMoreOrder={getMoreOrder} /> : <CircularProgress />}
                    </div>
                </div>
            </div>
        </div>
    );
}