import mongoose from "mongoose";
import "dotenv/config.js";
import { admin, users, sellers } from "./data/users.js";
import products from "./data/products.js";
import Admin from "./models/Admin.js";
import User from "./models/User.js";
import Seller from "./models/Seller.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
    try {
        await Admin.deleteMany();
        await User.deleteMany();
        await Seller.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createAdmin = await Admin.insertMany(admin);
        const createUsers = await User.insertMany(users);
        const createSellers = await Seller.insertMany(sellers);

        // const createUsers = await User.insertMany(users);

        const sampleProducts = products.map((product) => {
            const random = Math.floor(
                Math.random() * (createSellers.length - 0) + 0
            );
            const shopId = createSellers[random]._id;
            const shopName = createSellers[random].shopName;

            return { ...product, shopId: shopId, shopName: shopName };
        });

        await Product.insertMany(sampleProducts);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Admin.deleteMany();
        await User.deleteMany();
        await Seller.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
