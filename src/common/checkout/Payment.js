import React from 'react';
import {Box, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Typography} from '@material-ui/core';


export default function Payment(props) {
    return (
        <Box padding="2%" margin="2%">
            <FormControl component="fieldset">
                <FormLabel component="legend">Select Mode of Payment</FormLabel>
                <RadioGroup name="Payment">
                    {props.paymentModes.map(paymentMode => (
                        <FormControlLabel value={paymentMode.id} control={<Radio size="small"/>}
                                          label={<Typography className="payment-method"
                                                             variant="caption">{paymentMode.payment_name}</Typography>}/>
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
}