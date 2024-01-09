import mongoose from "mongoose";
import bcrypt from "bcrypt";

const sellerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        shopName: {
            type: String,
            required: true,
            unique: true,
            min: 2,
            max: 50,
        },
        shopAddress: {
            street: { type: String, required: true },
            postalCode: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        phoneNumber: { type: Number, required: true, unique: true },
        isSeller: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

sellerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

sellerSchema.pre("save", async function (next) {
    if (!this.isModified(this.password)) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
