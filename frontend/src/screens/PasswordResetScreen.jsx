import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "components/FormContainer";
import Loader from "components/Loader";
import { usePasswordResetMutation } from "slices/usersApiSlice";
import { setCredentials } from "slices/authSlice";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";

const PasswordResetScreen = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const cookieValue = Cookies.get("rpt");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordReset, { isLoading }] = usePasswordResetMutation();

    if (cookieValue !== null) {
        toast.error("The session has been expired.");
        navigate("/login");
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match!!");
            return;
        } else {
            try {
                const res = await passwordReset({
                    password,
                }).unwrap();
                toast.success("Password has been reset. Please login again.");
                navigate("/login");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <FormContainer>
            <h1>Reset Password</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="my-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    className="mt-2"
                    disabled={isLoading}
                >
                    Reset Password
                </Button>
                {isLoading && <Loader />}
            </Form>
        </FormContainer>
    );
};

export default PasswordResetScreen;
