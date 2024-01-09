import express from "express";
import { getProducts, getProductById } from "../controllers/product.js";

const router = express.Router();

router.route("/:id").get(getProductById);
router.route("/").get(getProducts);

export default router;
