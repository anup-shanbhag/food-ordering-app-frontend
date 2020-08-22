import React from 'react';

import {
    Card,
    CardContent,
    Box,
    Typography,
    GridListTile,
    GridList,
    CardActions,
    IconButton,
} from '@material-ui/core';

import {
    CheckCircleRounded
} from "@material-ui/icons";

import {
    makeStyles
} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    active: {
        fill: 'green',
        pointerEvents: "none"
    },
    inactive: {
        fill: 'gray',
        pointerEvents: "none"
    },
    gridList: {
        flexWrap: 'nowrap',
        margin: "0%",
        padding: "1%",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    gridTile: {
        height: 'auto',
    },
    selected: {
        boxShadow: '3px 3px 8px 0px darkgrey',
        borderColor: 'darkgrey',
        border: 'solid',
    },
    addressCard: {
        padding: "1%",
        margin: "3%"
    },
    cardContent: {
        paddingTop: "2%",
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingBottom: "1%",
    },
    cardActions: {
        paddingTop: "1%",
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingBottom: "2%",
    }
}));

export default function AddressesGrid(props) {
    const [selected, setSelected] = React.useState(
        (props.addresses !== null && props.addresses.length > 0) ?
            [...new Array(props.addresses.length).fill(false)] : []
    );
    const classes = useStyles();
    const getClass = (active) => (active) ? classes.active : classes.inactive;
    const onClick = (e) => {
        let newArr = [...selected].fill(false);
        if (e.currentTarget.value !== null) {
            newArr[e.currentTarget.value] = true;
            setSelected(newArr);
            props.setAddressId(e.target.id);
        }
    }
    return (
        <Box width={1} textAlign="left">
            {
                (props.addresses !== null && props.addresses.length > 0) ? (
                    <GridList className={classes.gridList} cols={props.cols} cellHeight="auto">
                        {
                            props.addresses.map((address, index) => (
                                <GridListTile className={classes.gridTile} key={address.id}>
                                    <Card className={"customer-address " + classes.addressCard + " " +
                                    (selected[index] && classes.selected)} raised={selected[index] === true}>
                                        <CardContent className={classes.cardContent}>
                                            <Box display="flex" flexDirection="column" alignItems="flex-start">
                                                <Typography className="address-line"
                                                            variant="subtitle2">{address.flat_building_name}</Typography>
                                                <Typography className="address-line"
                                                            variant="subtitle2">{address.locality}</Typography>
                                                <Typography className="address-line"
                                                            variant="subtitle2">{address.city}</Typography>
                                                <Typography className="address-line"
                                                            variant="subtitle2">{address.state.state_name}</Typography>
                                                <Typography className="address-line"
                                                            variant="subtitle2">{address.pincode}</Typography>
                                            </Box>
                                        </CardContent>
                                        <CardActions disableSpacing className={classes.cardActions}>
                                            <Box width="100%" display="inline" textAlign="right">
                                                <IconButton size="medium" id={address.id} value={index}
                                                            onClick={onClick}>
                                                    <CheckCircleRounded fontSize="large"
                                                                        className={getClass(selected[index])}/>
                                                </IconButton>
                                            </Box>
                                        </CardActions>
                                    </Card>
                                </GridListTile>
                            ))
                        }
                    </GridList>) : (
                    <Box padding="2%">
                        <Typography variant="h3" gutterBottom/>
                        <Typography className="payment-method" variant="body1" color="textSecondary">
                            {"There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option."}
                        </Typography>
                    </Box>
                )
            }
        </Box>
    );
}