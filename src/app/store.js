/**
 * Every time we create a new slice, we need to add its reducer function to the Redux store
 */
import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postSlice'

export default configureStore({
  reducer: {
    // this tells redux that we want our top-level state object to have a field named 'posts',
    // all the data for our state.posts will be updated by the postsReducer function when actions are dispatched
    posts: postsReducer, 
  },
})
