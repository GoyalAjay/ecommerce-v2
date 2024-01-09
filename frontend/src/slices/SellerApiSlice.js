import { SELLERS_URL } from "../constance";
import { apiSlice } from "./apiSlice";

export const sellerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sellerLogin: builder.mutation({
            query: (data) => ({
                url: `${SELLERS_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
        sellerRegister: builder.mutation({
            query: (data) => ({
                url: `${SELLERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        sellerLogout: builder.mutation({
            query: () => ({
                url: `${SELLERS_URL}/logout`,
                method: "POST",
            }),
        }),
        sellerForgotPassword: builder.mutation({
            query: (data) => ({
                url: `${SELLERS_URL}/resetPasswordMail`,
                method: "POST",
                body: data,
            }),
        }),
        sellerPasswordReset: builder.mutation({
            query: (data) => ({
                url: `${SELLERS_URL}/resetPassword`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useSellerLoginMutation,
    useSellerLogoutMutation,
    useSellerRegisterMutation,
    useSellerForgotPasswordMutation,
    useSellerPasswordResetMutation,
} = sellerApiSlice;
