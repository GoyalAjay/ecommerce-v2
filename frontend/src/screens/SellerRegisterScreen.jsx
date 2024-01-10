import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "components/FormContainer";
import Loader from "components/Loader";
import { useSellerRegisterMutation } from "slices/SellerApiSlice";
import { setCredentials } from "slices/authSlice";
import { toast } from "react-toastify";

const SellerRegisterScreen = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [shopName, setShopName] = useState("");
    const [street, setStreet] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const country = "India";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [errorClass, setErrorClass] = useState("");
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sellerRegister, { isLoading }] = useSellerRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const handlePhoneNumber = (event) => {
        const numberValidation = event.target.value.slice(0, 10); // Limit to 10 digits
        setPhoneNumber(numberValidation);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match!!");
            return;
        } else {
            if (
                !firstName ||
                !lastName ||
                !street ||
                !postalCode ||
                !city ||
                !state ||
                !email ||
                !password ||
                !confirmPassword ||
                !phoneNumber
            ) {
                setErrorClass("error");
                setIsErrorMessage(true);
                setErrorMessage("can't be empty");
                toast.error("Fields can't be empty.");
                return;
            }
            try {
                const res = await sellerRegister({
                    firstName,
                    lastName,
                    shopName,
                    email,
                    password,
                    street,
                    postalCode,
                    city,
                    state,
                    country,
                    phoneNumber,
                    isSeller: true,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up as a Seller</h1>
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col>
                        <Form.Group controlId="firstName" className="mt-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                className={`form-control ${
                                    firstName ? "" : errorClass
                                }`} // Add error class if empty
                                aria-invalid={!firstName} // Indicate invalid state for assistive technologies
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {!firstName ? (
                                isErrorMessage ? (
                                    <Form.Text
                                        id="firstName"
                                        className="text-danger"
                                    >
                                        First name {errorMessage}
                                    </Form.Text>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName" className="mt-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                className={`form-control ${
                                    lastName ? "" : errorClass
                                }`} // Add error class if empty
                                aria-invalid={!lastName} // Indicate invalid state for assistive technologies
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            ></Form.Control>
                            {!lastName ? (
                                isErrorMessage ? (
                                    <Form.Text
                                        id="lastName"
                                        className="text-danger"
                                    >
                                        Last name {errorMessage}
                                    </Form.Text>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="shopName" className="my-3">
                    <Form.Label>Shop Name</Form.Label>
                    <Form.Control
                        className={`form-control ${shopName ? "" : errorClass}`} // Add error class if empty
                        aria-invalid={!shopName} // Indicate invalid state for assistive technologies
                        type="text"
                        placeholder="Enter Shop name"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                    ></Form.Control>
                    {!shopName ? (
                        isErrorMessage ? (
                            <Form.Text id="shopName" className="text-danger">
                                Shop name {errorMessage}
                            </Form.Text>
                        ) : (
                            ""
                        )
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="street">
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                className={`form-control ${
                                    street ? "" : errorClass
                                }`} // Add error class if empty
                                aria-invalid={!street} // Indicate invalid state for assistive technologies
                                type="text"
                                placeholder="Enter street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            {!street ? (
                                isErrorMessage ? (
                                    <Form.Text
                                        id="street"
                                        className="text-danger"
                                    >
                                        Street {errorMessage}
                                    </Form.Text>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="postalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                className={`form-control ${
                                    postalCode ? "" : errorClass
                                }`} // Add error class if empty
                                aria-invalid={!postalCode} // Indicate invalid state for assistive technologies
                                type="number"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            ></Form.Control>
                            {!postalCode ? (
                                isErrorMessage ? (
                                    <Form.Text
                                        id="postalCode"
                                        className="text-danger"
                                    >
                                        Postal code {errorMessage}
                                    </Form.Text>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="city" className="mt-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                className={`form-control ${
                                    city ? "" : errorClass
                                }`} // Add error class if empty
                                aria-invalid={!city} // Indicate invalid state for assistive technologies
                                type="text"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {!city ? (
                                isErrorMessage ? (
                                    <Form.Text
                                        id="city"
                                        className="text-danger"
                                    >
                                        City {errorMessage}
                                    </Form.Text>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="state" className="mt-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                className={`form-control ${
                                    state ? "" : errorClass
                                }`} // Add error class if empty
                                aria-invalid={!state} // Indicate invalid state for assistive technologies
                                type="text"
                                placeholder="Enter State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            {!state ? (
                                isErrorMessage ? (
                                    <Form.Text
                                        id="state"
                                        className="text-danger"
                                    >
                                        State {errorMessage}
                                    </Form.Text>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="country" className="mt-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" value={country} disabled />
                </Form.Group>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        className={`form-control ${email ? "" : errorClass}`} // Add error class if empty
                        aria-invalid={!email} // Indicate invalid state for assistive technologies
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    {!email ? (
                        isErrorMessage ? (
                            <Form.Text id="email" className="text-danger">
                                Email {errorMessage}
                            </Form.Text>
                        ) : (
                            ""
                        )
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className={`form-control ${password ? "" : errorClass}`} // Add error class if empty
                        aria-invalid={!password} // Indicate invalid state for assistive technologies
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    {!password ? (
                        isErrorMessage ? (
                            <Form.Text id="password" className="text-danger">
                                Password {errorMessage}
                            </Form.Text>
                        ) : (
                            ""
                        )
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="my-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        className={`form-control ${
                            confirmPassword ? "" : errorClass
                        }`} // Add error class if empty
                        aria-invalid={!confirmPassword} // Indicate invalid state for assistive technologies
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                    {!confirmPassword ? (
                        isErrorMessage ? (
                            <Form.Text
                                id="confirmPassword"
                                className="text-danger"
                            >
                                Confirm password {errorMessage}
                            </Form.Text>
                        ) : (
                            ""
                        )
                    ) : (
                        ""
                    )}
                    {password !== confirmPassword ? (
                        <Form.Text id="confirmPassword" className="text-danger">
                            Password don't match
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Group controlId="phoneNumber" className="my-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        className={`form-control ${
                            phoneNumber ? "" : errorClass
                        }`} // Add error class if empty
                        aria-invalid={!phoneNumber} // Indicate invalid state for assistive technologies
                        type="number"
                        placeholder="phone number"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                    ></Form.Control>
                    {!phoneNumber ? (
                        isErrorMessage ? (
                            <Form.Text id="phoneNumber" className="text-danger">
                                Phone number {errorMessage}
                            </Form.Text>
                        ) : (
                            ""
                        )
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    className="mt-2"
                    disabled={isLoading}
                >
                    Sign Up
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    Already a Customer?{" "}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default SellerRegisterScreen;
