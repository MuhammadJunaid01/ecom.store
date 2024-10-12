import { ICategory, IGenericResponse } from "@/lib/interfaces";
import { apiSlice } from "./apiSlice";
const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategory[], string>({
      query: (query) => `/products/categories`,
    }),
  }),
});
export const { useGetAllCategoriesQuery } = categoryApiSlice;
