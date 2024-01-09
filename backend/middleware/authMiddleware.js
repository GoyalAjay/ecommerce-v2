import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Seller from "../models/Seller.js";

// Protected routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read JWT from cookie
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.id).select("-password");
            req.user = await User.findById(decoded.id).select("-password");
            req.seller = await Seller.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized!!, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized!!");
    }
});

const resetPassworProtect = asyncHandler(async (req, res, next) => {
    let token;

    // Read JWT from cookie
    token = req.cookies.rpt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.id).select("-password");
            req.user = await User.findById(decoded.id).select("-password");
            req.seller = await Seller.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized!!, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized!!");
    }
});

// Admin Routes
const admin = (req, res, next) => {
    if (req.admin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not Authorized as admin");
    }
};

export { protect, admin, resetPassworProtect };
