import React from "react";
import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import { Popper } from "@mui/material";
import { useNavigate } from "react-router";

export const LoginComp = () => {
    const [anchorEl, setAnchorEl] = React.useState();
    const navigate = useNavigate();
    const handleClick = (event) => {
        console.log("clicked")
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <>
            <div >
                <Avatar onClick={handleClick} src={"https://avatars.dicebear.com/api/male/akshatbhskar.png"} style={{
                    height: "3rem",
                    width: "3rem",
                    border: "1px solid #FFFFFF",
                    boxShadow: "0px 0px 5px #FFFFFF",
                    cursor: "pointer"
                }}></Avatar>
            </div>
            <Popper style={{
                zIndex: "1000",
                height: "10rem",
                width: "10rem",
                boxShadow: "0px 10px 15px grey",
                borderRadius: "0.75rem",
                // marginTop:"0.5rem",
                backgroundColor: "#FFF"
            }} id={id} open={open} anchorEl={anchorEl}>
                <span style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30%",
                    width: "100%",
                    fontSize: "1rem",
                    fontWeight: "800",
                    color: "black"
                }}>
                    Welcome, User
                </span>
                <span style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "14px",
                    height: "50%",
                    width: "100%",
                    color: "red",
                    fontWeight: "700",
                }}>
                    <Button style={{
                        backgroundColor: "#B23B3B",
                        color: "#FFF",
                        width: "70%",
                        height: "50%",
                        borderRadius:"4px"
                    }} variant="contained" onClick={() => handleLogOut()}>Log-out</Button>

                </span>
            </Popper>
        </>
    )
}