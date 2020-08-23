import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';

export default function DetailsCartItem(props) {
    return(
        <div className="cart-item-main">
            <Grid item xs={1} lg={1}>
                <Typography>
                    {props.cartItem.type === "VEG" ?
                    <i className="fa fa-stop-circle-o item-veg" aria-hidden="true"/>
                        : <i className="fa fa-stop-circle-o item-nonveg" aria-hidden="true"/>
                    }
                </Typography>
            </Grid>
            <Grid item xs={5} lg={5}>
                <Typography variant="body1" className="item-name"> {props.cartItem.name} </Typography>
            </Grid>
            <Grid item xs={1} lg={1} className="citem-remove">
                <IconButton value={props.cartItem}
                            onClick={props.handleRemoveCartItem.bind(this, props.cartItem)}> <RemoveIcon/> </IconButton>
            </Grid>
            <Grid item xs={1} lg={1} className="citem-quantity">
                <Typography> {props.cartItem.quantity} </Typography>
            </Grid>
            <Grid item xs={1} lg={1} className="citem-add">
                <IconButton value={props.cartItem}
                            onClick={props.handleAddCartItem.bind(this, props.cartItem)}> <AddIcon/> </IconButton>
            </Grid>
            <Grid item xs={1} lg={1}/>
            <Grid item xs={2} lg={2}>
                <Typography variant="body1"> <i className="fa fa-inr" aria-hidden="true"/> {props.cartItem.price} </Typography>
            </Grid>
        </div>
    )
}