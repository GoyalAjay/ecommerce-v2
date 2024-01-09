import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import HomeScreen from "screens/HomeScreen";
import ProductScreen from "screens/ProductScreen";
import CartScreen from "screens/CartScreen.jsx";
import UserLoginScreen from "screens/UserLoginScreen.jsx";
import SellerLoginScreen from "screens/SellerLoginScreen..jsx";
import UserRegisterScreen from "screens/UserRegisterScreen.jsx";
import SellerRegisterScreen from "screens/SellerRegisterScreen.jsx";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen.jsx";
import PasswordResetScreen from "screens/PasswordResetScreen.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<UserLoginScreen />} />
            <Route path="/seller/login" element={<SellerLoginScreen />} />
            <Route path="/register" element={<UserRegisterScreen />} />
            <Route path="/seller/register" element={<SellerRegisterScreen />} />
            <Route path="/forgotPassword" element={<ForgotPasswordScreen />} />
            <Route path="/resetPassword" element={<PasswordResetScreen />} />
        </Route>
    )
);
const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
