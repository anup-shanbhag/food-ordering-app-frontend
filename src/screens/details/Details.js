import React, {Component} from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import './Details.css';
import DetailsRCard from "../../common/utils/DetailsRCard";

class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            address: {},
            categories: [],
        }
    }

    componentDidMount() {
        this.getRestaurant();
        this.mounted = true;
    }

    render() {
        return (
            <div>
                {this.mounted === true ?
                    <div>

                        {console.log(JSON.stringify(this.state.restaurant))}
                        <Header searchHandler={this.searchHandler}/>
                        {this.state.loading === true ?
                            <Typography className="loading-spinner" variant="h4"
                                        color="textSecondary">loading...</Typography>
                            : ""
                        }
                        <DetailsRCard restaurant={this.state.restaurant} address={this.state.address}
                                      categories={this.state.categories}/>
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
                loading: false
            })
        }).catch((error) => {
            console.log('error user data', error);
        });
    }
}

export default Details;