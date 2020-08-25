import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
        cartItemMain: {
        flexDirection: 'row',
        display: 'flex',
        padding: '5px 0'
    },
    itemVeg: {
        color: '#5a9a5a',
    },
    itemNonveg: {
        color: '#be4a47'
    },
    itemName: {
        textTransform: 'capitalize',
        color: 'gray'
    },
    citemQuantity: {
        textAlign: 'center',
    },
    amount: {
        textAlign: 'end !important'
    },
    addRemoveIcon:{
            display: 'flex',
        flexDirection: 'row',
        '& button': {
            padding: '0',
            fontSize: 'small',
            '&:hover': {
                background: '#eacc5d',
            },
        },
        '& p': {
            width: '20px',
        },
    }
});

export default function DetailsCartItem(props) {

    const classes = useStyles();

    return(
        <div className={classes.cartItemMain}>
            <Grid item xs={1} lg={1}>
                <Typography>
                    {props.cartItem.type === "VEG" ?
                    <i className={classes.itemVeg + " fa fa-stop-circle-o"} aria-hidden="true"/>
                        : <i className={classes.itemNonveg + " fa fa-stop-circle-o"} aria-hidden="true"/>
                    }
                </Typography>
            </Grid>
            <Grid item xs={4} lg={6}>
                <Typography variant="body1" className={classes.itemName}> {props.cartItem.name} </Typography>
            </Grid>
            <Grid item xs={3} lg={2} className={classes.citemQuantity}>
                <div className={classes.addRemoveIcon}>
                    {
                        (props.editable) &&
                        <IconButton value={props.cartItem}
                                    onClick={props.handleRemoveCartItem.bind(this, props.cartItem)}> <RemoveIcon/> </IconButton>
                    }
                    <Typography> {props.cartItem.quantity} </Typography>
                    {
                        (props.editable) &&
                        <IconButton value={props.cartItem}
                                    onClick={props.handleAddCartItem.bind(this, props.cartItem)}> <AddIcon/> </IconButton>
                    }
                </div>
            </Grid>
            <Grid item xs={4} lg={3} className={classes.amount}>
                <Typography variant="body1"> <i className="fa fa-inr" aria-hidden="true"/> {(props.cartItem.price).toFixed(2)} </Typography>
            </Grid>
        </div>
    )
}