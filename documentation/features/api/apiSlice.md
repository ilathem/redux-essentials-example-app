# Api Slice Notes
- the logic for managing cached data is centralized into a single "API slice" per application
- In this file, we use a react-specific version of RTK to take advantage of RTK and React integration 
  `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'`
- the application should only have 1 `createApi` call per base url/server ( or you can specify full URLs in each endpoint )

## API Slice Parameters

- there are 2 required fields in `createApi`:
  - `baseQuery`
    - knows how to fetch data from the server
    - `fetchBaseQuery` is a wrapper for `fetch`
  - `endpoints`
    - set of operations we've defined for interacting with the serer
    - can be queries or mutations
    - defined using a callback function that accepts a `builder` parameter and returns an object containing endpoints created with `builder.query()` and/or `builder.mutation()`
- there is also an optional `reducerPath` field
  - defines the top-level state slice field for the generated reducer
  - defaults to 'api' if not specified

## Defining Endpoints

- the base url is defined as `'/fakeApi'` in `fetchBaseQuery`

- all other endpoints will be added to the end of base url

- to get all posts from server:

  - include endpoint called `getPosts` in the builder callback
  - define as a query endpoint using `builder.query`
  - specify the remaining piece of the URL path by defining the `query`, which is a callback that returns the query string `'/posts`

- query endpoints will use a `GET` http request by default

- you can override the default http request by returning an object like
  ```json
  {
  	url: '/posts',
  	method: 'POST',
  	body: newPost
  }
  ```

  instead of the URL string itself in the `query` callback

## Exporting API Slices and Hooks

- typically export the entire API slice because it contains several useful fields
- this time, it exports `useGetPostsQuery` which isn't defined anywhere
- RTK Query's React integration will auto-generate hooks for every endpoint we define
  - they trigger a request when the component mounts, and re-rendering the component as new data is available
  - we can export the hooks out of the API slice for use in the react components
  - auto-generated hook naming conventions:
    - `use` is at the start of any react hook
    - the name of the endpoint is capitalized
    - last part is either `Query` or `Mutation`
