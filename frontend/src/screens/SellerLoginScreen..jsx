import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "components/FormContainer";
import Loader from "components/Loader";
import { useSellerLoginMutation } from "slices/SellerApiSlice";
import { setCredentials } from "slices/authSlice";
import { toast } from "react-toastify";

const SellerLoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorClass, setErrorClass] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sellerLogin, { isLoading }] = useSellerLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const redirect = "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await sellerLogin({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            setErrorClass("error");
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Sign In as a Seller</h1>
            <Form onSubmit={submitHandler}>
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
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    className="mt-2"
                    disabled={isLoading}
                >
                    Sign In
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    New Seller? <Link to={"/seller/register"}>Register</Link>
                </Col>
                <Col style={{ textAlign: "end" }}>
                    <Link to={"/forgotPassword"}>Forgot Password?</Link>
                </Col>
            </Row>
            A customer on Ecommerce? <Link to={"/login"}>Login</Link>
        </FormContainer>
    );
};

export default SellerLoginScreen;
