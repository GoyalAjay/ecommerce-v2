import asyncHandler from "../middleware/asyncHandler.js";
import Address from "../models/Address.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Seller from "../models/Seller.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Auth user $ get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
        });
    } else if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id);

        res.status(200).json({
            _id: admin._id,
            name: admin.firstName + " " + admin.lastName,
            email: admin.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

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

// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("Email already exists. Please use a different email");
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        savedAddres: [],
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            savedAddres: user.savedAddres,
        });
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
        address,
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
        phoneNumber,
        shopAddress: {
            address,
            city,
            postalCode,
            country,
        },
        isSeller,
    });

    if (seller) {
        generateToken(res, seller._id);
        res.status(201).json({
            _id: seller._id,
            name: seller.firstName + " " + seller.lastName,
            email: seller.email,
            phoneNumber: seller.phoneNumber,
            savedAddres: seller.savedAddres,
        });
    }
});

const addAddress = asyncHandler(async (req, res) => {
    const {
        recipientName,
        recipientPhoneNumber,
        street,
        postalCode,
        city,
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
        street,
        postalCode,
        city,
        country,
    });

    user.savedAddress.push(newAddress);
    await user.save();

    res.status(201).json(newAddress);
});

// @desc    Logout User / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    if (req.user) {
        const user = await User.findById(req.user._id);

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.firstName + " " + user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                savedAddres: user.savedAddress,
            });
        } else {
            res.status(404);
            throw new Error("User not found!!!");
        }
    } else if (req.seller) {
        const seller = await Seller.findById(req.seller._id);

        if (seller) {
            res.status(200).json({
                _id: seller._id,
                name: seller.firstName + " " + seller.lastName,
                email: seller.email,
                shopAddress: seller.shopAddress,
                isSeller: seller.isSeller,
            });
        } else {
            res.status(404);
            throw new Error("Seller not found!!!");
        }
    } else if (req.admin) {
        const admin = await Admin.findById(req.admin._id);

        if (admin) {
            res.status(200).json({
                _id: admin._id,
                name: admin.firstName + " " + admin.lastName,
                email: admin.email,
            });
        } else {
            res.status(404);
            throw new Error("Admin not found!!!");
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized!!!");
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    if (req.user) {
        const user = await User.findById(req.user._id);

        if (user) {
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;

            console.log(res.cookie);

            if (req.body.password) {
                user.password = req.body.password;
                res.cookie("rpt", "", {
                    httpOnly: true,
                    expires: new Date(0),
                });
            }

            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.firstName + " " + user.lastName,
                email: updatedUser.email,
                savedAddres: updatedUser.savedAddress,
            });
        } else {
            res.status(404);
            throw new Error("User not found!!!");
        }
    } else if (req.seller) {
        const seller = await Seller.findById(req.seller._id);
        if (seller) {
            seller.firstName = req.body.firstName || seller.firstName;
            seller.lastName = req.body.lastName || seller.lastName;
            seller.email = req.body.email || seller.email;

            seller.shopAddress.address =
                req.body.address || seller.shopAddress.address;
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
    } else if (req.admin) {
        const admin = await Admin.findById(req.admin._id);

        if (admin) {
            admin.firstName = req.body.firstName || admin.firstName;
            admin.lastName = req.body.lastName || admin.firstName;
            admin.email = req.body.email || admin.firstName;

            if (req.body.password) {
                admin.password = req.body.password;
            }

            const updatedAdmin = await admin.save();

            res.status(200).json({
                _id: updatedAdmin._id,
                name: updatedAdmin.firstName + " " + updatedAdmin.lastName,
                email: updatedAdmin.email,
            });
        } else {
            res.status(404);
            throw new Error("Admin not found!!!");
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized!!!");
    }
});

// @desc    Update user address
// @route   PUT /api/users/address
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
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
        address.street = req.body.street || address.street;
        address.postalCode = req.body.postalCode || address.postalCode;
        address.city = req.body.city || address.city;
        address.country = req.body.country || address.country;

        const updatedAddress = await address.save();
        res.status(200).json(updatedAddress);
    }
});

// @desc    Get users
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("Get Users");
});

// Delete function will only be used in sellers. They can delete their account as a way of closing their shop.
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    res.send("Delete User");
});

// @desc    Sends reset password email
// @route   POST /api/resetPassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        sendEmail(res, user);
    } else {
        res.status(404);
        throw new Error("User not found!!!");
    }
});

export {
    authUser,
    authSeller,
    registerUser,
    registerSeller,
    forgotPassword,
    addAddress,
    updateAddress,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
};
