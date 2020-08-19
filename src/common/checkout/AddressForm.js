import React from "react";
import {Box, FormControl, FormHelperText, Input, InputLabel, NativeSelect, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    show: {
        display: 'block'
    },
    hide: {
        display: 'none'
    }
});
export default function AddressForm(props) {
    const classes = useStyles();
    const getClass = () => (props.active) ? classes.active : classes.inactive;
    const test = () => {
    };

    return (
        <Box display="flex" flexDirection="column" padding="2%" margin="2%">
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="flatname">Flat / Building No</InputLabel>
                <Input id="flatname" type="text" onChange={onFlatNameChanged}/>
                <FormHelperText error className={classes.show}>required</FormHelperText>
            </FormControl>
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="locality">Locality</InputLabel>
                <Input id="locality" type="text" onChange={onLocalityChanged}/>
                <FormHelperText error className={classes.show}>required</FormHelperText>
            </FormControl>
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="city">City</InputLabel>
                <Input id="city" type="text" onChange={onCityChanged}/>
                <FormHelperText error className={classes.show}>required</FormHelperText>
            </FormControl>
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="state">State</InputLabel>
                <NativeSelect id="state" value="" onChange={onStateChanged}>
                    <option value=""/>
                    {props.states.map(state => (
                        <option key={state.id} value={state.id}>{state.state_name}</option>
                    ))}
                </NativeSelect>
                <FormHelperText error className={classes.show}>required</FormHelperText>
            </FormControl>
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="pincode">Pincode</InputLabel>
                <Input id="pincode" type="text" onChange={onPincodeChanged}/>
                <FormHelperText error className={classes.show}>required</FormHelperText>
            </FormControl>
            <FormControl margin="dense" size="small" variant="standard">
                <Button variant="contained" color="secondary" id="btn-save" onClick={test}>SAVE ADDRESS</Button>
            </FormControl>
        </Box>
    );
}