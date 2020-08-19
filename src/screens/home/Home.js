import React, {Component} from "react";
import HomeCard from "./HomeCard";
import './Home.css'
import Box from "@material-ui/core/Box";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [],
            loading: false
        }
    }

    componentDidMount() {
        this.getRestaurants();
    }

    render() {


        let restaurantDetails = {};
        restaurantDetails.url = "https://b.zmtcdn.com/data/res_imagery/42597_RESTAURANT_obp1.jpg";
        restaurantDetails.id = "1dd86f90-a296-11e8-9a3a-720006ceb890";
        restaurantDetails.customer_rating = 4.9;
        restaurantDetails.name = "3 Wise Monkeys";
        restaurantDetails.categories = "Chinese, Continental, Indian, Italian, Snacks";
        restaurantDetails.number_customers_rated = 28;
        restaurantDetails.average_price = 1200;

        return (
            <div>
                <div className="card-container">
                    {this.state.restaurants.map(restaurant => (
                        <Box key={restaurant.id} className="card-main">
                            <HomeCard restaurant={restaurant}/>
                        </Box>
                    ))}
                </div>
            </div>
        );
    }

    //fetches the restaurants from backend
    getRestaurants = () => {
        const headers = {'Accept': 'application/json'}
        let that = this;
        let url = "http://localhost:8080/api/restaurant";
        return fetch(url,
            {method: 'GET', headers}
        ).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            that.setState({
                restaurants: jsonResponse.restaurants,
            })
        }).catch((error) => {
            console.log('error user data', error);
        });
    }
}

export default Home;