import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    GridListTile,
    GridList,
    CardActions,
    IconButton
} from '@material-ui/core';
import {CheckCircleRounded} from "@material-ui/icons";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
    active: {
        fill: 'green',
        pointerEvents: "none"
    },
    inactive: {
        fill: 'gray',
        pointerEvents: "none"
    },
    select: {
        marginLeft: "auto",
        marginRight: "1%"
    },
    gridList: {
        flexWrap: 'nowrap',
        margin: "0%",
        padding: "1%",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    gridTile: {
        height: '150px'
    },
    addressCard: {
        padding: "1%",
        margin: "1%"
    }
});

export default function Addresses(props) {
    const [selected, setSelected] = React.useState([(props.addresses !== null && props.addresses.length > 0) ? new Array(props.addresses.length).fill(false)
        : []]);
    const classes = useStyles();
    const getClass = (active) => (active) ? classes.active : classes.inactive;
    const onClick = (e) => {
        let newArr = [...selected].fill(false);
        if(e.target.value !== null){
            newArr[e.target.value]=true;
            setSelected(newArr);
        }
    }
    return (
        <GridList className={classes.gridList} cols={3} cellHeight="auto" >
            {
                (props.addresses !== null && props.addresses.length > 0) ?
                    props.addresses.map((address,index) => (
                        <GridListTile className={classes.gridTile} key={address.id}>
                            <Card className={"customer-address " + classes.addressCard} raised={selected[index]===true} >
                                <CardContent>
                                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                                        <Typography className="address-line"
                                                    variant="subtitle2">{address.flat_building_name}</Typography>
                                        <Typography className="address-line"
                                                    variant="subtitle2">{address.locality}</Typography>
                                        <Typography className="address-line"
                                                    variant="subtitle2">{address.city}</Typography>
                                        <Typography className="address-line"
                                                    variant="subtitle2">{address.state.state_name}</Typography>
                                        <Typography className="address-line" variant="subtitle2"
                                                    gutterBottom>{address.pincode}</Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                        <IconButton className={classes.select} id={address.id} value={index} onClick={onClick}>
                                            <CheckCircleRounded className={getClass(selected[index])} />
                                        </IconButton>
                                </CardActions>
                            </Card>
                        </GridListTile>
                    )) :
                    <Typography className="payment-method" variant="subtitle2">There are no saved addresses! You can
                        save
                        an address using the 'New Address' tab or using your ‘Profile’ menu option.</Typography>

            }
            }
        </GridList>
    );
}