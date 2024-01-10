import express from "express";
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    userForgotPassword,
    userResetPassword,
} from "../controllers/auth.js";
import { addUserAddress, updatUsereAddress } from "../controllers/address.js";
import {
    protect,
    admin,
    resetPassworProtect,
} from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/resetPasswordMail").post(userForgotPassword);
router.route("/resetPassword").put(resetPassworProtect, userResetPassword);
router
    .route("/address")
    .post(protect, addUserAddress)
    .put(protect, updatUsereAddress);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
