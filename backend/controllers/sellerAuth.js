import asyncHandler from "../middleware/asyncHandler.js";
import Seller from "../models/Seller.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Auth seller $ get token
// @route   POST /api/users/login
// @access  Public
const authSeller = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (seller && (await seller.matchPassword(password))) {
        generateToken(res, seller._id);

        res.status(200).json({
            _id: seller._id,
            name: seller.firstName + " " + seller.lastName,
            email: seller.email,
            isSeller: seller.isSeller,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc    Register Seller
// @route   POST /api/sellers
// @access  Public
const registerSeller = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        shopName,
        email,
        password,
        phoneNumber,
        street,
        postalCode,
        city,
        country,
        isSeller,
    } = req.body;

    const sellerExists = await Seller.findOne({ email });

    if (sellerExists) {
        res.status(400);
        throw new Error("Email already exists. Please use a different email");
    }

    const seller = await Seller.create({
        firstName,
        lastName,
        shopName,
        email,
        password,
        shopAddress: {
            street,
            postalCode,
            city,
            country,
        },
        phoneNumber,
        isSeller,
    });

    if (seller) {
        generateToken(res, seller._id);
        res.status(201).json({
            _id: seller._id,
            name: seller.firstName + " " + seller.lastName,
            email: seller.email,
            phoneNumber: seller.phoneNumber,
            shopAddress: seller.shopAddress,
        });
    }
});

// @desc    Get user profile
// @route   GET /api/sellers/profile
// @access  Private
const getSellerProfile = asyncHandler(async (req, res) => {
    if (req.seller) {
        const seller = await Seller.findById(req.seller._id);

        if (seller) {
            res.status(200).json({
                _id: seller._id,
                name: seller.firstName + " " + seller.lastName,
                email: seller.email,
                phoneNumber: seller.phoneNumber,
                shopAddress: seller.shopAddress,
                isSeller: seller.isSeller,
            });
        } else {
            res.status(404);
            throw new Error("Seller not found!!!");
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized!!!");
    }
});

// @desc    Update user profile
// @route   PUT /api/sellers/profile
// @access  Private
const updateSellerProfile = asyncHandler(async (req, res) => {
    if (req.seller) {
        const seller = await Seller.findById(req.seller._id);
        if (seller) {
            seller.firstName = req.body.firstName || seller.firstName;
            seller.lastName = req.body.lastName || seller.lastName;
            seller.email = req.body.email || seller.email;
            seller.phoneNumber = req.body.phoneNumber || seller.phoneNumber;

            seller.shopAddress.street =
                req.body.street || seller.shopAddress.street;
            seller.shopAddress.postalCode =
                req.body.postalCode || seller.shopAddress.postalCode;
            seller.shopAddress.city = req.body.city || seller.shopAddress.city;
            seller.shopAddress.country =
                req.body.country || seller.shopAddress.country;

            if (req.body.password) {
                seller.password = req.body.password;
            }

            const updatedSeller = await seller.save();

            res.status(200).json({
                _id: updatedSeller._id,
                name: updatedSeller.firstName + " " + updatedSeller.lastName,
                email: updatedSeller.email,
                shopAddress: updatedSeller.shopAddress,
                isSeller: updatedSeller.isSeller,
            });
        } else {
            res.status(404);
            throw new Error("Seller not found!!!");
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized!!!");
    }
});

// Delete function will only be used in sellers. They can delete their account as a way of closing their shop.
// @desc    Delete user
// @route   DELETE /api/seller/:id
// @access  Private
const deleteSeller = asyncHandler(async (req, res) => {
    res.send("Delete Seller");
});

// @desc    Sends reset password email
// @route   POST /api/sellers/resetPassword
// @access  Public
const sellerForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const seller = await Seller.findOne({ email });
    if (seller) {
        sendEmail(res, seller);
    } else {
        res.status(404);
        throw new Error("Seller not found!!!");
    }
});

const sellerResetPassword = asyncHandler(async (req, res) => {
    if (req.sellerPassword) {
        const seller = await Seller.findById(req.sellerPassword._id);

        seller.password = req.body.password;
        res.cookie("rpt", "", {
            httpOnly: true,
            expires: new Date(0),
        });
    }
});

export {
    authSeller,
    registerSeller,
    getSellerProfile,
    updateSellerProfile,
    deleteSeller,
    sellerForgotPassword,
    sellerResetPassword,
};
