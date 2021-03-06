import * as React from 'react';
import axios from 'axios'
import { Divider, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import TableDetails from '../components/table';
import logo from '../assets/logo.webp';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Avatar } from '@mui/material';
import './styles.css';
import { API_PREFIX } from '../utils/Constants';
import { LoginComp } from '../atomic/loginComp';
import MapIcon from '@mui/icons-material/Map';
import { useDispatch, useSelector } from 'react-redux'
import { setAllOrders, setCurrPage } from '../store/Actions/actions';
import LiveMap from '../components/livemap/liveMap';

export default function Dashboard(props) {

    const [userData, setUserData] = React.useState();
    const [ship_token, setShipToken] = React.useState(localStorage.getItem('ship_token'));
    const [img, setImg] = React.useState();
    const disp = useDispatch();
    const { allOrders, curr_page } = useSelector((state) => state.data);
    const [isMap, setIsMap] = React.useState(false);

    const getAllOrder = (token, pageNo) => {
        // let headersList = {
        //     "Content-Type": "application/json"
        // }

        let bodyContent = {
            "token": token,
            "pageNo": pageNo
        };

        let reqOptions = {
            url: `${API_PREFIX}api/ship/getOrders`,
            method: "post",
            // headers: headersList,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: bodyContent
        }

        axios.request(reqOptions).then(function (response) {
            disp(setAllOrders(response.data.data.data));
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
                    url: `${API_PREFIX}api/ship/login`,
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

        // Get Profile picture
        const getPicture = () => {
            let headersList = {
                "Content-Type": "application/json"
            }

            let reqOptions = {
                url: "https://avatars.dicebear.com/api/human/hdiwhdi238ey2389.svg",
                method: "GET",
                headers: headersList,
            }

            axios.request(reqOptions).then(function (response) {
                setImg(response.data)
            }).catch((err) => {
                console.log(err);
            })
        }

        getPicture();

    }, [])

    React.useEffect(() => {
        if (ship_token) {
            if (allOrders?.length <= 0)
                getAllOrder(ship_token, 1);
            else {
                console.log(allOrders)
            }
        }
    }, [ship_token])

    const getMoreOrder = (pageNo) => {
        console.log(pageNo)
        if (pageNo + 1 <= curr_page) {
            console.log(curr_page)
        } else {
            console.log(curr_page)
            getAllOrder(ship_token, pageNo + 1);
            disp(setCurrPage(curr_page + 1))
            // curr_page.current = curr_page.current + 1;
        }
    }

    const handleListItemClick = (item) => {
        if (item === 'Map Tracking') {
            setIsMap(true);
        } else {
            setIsMap(false);
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
                        {['Orders', 'Map Tracking'].map((text, index) => (
                            <div style={{
                                display: "flex"
                            }}>
                                {index % 2 === 0 ? <div style={{
                                    height: "3rem",
                                    width: "5px",
                                    backgroundColor: "black",
                                    borderRadius: "0px 4px 4px 0px"
                                }}>
                                </div> : null}
                                <ListItem onClick={() => handleListItemClick(text)} style={{
                                    // backgroundColor: "#388F81",
                                    height: "3rem",
                                    color: "black",
                                    marginLeft: "1rem",
                                    borderWidth: "90%",
                                    marginBottom: "0.5rem"
                                }} button key={text}>
                                    <ListItemIcon style={{
                                        color: "black",
                                    }}>
                                        {index % 2 === 0 ? <BackupTableIcon /> : <MapIcon />}
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
                            width: "17.5%",
                            paddingTop: "2.25rem",
                            fontSize: "1.5rem",
                            color: "#FBFBFF",
                        }}> Order Overview </Typography>
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
                    {!isMap ? allOrders?.length > 0 ? <TableDetails style={{
                    }} originalRows={allOrders} getMoreOrder={getMoreOrder} /> : <CircularProgress /> : <div
                        style={{
                            height: "95%",
                            width: "95%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    ><LiveMap /></div>}
                </div>
            </div>
            {/* </div> */}
        </div >
    );
}