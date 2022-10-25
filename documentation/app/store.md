# `store.js`

- Redux store for incorporating all of the slices defined throughout features to make available throughout the app

## Api

- import from apiSlice
  `import { apiSlice } from '../features/api/apiSlice'`
- add to reducers
  `[apiSlice.reducerPath]: apiSlice.reducer`
  - can reuse the `apiSlice.reducerPath` field as a computed key in the `reducer` parameter to ensure that the caching reducer is added in the right place
- also (**required**) add middleware to manage cache lifetimes and expiration
  `middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)`
  - the api slice middleware usually goes after the other middleware, so calling `getDefaultMiddleWare().concat(apiSlice.middleware)` adds the api slice middleware to the end of the already existing middleware array