import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/logo.webp';
import './orderdetails.css';

const useStyles = makeStyles(({
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
        minWidth: "80vw",
        backgroundColor: '#388F81',
        color: "#fff"
    },
}))

export default function DetailDialog(props) {
    console.log(props.data);
    const className = useStyles();
    const handleCall = () => {
        window.location.href = `tel:5555551234`;
    }
    return (
        <div className="App">
            <Dialog className={{ paper: className.dialogPaper }} open={props.open} onClose={props.handlePopUpclose}>
                {/* <div className="modalfade" id="modal1"> */}
                <div className={["modal-dialog", "modal-dialog-centered"]}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <h4 className={"modal-title"}>{props?.data?.products[0].name}<br></br>{props.data.products[0].channel_order_product_id}</h4>
                            <div className={"modal-body"}>
                                <div className={"container"}>
                                    <h6>Item Details</h6>
                                    <div className={"row"}>
                                        <div className={"col"}> <img className={"img-fluid"} src="http://i.imgur.com/iItpzRh.jpg" /> </div>
                                        <div className="col-xs-6" style={{ paddingTop: "2vh" }}>
                                            <ul type={"none"}>
                                                <li>Size: 11</li>
                                                <li>Color: Desert Sage</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h6>Order Details</h6>
                                    <div className={"row"}>
                                        <div className={"col-xs-6"}>
                                            <ul type={"none"}>
                                                <li className={"left"}><span className={"boldT"}>Order number:</span> {props.data.id}</li>
                                                <li className={"left"}><span className={"boldT"}>Last Updated:</span>{props.data.updated_at}</li>
                                                <li className={"left"}><span className={"boldT"}>Price:</span>{props.data.products[0].price}</li>
                                                <li className={"left"}><span className={"boldT"}>Shipping:</span>{props.data.customer_address}</li>
                                                <li className={"left"}><span className={"boldT"}>Total Price: </span>{props.data.products[0].price}</li>
                                            </ul>
                                        </div>
                                        {/* <div className={"col-xs-6"}>
                                            <ul className={"right"} type={"none"}>
                                                <li className={"right"}>{props.data.id + props.data.customer_address}</li>
                                            </ul>
                                        </div> */}
                                    </div>
                                    <h6>Shipment</h6>
                                    <div className={"row"} style={{ borderBottom: "none" }}>
                                        <div className={"col-xs-6"}>
                                            <ul type={"none"}>
                                                <li className={"left"}>Estimated arrival</li>
                                            </ul>
                                        </div>
                                        <div className="col-xs-6">
                                            <ul type={"none"}>
                                                <li className={"left"}>{props?.data?.shipments[0] && props?.data?.shipments[0] ? props?.data?.shipments[0]?.delivered_date : props?.data?.shipments?.delivered_date || "Currently Not Available"}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"modal-footer"}> <button type="button" onClick={() => handleCall()} className={"btn"}>Call Delivery Executive</button> </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </Dialog>
        </div>
    );
}
