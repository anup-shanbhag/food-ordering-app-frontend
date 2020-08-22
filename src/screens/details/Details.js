import React, {Component} from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import './Details.css';
import DetailsRCard from "../../common/details/DetailsRCard";
import DetailsMenuCard from "../../common/details/DetailsMenuCard";
import DetailsCartCard from "../../common/details/DetailsCartCard";

class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurant: null,
        }
    }

    componentDidMount() {
        this.getRestaurant();
    }

    render() {
        return (
            <div>
                {this.state.loading === true ?
                    <Typography className="loading-spinner" variant="h4"
                                color="textSecondary">loading...</Typography>
                    : ""
                }
                {this.state.restaurant !== null ?
                    <div>
                        <Header searchHandler={this.searchHandler}/>
                        <div className="restaurant-section">
                            <DetailsRCard restaurant={this.state.restaurant}/>
                        </div>
                        <div className="section2">
                            <div className="item-section">
                                {this.state.restaurant.categories.map((category, index) => (
                                    <span key={category.id + "category"}>
                                            <DetailsMenuCard category={category}/>
                                        </span>
                                ))
                                }
                            </div>
                            <div className="cart-section">
                                <DetailsCartCard/>
                            </div>
                        </div>
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
}

export default Details;