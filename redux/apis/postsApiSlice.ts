import { ICategory, IGenericResponse, IPost } from "@/lib/interfaces";
import { apiSlice } from "./apiSlice";
type PostResponse = {
  limit: number;
  posts: IPost[];
  skip: number;
  total: number;
};
const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostResponse, string>({
      query: (query) => `/posts?${query}`,
    }),
    getPostById: builder.query<IPost, string>({
      query: (blogId) => `/posts/${blogId}`,
    }),
  }),
});
export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} = postsApiSlice;
