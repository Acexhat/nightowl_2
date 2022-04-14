import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Map from '../components/mapWrapper';
import Paper from '@mui/material/Paper';
import TimeLineComp from '../components/CustomHorizontalTimline';
import { Divider } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import Button from '@mui/material/Button';
import { getDate, getMonthName, getDayName } from '../utils/dateformatter';
import { fontWeight, height } from '@mui/system';

const useStyles = makeStyles({
    root: {
        height: "98%",
        width: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    leftContainer: {
        width: "35%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    lc_up: {
        height: "65%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    lc_down: {
        height: "35%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    rightContainer: {
        width: "65%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    rc_up: {
        height: "70%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    rc_down: {
        height: "30%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
        borderRadius: "4px",
        backgroundColor: "#FFF",
        height: "95%",
        width: "98%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    header: {
        height: "15%",
        width: "100%",
        display: "flex",
        marginLeft: "0.5rem",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start"
    },
    content: {
        height: "85%",
        width: "100%",
    },
    timelineContent: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        width: "100%",
        overflow: "auto",
    },
    headerText: {
        // fontSize: "1.1rem",
        fontWeight: "750",
        color: "grey",
    },
    orderStatus: {
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

    },
    orderStatus_content: {
        height: "65%",
        width: "100%",
        display: "flex",
    },
    orderStatus_content_left: {
        width: "60%",
        paddingLeft: "1.5rem",
        height: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        flexDirection: "column",
        fontSize: "0.9rem",
        fontWeight: "600"
    },
    orderStatus_content_right: {
        width: "30%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        fontSize: "5rem",
        fontWeight: "600",
        color: "#39B755",
        flexDirection: "column"
    },
    th: {
        marginRight: "0.85rem",
        height: "80%",
        width: "100%",
        display: 'flex',
        justifyContent: "flex-end",
    },
    lastStatusDate: {
        fontSize: "14px",
        color: "#000",
        fontWeight: "500",
        height: "20%",
        display: "flex",
        justifyContent: "flex-end",
        width: "95%"
    },
    calldiv: {
        height: "35%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    call_content: {
        height: "100%",
        width: "49%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#25D366",
        color: "#FFF",
        width: "80%",
        height: "65%"
    },
    orderDetails: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    orderContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        width: "100%",
    },
    orderDetails_keys: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
        width: "50%",
        color: "grey",
        fontSize: "14px",
        fontWeight: "500",
        paddingLeft: "1rem",
    },
    orderDetails_values: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "100%",
        width: "50%",
        flexDirection: "column",
        fontSize: "12px",
        fontWeight: "600",
    },
    addresses: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        height: "40%",
    },
    shipAddress: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "95%",
        alignItems: "flex-start",
        width: "48%",
        padding: "1rem 0px 0px 1rem"
    },
    paragraph: {
        textAlign: "left",
        fontSize: "12px",
        color: "grey",
        fontWeight: "600"
    },
    billAddress: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "48%",
        height: "95%",
        padding: "1rem 0px 0px 0px"
    },
    add_header_text: {
        fontSize: "14px",
        color: "black",
        fontWeight: "600",
        height: "10%",
    }

});

export default function InfoDashboard(props) {

    const classes = useStyles();

    const getSubStr = (str) => {
        const sub = str.substring(0, 30);
        return sub;
    }
    const handleCall = () => {
        window.location.href = `tel:5555551234`;
    }

    return (
        <div className={classes.root}>
            <div className={classes.leftContainer}>
                <div className={classes.lc_up}>
                    <div className={classes.card}>
                        <div className={classes.header}>
                            <span className={classes.headerText}>Order Details</span>
                            <Divider style={{
                                width: "98%",
                            }} />
                        </div>
                        <div className={classes.content}>
                            <div className={classes.orderDetails}>
                                <div className={classes.orderContent}>
                                    <div className={classes.orderDetails_keys}>
                                        <span>Order Id :</span>
                                        <span>Product Id :</span>
                                        <span>Product name :</span>
                                        <span>Product price : </span>
                                        <span>Payment method :</span>
                                        <span>Payment status :</span>
                                        <span>Pickup Boy Name :</span>
                                        <span>Pickup Boy Contact :</span>
                                    </div>
                                    <div className={classes.orderDetails_values}>
                                        <span>{props.state?.id}</span>
                                        <span>{props.state?.products[0].product_id}</span>
                                        <span>{props.state?.products[0].name}</span>
                                        <span> {props.state?.products[0].product_cost}</span>
                                        <span>{props.state?.payment_method || "N/A"}</span>
                                        <span>{props.state?.payment_status || "N/A"}</span>
                                        <span>{props.state?.pickup_boy_name || "N/A"}</span>
                                        <span> {props.state?.pickup_boy_contact_no || "N/A"}</span>
                                    </div>
                                </div>
                                <div className={classes.addresses}>
                                    <div className={classes.shipAddress}>
                                        <span className={classes.add_header_text}>Pick Up Address:</span>
                                        <p className={classes.paragraph}>
                                            {props.state?.pickup_address_detail?.name},{props.state?.pickup_address_detail?.phone}<br />
                                            {props.state?.pickup_address_detail?.email}<br />
                                            {props.state?.pickup_address_detail?.address.length > 30 ? getSubStr(props.state?.pickup_address_detail?.address) : props.state?.pickup_address_detail?.address}<br />
                                            {props.state?.pickup_address_detail?.city}-{props.state?.pickup_address_detail?.pin_code}<br />
                                            {props.state?.pickup_address_detail?.state}
                                        </p>
                                    </div>
                                    <div className={classes.billAddress}>
                                        <span className={classes.add_header_text}>Customer Address:</span>
                                        <p className={classes.paragraph}>
                                            {props.state?.customer_name},{props.state?.customer_phone}<br />
                                            {props.state?.customer_email}<br />
                                            {props.state?.customer_address}<br />
                                            {props.state?.customer_city}-{props.state?.customer_pincode}<br />
                                            {props.state?.customer_state}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.lc_down}>
                    <div className={classes.card}>
                        <div className={classes.header}>
                            <span className={classes.headerText}>Order Status</span>
                            <Divider style={{
                                width: "98%",
                            }} />
                        </div>
                        <div className={classes.content}>
                            <div className={classes.orderStatus}>
                                <div className={classes.orderStatus_content}>
                                    <div className={classes.orderStatus_content_left}>
                                        <span>
                                            Shipment ID: {props.trackingData?.shipment_track && props.trackingData?.shipment_track ? props.trackingData?.shipment_track[0]?.id : null}
                                        </span>
                                        <span style={{
                                            fontSize: "2rem",
                                            color: "#46237A"
                                        }}>
                                            {props.trackingData?.shipment_track && props.trackingData?.shipment_track ? props.trackingData?.shipment_track[0]?.current_status : null}
                                        </span>
                                        <span>
                                            {props.trackingData?.shipment_track && props.trackingData?.shipment_track ? props.trackingData?.shipment_track[0]?.destination : null}
                                        </span>
                                    </div>
                                    <div className={classes.orderStatus_content_right}>
                                        <div className={classes.th}>{props.trackingData?.shipment_track && props.trackingData?.shipment_track ? getDate(props.trackingData?.shipment_track[0]?.delivered_date) : null}
                                        </div>
                                        <div className={classes.lastStatusDate}>{props.trackingData?.shipment_track && props.trackingData?.shipment_track ? `${getMonthName(props.trackingData?.shipment_track[0]?.delivered_date)} , ${getDayName(props.trackingData?.shipment_track[0]?.delivered_date)}` : null}</div>
                                    </div>
                                </div>
                                <div className={classes.calldiv}>
                                    <div className={classes.call_content}>
                                        <Button onClick={() => handleCall()} variant="contained" className={classes.btn} startIcon={<CallIcon />}>
                                            Delivery
                                        </Button>
                                    </div>
                                    <Divider style={{
                                        height: "70%",
                                        width: "1.5px",
                                        backgroundColor: "grey"
                                    }} />
                                    <div className={classes.call_content}>
                                        <Button onClick={() => handleCall()} variant="contained" className={classes.btn} startIcon={<CallIcon />}>
                                            Buyer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.rightContainer}>
                <div className={classes.rc_up}>
                    <div className={classes.card}>
                        <Map address={props.address} data={props.state} />
                    </div>
                </div>
                <div className={classes.rc_down}>
                    <div className={classes.card}>
                        <div className={classes.header}>
                            <span className={classes.headerText}>Delivery Timeline</span>
                            <Divider style={{
                                width: "98%",
                            }} />
                        </div>
                        <div className={classes.content}>
                            <div className={classes.timelineContent}>
                                <TimeLineComp data={props?.trackingData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}