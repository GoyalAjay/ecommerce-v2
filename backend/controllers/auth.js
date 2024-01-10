import asyncHandler from "../middleware/asyncHandler.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
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
            savedAddress: user.savedAddress,
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
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.firstName + " " + user.lastName,
                email: updatedUser.email,
                phone: updatedUser.phoneNumber,
            });
        } else {
            res.status(404);
            throw new Error("User not found!!!");
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

// @desc    Get users
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("Get Users");
});

// @desc    Sends reset password email
// @route   POST /api/users/resetPassword
// @access  Public
const userForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        sendEmail(res, user);
    } else {
        res.status(404);
        throw new Error("User not found!!!");
    }
});

const userResetPassword = asyncHandler(async (req, res) => {
    if (req.userPassword) {
        const user = await User.findById(req.userPassword._id);

        user.password = req.body.password;
        res.cookie("rpt", "", {
            httpOnly: true,
            expires: new Date(0),
        });
    }
});

export {
    authUser,
    registerUser,
    userForgotPassword,
    userResetPassword,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
};
