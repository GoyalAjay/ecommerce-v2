import express from "express";
const router = express.Router();
import {
    authSeller,
    registerSeller,
    getSellerProfile,
    updateSellerProfile,
    deleteSeller,
    sellerForgotPassword,
    sellerResetPassword,
} from "../controllers/sellerAuth.js";
import { logoutUser } from "../controllers/auth.js";
import { getSellerProducts } from "../controllers/product.js";
import { protect, resetPassworProtect } from "../middleware/authMiddleware.js";

router.route("/").post(registerSeller);
router.post("/login", authSeller);
router.route("/resetPasswordMail").post(sellerForgotPassword);
router.route("/resetPassword").put(resetPassworProtect, sellerResetPassword);
router.post("/logout", logoutUser);
router.route("/products").get(protect, getSellerProducts);
router
    .route("/profile")
    .get(protect, getSellerProfile)
    .put(protect, updateSellerProfile);
router.route("/:id").delete(protect, deleteSeller);

export default router;
