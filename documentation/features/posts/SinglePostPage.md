# `SinglePostPage.js`

## Getting post from server

- uses `useGetPostQuery` from `apiSlice`
  ```js
  const {
      data: post,
      isFetching,
      isSuccess
    } = useGetPostQuery(postId)
  ```

  - pass in the `postID` from url params
  - 