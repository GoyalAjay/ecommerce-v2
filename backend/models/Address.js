import mongoose from "mongoose";

export const addressSchema = mongoose.Schema({
    userId: { type: String, required: true },
    recipientName: { type: String, required: true },
    recipientPhoneNumber: { type: Number, required: true },
    houseNo: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
