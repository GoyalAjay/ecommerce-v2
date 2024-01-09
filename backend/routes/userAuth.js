import express from "express";
const router = express.Router();
import {
    authUser,
    registerUser,
    addAddress,
    updateAddress,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    forgotPassword,
} from "../controllers/auth.js";
import {
    protect,
    admin,
    resetPassworProtect,
} from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/resetPasswordMail").post(forgotPassword);
router.route("/resetPassword").put(resetPassworProtect, updateUserProfile);
router.route("/address").post(protect, addAddress).put(protect, updateAddress);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
