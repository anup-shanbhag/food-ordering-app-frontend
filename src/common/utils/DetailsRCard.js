import React from "react";
import Typography from "@material-ui/core/Typography";

export default function DetailsRCard(props) {
    return (
        <div className="rcard-main">
            <div className="rcard-left">
                <img src={props.restaurant.photo_URL} alt={props.restaurant.restaurant_name} className="rcard-img"/>
            </div>
            <div className="rcard-right">
                <Typography variant="h4" className="rcard-name">{props.restaurant.restaurant_name}</Typography>
                <Typography variant="h6" className="rcard-locality upper-case">{props.address.locality}</Typography>
                <br/>
                <Typography variant="body1">
                    {
                        props.categories.map((category, index) =>
                            (
                                <span key={category.id + "category"}> {category.category_name}
                                    {index < props.categories.length - 1 ? ',' : ''}
                                    </span>
                            ))
                    }
                </Typography>
                <br/>
                <div className="rcard-right-bottom">
                    <box>
                        <Typography variant="body1" color="textPrimary">
                            <i className="fa fa-star" aria-hidden="true"/> {props.restaurant.customer_rating}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" className="upper-case">
                            Average Rating By <br/> {props.restaurant.number_customers_rated} customers
                        </Typography>
                    </box>
                    <box>
                        <Typography variant="body1" color="textPrimary">
                            <i className="fa fa-inr" aria-hidden="true"/> {props.restaurant.average_price}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" className="upper-case">
                            Average Cost For <br/> Two People
                        </Typography>
                    </box>
                    <box></box>
                </div>
            </div>
        </div>
    )
}