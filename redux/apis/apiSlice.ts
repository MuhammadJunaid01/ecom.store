/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";

const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: `${process.env.EXPO_PUBLIC_MAIN_API_URL}`,
  // prepareHeaders: (headers, { getState }) => {
  //   const accessToken = (getState() as RootState).auth.accessToken;
  //   if (accessToken) {
  //     headers.set("authorization", `Bearer ${accessToken}`);
  //   }
  //   headers.set("businessId", `6534d49defce8922e7ad550b`);
  //   return headers;
  // },

  // credentials: "include",
});
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult: any = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );
    //   if (refreshResult?.data?.data?.accessToken) {
    //     // store the new token

    //     api.dispatch(
    //       setCredentials({
    //         user: refreshResult?.data?.data?.user,
    //         accessToken: refreshResult?.data?.data?.accessToken,
    //       })
    //     );
    //     // retry the original query with the new access token
    //     result = await baseQuery(args, api, extraOptions);
    //   } else {
    //     api.dispatch(logOut());
    //   }
  }

  return result;
};
export const apiSlice = createApi({
  tagTypes: [],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
