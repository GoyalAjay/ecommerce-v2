import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "components/FormContainer";
import Loader from "components/Loader";
import { useForgotPasswordMutation } from "slices/usersApiSlice";
import { setCredentials } from "slices/authSlice";
import { toast } from "react-toastify";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await forgotPassword({ email }).unwrap();
            toast.success("A reset password email has been sent.");
            navigate("/login");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Forgot Password</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="recoveryEmail" className="my-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    <Form.Text id="recoveryEmail" muted>
                        Provide your registered email. A reset password link
                        will be shared to you on your email.
                    </Form.Text>
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    className="mt-2"
                    disabled={isLoading}
                >
                    Send Email
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        Remember your password?
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default ForgotPasswordScreen;
