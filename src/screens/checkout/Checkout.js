import React from 'react';

import {
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Tabs,
    Typography,
    AppBar,
    Tab,
    useMediaQuery
} from "@material-ui/core";

import {
    withStyles
} from '@material-ui/core/styles';

import AddressesGrid from "../../common/checkout/AddressesGrid";
import PaymentOptions from "../../common/checkout/PaymentOptions";
import SaveAddressForm from "../../common/checkout/SaveAddressForm";
import OrderSummaryCard from "../../common/checkout/OrderSummaryCard";
import Notification from "../../common/notification/Notification";
import Header from "../../common/header/Header";
import "./Checkout.css";

import {GetEndpointURI, GetHttpHeaders, CallApi} from "../../common/utils/ApiHelper";

const useStyles = (theme) => ({
    checkoutContainer: {
        flexDirection: 'row',
    },
    checkoutContainerSm: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    workflowStepperContainer: {
        width: '73%',
    },
    workflowStepperContainerSm: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    summaryCardContainer: {
        width: '27%',
    },
    summaryCardContainerSm: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '5%',
    },
});

const withMediaQuery = () => Component => props => {
    const isSmallScreen = useMediaQuery('(max-width:650px)');
    return <Component isSmallScreen={isSmallScreen} {...props} />;
};

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            activeTab: 0,
            addresses: null,
            states: null,
            paymentMethods: null,
            messageText: null,
            notificationOpen: false,
            selectedAddressId: null,
            selectedPaymentMethodId: null,
            order: {
                "address_id": null,
                "bill": 620.0,
                "coupon_id": null,
                "discount": 0,
                "item_quantities": [
                    {
                        "item_id": "8c174b25-bb31-56a8-88b4-d06ffc9d5f89",
                        "item_name": "Tea",
                        "type": "VEG",
                        "quantity": 2,
                        "price": 40
                    },
                    {
                        "item_id": "1dd86f90-a296-11e8-9a3a-720006ceb890",
                        "item_name": "Paneer Chilly",
                        "type": "VEG",
                        "quantity": 2,
                        "price": 280
                    },
                    {
                        "item_id": "2ddf5546-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "Chicken Roll",
                        "type": "NON_VEG",
                        "quantity": 2,
                        "price": 300
                    }
                ],
                "payment_id": null,
                "restaurant_id": "2461973c-a238-11e8-9077-720006ceb890",
                "restaurant_name": "Lion Heart"
            }
        }
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
        this.placeNewOrder = this.placeNewOrder.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.setSelectedAddressId = this.setSelectedAddressId.bind(this);
        this.setSelectedPaymentModeId = this.setSelectedPaymentModeId.bind(this);
        this.setAvailablePaymentMethods = this.setAvailablePaymentMethods.bind(this);
        this.setAvailableStates = this.setAvailableStates.bind(this);
        this.setAvailableAddresses = this.setAvailableAddresses.bind(this);
        this.saveNewAddress = this.saveNewAddress.bind(this);
        this.msgSaveOrderNotOK = "Unable to place your order! Please try again!";
        this.msgSaveOrderOK = "Order placed successfully! Your order ID is $orderId.";
        this.msgSaveAddressNotOK = "Unable to save address! Please try again!";
        this.msgSaveAddressOK = "Address saved successfully!";
        this.msgAddressNotSelected = "Please select an address for delivery!";
        this.msgPaymentNotSelected = "Please select a payment method!";
    }

    getSteps = () => ['Delivery', 'Payment'];
    handleNext = () => {
        if(this.state.activeStep === 0 && !this.state.selectedAddressId){
            this.showNotification(this.msgAddressNotSelected);
        }
        else if(this.state.activeStep === 1 && !this.state.selectedPaymentMethodId){
            this.showNotification(this.msgPaymentNotSelected);
        }
        else {
            this.setState({activeStep: this.state.activeStep + 1});
        }
    }
    handleBack = () => this.setState({activeStep: this.state.activeStep - 1});
    handleReset = () => this.setState({activeStep: 0});
    handleSwitch = (e, v) => this.setState({activeTab: v});
    handleSaveAddress = (result) => {
        if (result) {
            this.setState({activeTab: 0});
            this.showNotification(this.msgSaveAddressOK);
            this.getAvailableAddresses();
        } else {
            this.showNotification(this.msgSaveAddressNotOK);
        }
    }
    handlePlaceOrder = (result, response) => {
        if(result){
            this.showNotification(this.msgSaveOrderOK.replace("$orderId", response.id));
        }
        else{
            this.showNotification(this.msgSaveOrderNotOK);
        }
    }
    showNotification = (message) => this.setState({messageText: message, notificationOpen: true});
    closeNotification = () => this.setState({messageText: null, notificationOpen: false});
    setSelectedAddressId = (id) => this.setState({selectedAddressId: id});
    setSelectedPaymentModeId = (id) => this.setState({selectedPaymentMethodId: id});

    setAvailableAddresses = (result, response) => {
        if (result) {
            this.setState({addresses: response.addresses});
        } else {
            this.setState({addresses: null});
        }
    }

    getAvailableAddresses = () => CallApi(GetEndpointURI('Get Addresses'),
        GetHttpHeaders('GET', "Bearer " + window.sessionStorage.getItem("access-token")),
        this.setAvailableAddresses);

    setAvailableStates = (result, response) => {
        if (result) {
            this.setState({states: response.states});
        } else {
            this.setState({states: null});
        }
    }

    getAvailableStates = () => CallApi(GetEndpointURI('Get States'),
        GetHttpHeaders('GET'), this.setAvailableStates);

    setAvailablePaymentMethods = (result, response) => {
        if (result) {
            this.setState({paymentMethods: response.paymentMethods});
        } else {
            this.setState({paymentMethods: null});
        }
    }

    getAvailablePaymentMethods = () => CallApi(GetEndpointURI('Get Payment Modes'),
        GetHttpHeaders('GET'), this.setAvailablePaymentMethods);

    saveNewAddress = (address, callback) => CallApi(GetEndpointURI('Save Address'),
        GetHttpHeaders('POST', "Bearer " + window.sessionStorage.getItem("access-token"),
            JSON.stringify(address)), callback, this.handleSaveAddress);

    placeNewOrder = () => {
        delete this.state.order.restaurant_name;
        delete this.state.order.discount;
        delete this.state.order.coupon_id;
        this.state.order.item_quantities.map(item => {
            delete item.type;
            delete item.item_name;
        })
        this.state.order.address_id = this.state.selectedAddressId;
        this.state.order.payment_id = this.state.selectedPaymentMethodId;
        CallApi(GetEndpointURI('Save Order'),
            GetHttpHeaders('POST', "Bearer " + window.sessionStorage.getItem("access-token"),
                JSON.stringify(this.state.order)), this.handlePlaceOrder);
    }
    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box><AppBar position="static">
                        <Tabs value={this.state.activeTab} onChange={this.handleSwitch}>
                            <Tab label="EXISTING ADDRESS"/>
                            <Tab label="NEW ADDRESS"/>
                        </Tabs>
                    </AppBar>
                        <Box display={this.state.activeTab === 0 ? "block" : "none"}>
                            <AddressesGrid addresses={this.state.addresses} cols={(this.props.isSmallScreen) ? 2 : 3}
                                           setAddressId={this.setSelectedAddressId}/>
                        </Box>
                        <Box display={this.state.activeTab === 1 ? "block" : "none"}>
                            <SaveAddressForm states={this.state.states} handleSaveAddressOK={this.saveNewAddress}/>
                        </Box>
                    </Box>
                );
            case 1:
                return (<PaymentOptions paymentModes={this.state.paymentMethods}
                                        setPaymentModeId={this.setSelectedPaymentModeId}/>);
            default:
                return 'Unknown step';
        }
    }


    componentDidMount() {
        this.getAvailableAddresses();
        this.getAvailableStates();
        this.getAvailablePaymentMethods();
    }

    render() {
        const {classes} = this.props;
        return (
            <Box>
                <Header/>
                <Box display="flex"
                     className={(this.props.isSmallScreen) ? classes.checkoutContainerSm : classes.checkoutContainer}
                     width="100%" mt="1%">
                    <Box
                        className={(this.props.isSmallScreen) ? classes.workflowStepperContainerSm : classes.workflowStepperContainer}>
                        <Stepper activeStep={this.state.activeStep} orientation="vertical">
                            {this.getSteps().map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {this.getStepContent(index)}
                                        <Typography variant="h2" gutterBottom/>
                                        <Box>
                                            <Button disabled={this.state.activeStep === 0}
                                                    onClick={this.handleBack}>Back</Button>
                                            <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                {this.state.activeStep === this.getSteps().length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {(this.state.activeStep === this.getSteps().length) ? (
                            <Box padding="2%"><Typography variant="body1">View the summary and place your order now!</Typography>
                                <Button onClick={this.handleReset}>
                                    CHANGE
                                </Button>
                            </Box>) : ""
                        }
                    </Box>
                    <Box
                        className={(this.props.isSmallScreen) ? classes.summaryCardContainerSm : classes.summaryCardContainer}
                        padding="1%">
                        <OrderSummaryCard order={this.state.order} handlePlaceOrder={this.placeNewOrder}/>
                    </Box>
                </Box>
                <Notification messageText={this.state.messageText} open={this.state.notificationOpen}
                              onClose={this.closeNotification}/>
            </Box>
        );
    }
}

export default withStyles(useStyles)(withMediaQuery()(Checkout));
