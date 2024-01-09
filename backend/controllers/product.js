import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetch all products by a specific seller
// @route   GET /api/products/:shopId, /api/:shopId/products
// @access  Public
const getSellerProducts = asyncHandler(async (req, res) => {
    const shopId = req.params.id || req.seller._id;
    const products = await Product.find({ shopId });
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    }

    res.status(404);
    throw new Error("Resource Not Found");
});

export { getProducts, getProductById, getSellerProducts };
