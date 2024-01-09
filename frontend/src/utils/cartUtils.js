export const updateCart = (state) => {
    // Calculate item price
    state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    // Calculate Shipping price (If order is over 500 then free, else 100 shipping price)
    state.shippingPrice = state.itemsPrice >= 500 ? 0 : 100;

    // Calculate tax price (15% tax)
    // const taxPrice = Number(0.15 * state.itemsPrice);
    // console.log(taxPrice);

    // const decimal = taxPrice % 1;
    // console.log(decimal);

    // state.taxPrice =
    //     decimal < 0.5 ? Math.floor(taxPrice) : Math.ceil(taxPrice);

    // Calculate total price
    state.totalPrice = Number(state.itemsPrice) + Number(state.shippingPrice);

    localStorage.setItem("cart", JSON.stringify(state));

    console.log(state.itemsPrice);
    console.log(state.shippingPrice);
    console.log(state.totalPrice);

    return state;
};
