/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    socialAuth: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (email: any) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"],
    }),
    resendOtp: builder.mutation({
      query: (email: any) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data: any) => ({
        url: "/auth/verify-email-with-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: any) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data: any) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getMyCode: builder.query({
      query: () => ({
        url: "/auth/code",
        method: "GET",
      }),
      transformResponse: (response: { data: { inviteCode: string } }) =>
        response.data,
      providesTags: ["User"],
    }),
    connectWithCode: builder.mutation({
      query: () => ({
        url: "/auth/connect",
        method: "POST",
      }),
      providesTags: ["User"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data: any) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSocialAuthMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMyCodeQuery,
  useGetMeQuery,
  useConnectWithCodeMutation,
  useUpdateUserMutation,
} = authApi;
