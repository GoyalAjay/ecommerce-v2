import asyncHandler from "../middleware/asyncHandler.js";
import Address from "../models/Address.js";
import User from "../models/User.js";
import Seller from "../models/Seller.js";

const addUserAddress = asyncHandler(async (req, res) => {
    const {
        recipientName,
        recipientPhoneNumber,
        houseNo,
        street,
        postalCode,
        city,
        state,
        country,
    } = req.body;
    const user = await User.findById(req.user._id);

    const phoneNumberExist = await Address.findOne({
        userId: req.user._id,
        recipientPhoneNumber,
    });

    if (phoneNumberExist) {
        res.status(400);
        throw new Error(
            "An address linked to that phone number already exists. Please use a different phone number"
        );
    }

    const newAddress = await Address.create({
        userId: req.user._id,
        recipientName,
        recipientPhoneNumber,
        houseNo,
        street,
        postalCode,
        city,
        state,
        country,
    });

    user.savedAddress.push(newAddress);
    await user.save();

    res.status(201).json(newAddress);
});

// @desc    Update user address
// @route   PUT /api/users/address
// @access  Private
const updatUsereAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const address = await Address.findById(req.body.addressId);
    const existedPhoneNummber = await Address.findOne({
        recipientPhoneNumber: req.body.recipientPhoneNumber,
    });

    if (existedPhoneNummber) {
        res.status(400);
        throw new Error(
            "An address linked to that phone number already exists. Please use a different phone number"
        );
    }

    if (address) {
        address.recipientName = req.body.recipientName || address.recipientName;
        address.recipientPhoneNumber =
            req.body.recipientPhoneNumber || address.recipientPhoneNumber;
        address.houseNo = req.body.houseNo || address.houseNo;
        address.street = req.body.street || address.street;
        address.postalCode = req.body.postalCode || address.postalCode;
        address.city = req.body.city || address.city;
        address.state = req.body.state || address.state;
        address.country = req.body.country || address.country;

        const updatedAddress = await address.save();
        res.status(200).json(updatedAddress);
    }
});

export { addUserAddress, updatUsereAddress };
