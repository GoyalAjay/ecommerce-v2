import { USERS_URL } from "../constance";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/resetPasswordMail`,
                method: "POST",
                body: data,
            }),
        }),
        passwordReset: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/resetPassword`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    usePasswordResetMutation,
} = usersApiSlice;
