# `PostsList.js`

## Incorporating Query Hooks

- `useGetPostsQueryHook` replaces `useSelector`, `useDispatch`, `useEffect`, and `fetchPosts()`
- ```js
  const {
      data: posts,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetPostsQuery()
  ```

  - `data` is renamed to `posts` to better describe what it contains
- what is returned from `useGetPostsQuery()`

  - `data` is the actual response from the server, `undefined` until there is a response
  - `isLoading` is a boolean indicating if this hook is currently making the *first* request to the server
    - if the parameters change different data, `isLoading` will remain false
  - `isFetching` is a boolean indicating if the hook is currently making *any* request to the server
  - `isSuccess` is a boolean indicating if the hook has made a successful request and has cached data available (i.e. `data` should be defined now)
  - `isError` is a boolean indicating if the last request had an error
  - `error` is a serialized error object

- if using typescript, don't use object destructuring to ensure type safety

- `sortedPosts`

  - need to initial `posts` to empty array to avoid null pointer errors
    `data: posts = [],`

  - ```js
    const sortedPosts = useMemo(() => {
        return posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
      }, [posts])
    ```

    1.  using memo
       - "React has a built-in hook called useMemo that allows you to memoize expensive functions so that you can avoid calling them on every render. You simple pass in a function and an array of inputs and useMemo will only recompute the memoized value when one of the inputs has changed." 
         https://usehooks.com/useMemo/#:~:text=React%20has%20a%20built%2Din,of%20the%20inputs%20has%20changed.
       - use memo will only run when `posts` changes, instead on every re-render
    2. use the `posts` variable, return the sorted copy whenever `posts` changes
    3. `slice()` will copy the posts
    4. `sort` will sort the copy by newest first
    5. run whenever `posts` changes