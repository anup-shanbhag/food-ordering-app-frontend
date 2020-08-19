import React from 'react';
import {Box, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Typography} from '@material-ui/core';


export default function Payment(props) {
    const [paymentMode, setPaymentMode] = React.useState("");
    const onPaymentModeChanged = (e) => {
        setPaymentMode(e.target.value);
    }
    return (
        <Box padding="0.5%" margin="0.5%">
            <FormControl component="fieldset">
                <FormLabel component="legend">Select Mode of Payment</FormLabel>
                <RadioGroup name="Payment" value={paymentMode} onChange={onPaymentModeChanged}>
                    {props.paymentModes.map(paymentMode => (
                        <FormControlLabel key={paymentMode.id} value={paymentMode.id} control={<Radio size="small"/>}
                                          label={<Typography className="payment-method"
                                                             variant="caption">{paymentMode.payment_name}</Typography>}/>
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
}