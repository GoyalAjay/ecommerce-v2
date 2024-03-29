import { Link, useNavigate } from "react-router-dom";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "slices/cartSlice";
import Message from "components/Message";

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingPrice } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=/checkout");
    };

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty!! <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item?.images[0]}
                                            alt={item.name}
                                            width="100px"
                                            height="100px"
                                            style={{
                                                border: "1px solid lightGrey",
                                            }}
                                            fuild="true"
                                            rounded
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>
                                        &#8377;
                                        {item?.price.toLocaleString("en-IN", {
                                            useGrouping: true,
                                            maximumFractionDigits: 2,
                                        })}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) =>
                                                addToCartHandler(
                                                    item,
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(item.quantity).keys(),
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
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                removeFromCartHandler(item._id)
                                            }
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            {cartItems.length > 0 && (
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    Subtotal (
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )}
                                    ) items
                                </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <p>
                                        Subtotal: &#8377;
                                        {cartItems
                                            .reduce(
                                                (acc, item) =>
                                                    acc + item.price * item.qty,
                                                0
                                            )
                                            .toLocaleString("en-IN", {
                                                useGrouping: true,
                                                maximumFractionDigits: 2,
                                            })}
                                    </p>
                                </Row>
                                <Row>
                                    <p>Shipping Price: {shippingPrice}</p>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed to checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            )}
        </Row>
    );
};

export default CartScreen;
