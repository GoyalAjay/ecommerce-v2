import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Form,
    Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FaBell } from "react-icons/fa";
import { useGetProductDetailsQuery } from "slices/productsApiSlice";
import { addToCart } from "slices/cartSlice";
import Rating from "components/Rating";
import Loader from "components/Loader";
import Message from "components/Message";

const ProductScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [mainImage, setMainImage] = useState("");
    const [qty, setQty] = useState(1);
    const { id: productId } = useParams();

    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    const formattedPrice = product?.price.toLocaleString("en-IN", {
        useGrouping: true,
        maximumFractionDigits: 2,
    });

    var thumbnails = [];
    product?.images?.forEach((src) => {
        thumbnails.push(src);
    });
    useEffect(() => {
        if (product?.images) {
            setMainImage(product?.images[0]);
        }
    }, [product?.images]);

    const handleThumbnailClick = (event) => {
        setMainImage(event.target.src);
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <Row>
                        <Col md={5}>
                            <div className="product-container">
                                <div className="product-thumbnails">
                                    <ul
                                        className="thumbnail-list"
                                        style={{ width: "35px" }}
                                    >
                                        {product.images?.map((path, index) => (
                                            <li
                                                id="thumbnails"
                                                key={index}
                                                style={{
                                                    margin: "5px 0",
                                                }}
                                            >
                                                <img
                                                    id="thumbnails"
                                                    src={path}
                                                    alt="product"
                                                    width="35px"
                                                    height="35px"
                                                    style={{
                                                        border: "1px solid black",
                                                        cursor: "pointer",
                                                        borderRadius: "4px",
                                                    }}
                                                    onMouseEnter={
                                                        handleThumbnailClick
                                                    }
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="product-image">
                                    <Image
                                        src={mainImage}
                                        alt={product.name}
                                        style={{ margin: "0 1rem 0 0.6rem" }}
                                        fluid
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: &#8377;{formattedPrice}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    &#8377;{formattedPrice}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>
                                                    {product.quantity > 0
                                                        ? "In Stock"
                                                        : "Out Of Stock"}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.quantity > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.quantity
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            disabled={product.quantity === 0}
                                            onClick={addToCartHandler}
                                        >
                                            {product.quantity === 0 && (
                                                <FaBell />
                                            )}

                                            {product.quantity > 0
                                                ? "Add To Cart"
                                                : " Notify Me"}
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
