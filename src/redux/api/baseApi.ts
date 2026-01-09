/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout } from "../features/authSlice";
import { Preferences } from "@capacitor/preferences";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"; 

if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, { getState }) => {
      let token = (getState() as RootState).auth?.token;
      if (!token) {
        const { value } = await Preferences.get({ key: "token" });
        token = value;
      }

      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    api.dispatch(logout());
    console.warn("Session expired. Logging out...");
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
