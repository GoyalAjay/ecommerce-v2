import { Form, Button, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "components/FormContainer";
import UpdateAddressScreen from "./UpdateAddressScreen";

import React from "react";

const CheckoutScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <FormContainer>
            <h3>Delivery Address</h3>
            {userInfo.savedAddress.length > 0
                ? userInfo.savedAddress.map((address) => (
                      <Row key={address._id}>
                          <Form.Check type="radio" id="shippingAddress">
                              <Form.Check.Input type="radio" />
                              <Form.Check.Label>
                                  {`${address.recipientName} ${address.houseNo}, ${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country} `}{" "}
                                  <UpdateAddressScreen address={address} />
                              </Form.Check.Label>
                          </Form.Check>
                      </Row>
                  ))
                : "Add Address"}
        </FormContainer>
    );
};

export default CheckoutScreen;
