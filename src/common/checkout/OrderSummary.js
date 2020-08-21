import React from 'react';
import {Card, CardContent, Button, Typography, FormControl, CardActions, Divider, Box} from '@material-ui/core';
import OrderItem from "../order/OrderItem";
import "font-awesome/css/font-awesome.css"

export default function OrderSummary(props){

    const onClickPlaceOrder = () => {};

    return(
        <Card className="order-summary-card" >
            <CardContent>
                <Box display="flex" flexDirection="column">
                    <FormControl fullWidth margin="normal" size="small" variant="standard">
                        <Typography className="summary-title" variant="h6" color="textPrimary">
                            Summary
                        </Typography>
                    </FormControl>
                    <FormControl fullWidth margin="dense" size="small" variant="standard">
                        <Typography className="restaurant-name" variant="body1" color="textPrimary" component="p">
                            {props.order.restaurant_name}
                        </Typography>
                    </FormControl>
                    <FormControl fullWidth margin="dense" size="small" variant="standard">
                        {
                            (props.order.item_quantities.length > 0) &&
                                props.order.item_quantities.map(item => (
                                    <OrderItem key={item.item.id}
                                               nonVeg={item.item.type === "NON_VEG"}
                                               name={item.item.item_name} quantity={item.quantity}
                                               price={item.price}/>
                                ))
                        }
                        <Typography variant="h3" gutterBottom/>
                    </FormControl>
                    <Divider variant="fullWidth" />
                    <FormControl fullWidth margin="normal" size="small" variant="standard">
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography className="net-amount" variant="body2" color="textPrimary">
                                    Net Amount
                                </Typography>
                                <Typography variant="body2"><i className="fa fa-inr"/> {Number(props.order.bill).toFixed(2)}</Typography>
                        </Box>
                    </FormControl>
                </Box>
            </CardContent>
            <CardActions>
                <FormControl fullWidth margin="normal" size="small" variant="standard">
                    <Button variant="contained" color="primary" id="btn-place" onClick={onClickPlaceOrder}>PLACE ORDER</Button>
                </FormControl>
            </CardActions>
        </Card>
    );
}