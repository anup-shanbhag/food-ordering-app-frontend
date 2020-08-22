import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from "@material-ui/core/Typography";
import DetailsCartItem from "./DetailsCartItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import OrderItem from "../order/OrderItem";

export default function DetailsCartCard(props) {
    return(
        <div>
            <Card>
                <CardContent className="cart-main">
                    <div className="cart-header">
                        <i>
                            <Badge className="badge" badgeContent={props.cartItems.length} color="primary" showZero>
                                <ShoppingCartIcon/>
                            </Badge>
                        </i>My Cart
                    </div>
                    {
                        props.cartItems.length !== 0 ?
                        <span>
                            {props.cartItems.map(cartItem =>
                                <span key={cartItem.id}>
                                    <DetailsCartItem cartItem={cartItem}/>
                                </span>
                            )}
                        </span>
                        : ""
                    }
                    <div className="cart-total">
                        <Grid item xs={6} lg={6}>
                            <Typography>TOTAL AMOUNT</Typography>
                        </Grid>
                        <Grid item xs={4} lg={4}/>
                        <Grid item xs={2} lg={2}>
                            <Typography><i className="fa fa-inr" aria-hidden="true"/> {props.totalAmount} </Typography>
                        </Grid>
                    </div>
                    <div className="cart-button">
                        <Button variant="contained" color="primary" className="cButton">
                            CHECKOUT
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}