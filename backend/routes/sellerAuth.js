import express from "express";
const router = express.Router();
import {
    authSeller,
    registerSeller,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
} from "../controllers/auth.js";
import { getSellerProducts } from "../controllers/product.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerSeller);

router.post("/login", authSeller);
router.post("/logout", logoutUser);
router.route("/products").get(protect, getSellerProducts);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.route("/:id").delete(protect, deleteUser);

export default router;
