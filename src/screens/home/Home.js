import React, {Component} from "react";
import HomeCard from "./HomeCard";
import './Home.css'
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Header from "../../common/header/Header";
import "../../../node_modules/font-awesome/css/font-awesome.css"

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [],
            loading: false
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.getRestaurants();
    }

    render() {
        return (
            <div>
                {this.mounted === true ?
                    <div>
                        <Header/>
                        {this.state.loading === true ?
                            <Typography className="loading-spinner" variant="h4" color="textSecondary">loading...</Typography>
                           : ""
                        }
                        <div className="card-container">
                            {this.state.restaurants.map(restaurant => (
                                <Box key={restaurant.id} className="card-main">
                                    <HomeCard restaurant={restaurant}/>
                                </Box>
                            ))}
                        </div>
                    </div>
                    : ""}
            </div>
        );
    }

    //fetches the restaurants from backend
    getRestaurants = () => {
        const headers = {'Accept': 'application/json'}
        let that = this;
        let url = "http://localhost:8080/api/restaurant";
        that.setState({loading:true})
        return fetch(url,
            {method: 'GET', headers}
        ).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            that.setState({
                restaurants: jsonResponse.restaurants,
                loading: false
            })
        }).catch((error) => {
            console.log('error user data', error);
        });
    }
}

export default Home;