import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import React from "react";

const Product = ({ product }) => {
    const formattedPrice = product.price.toLocaleString("en-IN", {
        useGrouping: true,
        maximumFractionDigits: 2,
    });
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    className="product-image"
                    src={product.images[0]}
                    variant="top"
                />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <OverlayTrigger overlay={<Tooltip>{product.name}</Tooltip>}>
                        <Card.Title as="div" className="product-title">
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </OverlayTrigger>
                </Link>
                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as="h3">&#8377;{formattedPrice}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
