import { IProduct } from "@/lib/interfaces";
import { apiSlice } from "./apiSlice";

type ProductsResponse = {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
};
const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, string>({
      query: (query) => `/products?${query}`,
    }),
  }),
});
export const { useGetAllProductsQuery, useLazyGetAllProductsQuery } =
  productsApiSlice;
