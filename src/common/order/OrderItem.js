import React from 'react';
import {
    Box,
    Typography,
    IconButton
} from '@material-ui/core';

import {
    Add,
    Remove
} from '@material-ui/icons';

import {
    makeStyles
} from "@material-ui/core/styles";

import "font-awesome/css/font-awesome.css"

const useStyles = makeStyles({
    veg: {
        color: 'green'
    },
    nonVeg: {
        color: 'orangered'
    }
});

export default function OrderItem(props) {
    const classes = useStyles();
    return (
        <Box width="100%" display="flex" flexDirection="row" alignItems="center">
            <Box width="8%" textAlign="left">
                <Typography variant="subtitle2" color="textSecondary">
                    {(props.nonVeg) ? <i className={"fa fa-stop-circle-o " + classes.nonVeg}/> :
                        <i className={"fa fa-stop-circle-o " + classes.veg}/>}
                </Typography>
            </Box>
            <Box width={(props.editable) ? "42%" : "35%"} textAlign="left">
                <Typography variant="subtitle2" color="textSecondary">{props.name}</Typography>
            </Box>
            <Box width={(props.editable) ? "25%" : "32%"} display={(props.editable) ? "flex" : "inline"}
                 flexDirection="row" alignItems="center" textAlign="center">
                {
                    (props.editable) &&
                    <IconButton size="small">
                        <Remove fontSize="small"/>
                    </IconButton>
                }
                <Typography variant="subtitle2" color="textSecondary">{props.quantity}</Typography>
                {
                    (props.editable) &&
                    <IconButton size="small">
                        <Add fontSize="small"/>
                    </IconButton>
                }
            </Box>
            <Box width="25%" textAlign="right">
                <Typography variant="subtitle2" color="textSecondary"><i
                    className="fa fa-inr"/> {Number(props.price).toFixed(2)}</Typography>
            </Box>
        </Box>
    );
}

