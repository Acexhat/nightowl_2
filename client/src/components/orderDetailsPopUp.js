import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
        minWidth: "80vw"
    },
}))

export default function DetailDialog(props) {
    console.log(props.data);
    const classes = useStyles();
    return (
        <div className="App">
            <Dialog classes={{ paper: classes.dialogPaper }} open={props.open} onClose={props.handlePopUpclose}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    <div style={{
                        display: "flex",
                        paddingLeft: "4rem",
                        border: "1px solid red",
                        border: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <div>Product Name</div>
                            <div>{props.data.products[0].name}</div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <div>Cost</div>
                            <div>{props.data.products[0].price}</div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <div>Customer Name</div>
                            <div>VALUE</div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <div>Customer Contact</div>
                            <div>VALUE</div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <div>Delivery Name</div>
                            <div>VALUE</div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <div>Delivery Contact</div>
                            <div>VALUE</div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
