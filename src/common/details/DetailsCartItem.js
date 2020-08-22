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
                    {/*{item.item_type === "VEG" ?*/}
                    <i className="fa fa-stop-circle-o item-veg" aria-hidden="true"/>
                        {/*: <i className="fa fa-circle item-nonveg" aria-hidden="true"/>
                    }*/}
                </Typography>
            </Grid>
            <Grid item xs={5} lg={5}>
                <Typography variant="body1" className="item-name"> Rolls </Typography>
            </Grid>
            <Grid item xs={1} lg={1} className="citem-remove">
                <IconButton> <RemoveIcon/> </IconButton>
            </Grid>
            <Grid item xs={1} lg={1} className="citem-quantity">
                <Typography>2</Typography>
            </Grid>
            <Grid item xs={1} lg={1} className="citem-add">
                <IconButton> <AddIcon/> </IconButton>
            </Grid>
            <Grid item xs={1} lg={2}/>
            <Grid item xs={2} lg={1}>
                <Typography variant="body1"> <i className="fa fa-inr" aria-hidden="true"/> 200 </Typography>
            </Grid>
        </div>
    )
}