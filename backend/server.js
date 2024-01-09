import express from "express";
import cors from "cors";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/userAuth.js";
import sellerAuthRoutes from "./routes/sellerAuth.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running......");
});

app.use("/api/products", productRoutes);
app.use("/api/users", authRoutes);
app.use("/api/sellers", sellerAuthRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
