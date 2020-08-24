import React, {Component} from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import './Details.css';
import DetailsRCard from "../../common/details/DetailsRCard";
import DetailsMenuCard from "../../common/details/DetailsMenuCard";
import DetailsCartCard from "../../common/details/DetailsCartCard";
import Notification from "../../common/notification/Notification";

class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurant: null,
            cartItem: {id:null, name:null, type:null, quantity:0, price:0, itemPrice:0},
            cartItems: [],
            totalAmount: 0,
            totalItems: 0,
            notificationOpen: false,
        }
        this.handleAddMenuItem = this.handleAddMenuItem.bind(this);
        this.handleAddCartItem = this.handleAddCartItem.bind(this);
        this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this);
        this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.msgItemAdded = "Item added to cart!";
        this.msgItemIncreased = "Item added to cart!";
        this.msgItemDecreased = "Item added to cart!";
    }

    handleAddMenuItem = (item) => this.addToCartHandler(item);
    handleAddCartItem = (item) => this.increaseCartItemHandler(item);
    handleRemoveCartItem = (item) => this.decreaseCartItemHandler(item);
    handleCheckoutClick = (cartItems) => this.checkout(cartItems);

    componentDidMount() {
        this.getRestaurant();
    }

    render() {
        return (
            <div>
                {"Ashik "+ this.state.loggedIn}
                {this.state.loading === true ?
                    <Typography className="loading-spinner" variant="h4"
                                color="textSecondary">loading...</Typography>
                    : ""
                }
                {this.state.restaurant !== null ?
                    <div>
                        {/*Header section*/}
                        <Header searchHandler={this.searchHandler}/>

                        {/*Restaurant Details section*/}
                        <div className="restaurant-section">
                            <DetailsRCard restaurant={this.state.restaurant}/>
                        </div>

                        <div className="section2">

                            {/*Restaurant Menu section*/}
                            <div className="item-section">
                                {this.state.restaurant.categories.map((category, index) => (
                                    <span key={category.id + "category"}>
                                        <DetailsMenuCard category={category} handleAddMenuItem={this.handleAddMenuItem}/>
                                    </span>
                                ))
                                }
                            </div>

                            {/*Checkout Cart section*/}
                            <div className="cart-section">
                                <DetailsCartCard cartItems={this.state.cartItems}
                                                 totalAmount={this.state.totalAmount}
                                                 totalItems={this.state.totalItems}
                                                 handleAddCartItem={this.handleAddCartItem}
                                                 handleRemoveCartItem={this.handleRemoveCartItem}
                                                 handleCheckoutClick={this.handleCheckoutClick}/>
                            </div>
                        </div>
                        {this.state.notificationOpen === true ?
                            <Notification messageText={this.state.messageText} open={this.state.notificationOpen}
                                          onClose={this.closeNotification}/>
                            : ""
                        }
                    </div>
                    : ""}
            </div>
        )
    }

    getRestaurant() {
        const headers = {'Accept': 'application/json'};
        let that = this;
        let url = this.props.baseUrl + '/restaurant/' + this.props.match.params.restaurantId;
        that.setState({loading: true})
        return fetch(url,
            {method: 'GET', headers}
        ).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            this.setState({
                restaurant: jsonResponse,
                address: jsonResponse.address,
                categories: jsonResponse.categories,
                loading: false,
            })
        }).catch((error) => {
            console.log('error user data', error);
        });
    }

    showNotification = (message) => this.setState({messageText: message, notificationOpen: true});
    closeNotification = () => this.setState({messageText: null, notificationOpen: false});

    addToCartHandler = (item) => {
        let totalAmount = this.state.totalAmount;
        let totalItems = this.state.totalItems;
        totalAmount += item.price;
        totalItems += 1;

        let newItem =this.state.cartItem;
        newItem.id = item.id;
        newItem.name = item.item_name;
        newItem.type = item.item_type;
        newItem.quantity = 1;
        newItem.price = item.price * newItem.quantity;
        newItem.itemPrice = item.price;

        if(this.state.cartItems.length !== 0 && this.state.cartItems.some(cItem => (cItem.id === item.id))){
            const index = this.state.cartItems.findIndex(cItem => cItem.id === item.id);

            const updateItem = this.state.cartItems[index];
            updateItem.quantity = this.state.cartItems[index].quantity + 1;
            updateItem.price = this.state.cartItems[index].price + item.price;
        }
        else {
            this.setState({cartItem: newItem})
            this.setState({cartItem: {}});
            this.state.cartItems.push(this.state.cartItem);
        }
        this.setState({totalAmount: totalAmount})
        this.setState({totalItems: totalItems});
        this.showNotification(this.msgItemAdded);
    }

    increaseCartItemHandler = (item) => {
        const index = this.state.cartItems.findIndex(cItem => cItem.id === item.id);
        const updateItem = this.state.cartItems[index];
        updateItem.quantity = this.state.cartItems[index].quantity + 1;
        updateItem.price = this.state.cartItems[index].price + item.itemPrice;
        this.setState(item);


        let totalAmount = this.state.totalAmount;
        let totalItems = this.state.totalItems;
        totalAmount += item.itemPrice;
        totalItems += 1;
        this.setState({totalAmount: totalAmount})
        this.setState({totalItems: totalItems});
        this.showNotification(this.msgItemIncreased);
    }

    decreaseCartItemHandler = (item) => {
        const index = this.state.cartItems.findIndex(cItem => cItem.id === item.id);
        const updateItem = this.state.cartItems[index];
        if(updateItem.quantity === 1){
            this.state.cartItems.splice(index, 1);
        }else if(updateItem.quantity > 1) {
            updateItem.quantity = this.state.cartItems[index].quantity - 1;
            updateItem.price = this.state.cartItems[index].price - item.itemPrice;
            this.setState(item);
        }
        let totalAmount = this.state.totalAmount;
        let totalItems = this.state.totalItems;
        totalAmount -= item.itemPrice;
        totalItems -= 1;
        this.setState({totalAmount: totalAmount})
        this.setState({totalItems: totalItems});
        this.showNotification(this.msgItemDecreased);
    }

    checkout = (cartItems) => {
        this.props.history.push("/checkout");
    }
}

export default Details;