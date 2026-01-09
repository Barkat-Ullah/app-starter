import { baseApi } from "./baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
} = authApi;

export default authApi;
