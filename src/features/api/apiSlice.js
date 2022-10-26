import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post']
    }),
    getPost: builder.query({
      query: postId => `/posts/${postId}`
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: initialPost
      }),
      invalidatesTags: ['Post']
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { 
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation
} = apiSlice