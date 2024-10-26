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
      providesTags: ["products"],
    }),
    getProductByProductId: builder.query<IProduct, { productId: string }>({
      query: ({ productId }) => `/products/${productId}`,
      providesTags: ["products"],
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useLazyGetProductByProductIdQuery,
} = productsApiSlice;
