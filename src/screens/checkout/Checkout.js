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

import {addresses, paymentMethods, states, order} from "../../common/checkout/Test";

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
            messageText: null,
            notificationOpen: false,
            addressId: null,
            paymentModeId: null,
        }
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.setAddressId = this.setAddressId.bind(this);
        this.setPaymentModeId = this.setPaymentModeId.bind(this);
    }

    getSteps = () => ['Delivery', 'Payment'];
    handleNext = () => {
        if((this.state.activeStep===0 && this.state.addressId) ||
            (this.state.activeStep===1 && this.state.paymentModeId) ){
            this.setState({activeStep: this.state.activeStep + 1});
        }
    }
    handleBack = () => this.setState({activeStep: this.state.activeStep - 1});
    handleReset = () => this.setState({activeStep: 0});
    handleSwitch = (e, v) => this.setState({activeTab: v});
    handleSaveAddressOK = () => this.setState({activeTab: 0});
    handlePlaceOrder = () => this.showNotification("Order placed successfully!")
    showNotification = (message) => this.setState({messageText: message, notificationOpen: true});
    closeNotification = () => this.setState({messageText: null, notificationOpen: false});
    setAddressId = (id) => this.setState({addressId: id});
    setPaymentModeId = (id) => this.setState({paymentModeId: id});
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
                            <AddressesGrid addresses={addresses} cols={(this.props.isSmallScreen) ? 2 : 3} setAddressId = {this.setAddressId}/>
                        </Box>
                        <Box display={this.state.activeTab === 1 ? "block" : "none"}>
                            <SaveAddressForm states={states} handleSaveAddressOK={this.handleSaveAddressOK}/>
                        </Box>
                    </Box>
                );
            case 1:
                return (<PaymentOptions paymentModes={paymentMethods} setPaymentModeId = {this.setPaymentModeId}/>);
            default:
                return 'Unknown step';
        }
    }

    componentDidMount() {
        ///console.log(useMediaQuery(this.props.theme.breakpoints.down('sm')));
    }

    render() {
        const {classes} = this.props;
        return (
            <Box>
                <Header/>
                <Box display="flex" className={(this.props.isSmallScreen) ? classes.checkoutContainerSm : classes.checkoutContainer} width="100%" mt="1%">
                    <Box className={(this.props.isSmallScreen) ? classes.workflowStepperContainerSm : classes.workflowStepperContainer}>
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
                            <Box><Typography variant="body1">View the summary and place your order now!</Typography>
                                <Button onClick={this.handleReset}>
                                    CHANGE
                                </Button>
                            </Box>) : ""
                        }
                    </Box>
                    <Box className={(this.props.isSmallScreen) ? classes.summaryCardContainerSm : classes.summaryCardContainer} padding="1%">
                        <OrderSummaryCard order={order} handlePlaceOrder={this.handlePlaceOrder}/>
                    </Box>
                </Box>
                <Notification messageText={this.state.messageText} open={this.state.notificationOpen}
                              onClose={this.closeNotification}/>
            </Box>
        );
    }
}

export default withStyles(useStyles)(withMediaQuery()(Checkout));
