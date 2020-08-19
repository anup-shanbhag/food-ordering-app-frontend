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
    const [flatname, setFlatname] = React.useState("");
    const [locality, setLocality] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [pincode, setPincode] = React.useState("");
    const [isSaveClicked, setSaveClicked] = React.useState(false);
    const classes = useStyles();
    const getClass = () => (props.active) ? classes.active : classes.inactive;
    const onFlatnameChanged = (e) => setFlatname(e.target.value);
    const onLocalityChanged = (e) => setLocality(e.target.value);
    const onCityChanged = (e) => setCity(e.target.value);
    const onStateChanged = (e) => setState(e.target.value);
    const onPincodeChanged = (e) => setPincode(e.target.value);
    const display = (field) => (isSaveClicked && (field === null || field === "")) ? classes.show : classes.hide;
    const onSave = (e) => {
        setSaveClicked(true);
        console.log(flatname);
        console.log(locality);
        console.log(city);
        console.log(state);
        console.log(pincode);
    };
    return (
        <Box display="flex" flexDirection="column" padding="2%" margin="2%">
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="flatname">Flat / Building No</InputLabel>
                <Input id="flatname" type="text" value={flatname} onChange={onFlatnameChanged}/>
                <FormHelperText error className={display(flatname)}>required</FormHelperText>
            </FormControl>
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="locality">Locality</InputLabel>
                <Input id="locality" type="text" value={locality} onChange={onLocalityChanged}/>
                <FormHelperText error className={display(locality)}>required</FormHelperText>
            </FormControl>
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="city">City</InputLabel>
                <Input id="city" type="text" value={city} onChange={onCityChanged}/>
                <FormHelperText error className={display(city)}>required</FormHelperText>
            </FormControl>
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="state">State</InputLabel>
                <NativeSelect id="state" value={state} onChange={onStateChanged}>
                    <option value=""/>
                    {props.states.map(state => (
                        <option key={state.id} value={state.id}>{state.state_name}</option>
                    ))}
                </NativeSelect>
                <FormHelperText error className={display(state)}>required</FormHelperText>
            </FormControl>
            <FormControl required margin="dense" size="small" variant="standard">
                <InputLabel htmlFor="pincode">Pincode</InputLabel>
                <Input id="pincode" type="text" value={pincode} onChange={onPincodeChanged}/>
                <FormHelperText error className={display(pincode)}>required</FormHelperText>
            </FormControl>
            <FormControl margin="dense" size="small" variant="standard">
                <Button variant="contained" color="secondary" id="btn-save" onClick={onSave}>SAVE ADDRESS</Button>
            </FormControl>
        </Box>
    );
}