import { useState } from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function UpdateAddressScreen(props) {
    const [show, setShow] = useState(false);
    const [fullname, setFullName] = useState(props.address.recipientName);
    const [phoneNumber, setPhoneNumber] = useState(
        props.address.recipientPhoneNumber
    );
    const [houseNo, setHouseNo] = useState(props.address.houseNo);
    const [street, setStreet] = useState(props.address.street);
    const [postalCode, setPostalCode] = useState(props.address.postalCode);
    const [city, setCity] = useState(props.address.city);
    const [state, setState] = useState(props.address.state);
    const country = props.address.country;

    const handlePhoneNumber = (event) => {
        const numberValidation = event.target.value.slice(0, 10); // Limit to 10 digits
        setPhoneNumber(numberValidation);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Link variant="primary" onClick={handleShow}>
                Edit address
            </Link>

            <Modal size="lg" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update your shipping address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Edit your address</h2>
                    <Form>
                        <Form.Group controlId="country" className="my-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                value={country}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="recipientName">
                            <Form.Label>
                                Full name (First and Last name)
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={fullname}
                                value={fullname}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="recipientMobileNumber"
                        >
                            <Form.Label>Mobile number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={phoneNumber}
                                value={phoneNumber}
                                onChange={handlePhoneNumber}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postalCode">
                            <Form.Label>Postal code</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={postalCode}
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="houseNo">
                            <Form.Label>
                                Flat, House no., Building, Company, Apartment
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={houseNo}
                                value={houseNo}
                                onChange={(e) => setHouseNo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="street">
                            <Form.Label>
                                Area, Street, Sector, Village
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={street}
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="city">
                                    <Form.Label>Town/City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={city}
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="state">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={state}
                                        value={state}
                                        onChange={(e) =>
                                            setState(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        style={{
                            backgroundColor: "#7b8a8b",
                            border: "1px solid #7b8a8b",
                        }}
                        onClick={handleClose}
                    >
                        Use this address
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateAddressScreen;
