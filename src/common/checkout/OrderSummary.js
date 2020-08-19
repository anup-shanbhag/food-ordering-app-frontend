import React from 'react';
import {Card, CardContent, Button, Typography, FormControl, CardActions, Divider, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    veg: {
        color: 'green'
    },
    nonVeg: {
        color: 'red'
    }
});
export default function OrderSummary(){
    const classes = useStyles();
    const onClickPlaceOrder = () => {};

    return(
        <Card className="login-card" >
            <CardContent>
                <Box display="flex" flexDirection="column">
                    <FormControl margin="dense" size="small" variant="standard">
                        <Typography className="summary-title" variant="h6" color="textPrimary">
                            Summary
                        </Typography>
                    </FormControl>
                    <FormControl margin="dense" size="small" variant="standard">
                        <Typography className="restaurant-name" variant="body1" color="textPrimary">
                            Loud Silence
                        </Typography>
                    </FormControl>
                    <FormControl margin="dense" size="small" variant="standard">

                    </FormControl>
                    <Divider variant="middle" />
                    <FormControl margin="dense" size="small" variant="standard">
                        <Box display="flex" flexDirection="row">
                                <Typography className="net-amount" variant="body1" color="textPrimary">
                                    Net Amount
                                </Typography>
                            <Box display="flex" flexDirection="row" ml="auto" mr="1%">
                                <Typography>R </Typography>
                                <Typography>122.00</Typography>
                            </Box>
                        </Box>
                    </FormControl>
                </Box>
            </CardContent>
            <CardActions>
                <FormControl margin="dense" size="small" variant="standard">
                    <Button variant="contained" color="primary" id="btn-place" onClick={onClickPlaceOrder}>PLACE ORDER</Button>
                </FormControl>
            </CardActions>
        </Card>
    );
}