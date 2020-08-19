import React from 'react';
import {Card, CardContent, Box, Typography, GridListTile, GridListTileBar, GridList} from '@material-ui/core';
import {CheckCircleRounded} from "@material-ui/icons";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
    active: {
        fill: 'green'
    },
    inactive: {
        fill: 'gray'
    },
    gridList: {
        height: "40%",
        flexWrap: 'nowrap',
        margin: "1%",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    addressCard: {
        padding: "1%",
        margin: "1%"
    }
});

export default function Addresses(props) {
    const classes = useStyles();
    let active = true;
    const getClass = () => (active) ? classes.active : classes.inactive;
    return (
        <GridList className={classes.gridList} cols={3}>
            {props.addresses.map(address => (
                <GridListTile key={address.id}>
                    <Card className={"customer-address "+classes.addressCard} raised={false}>
                        <CardContent>
                            <Box display="flex" flexDirection="column" alignItems="flex-start">
                                <Typography className="address-line"
                                            variant="caption">{address.flat_building_name}</Typography>
                                <Typography className="address-line" variant="caption">{address.locality}</Typography>
                                <Typography className="address-line" variant="caption">{address.city}</Typography>
                                <Typography className="address-line"
                                            variant="caption">{address.state.state_name}</Typography>
                                <Typography className="address-line" variant="caption"
                                            gutterBottom>{address.pincode}</Typography>
                                <Box mt="auto" mb="0" alignSelf="flex-end"><CheckCircleRounded className={getClass()}/></Box>
                            </Box>
                        </CardContent>
                    </Card>
                </GridListTile>
            ))}
        </GridList>
    );
}