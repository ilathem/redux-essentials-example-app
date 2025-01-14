/**
 * PostSlice.js
 * This is a redux "slice" that will contain the data for our posts.
 */

// use the create slice function to make a reducer function that knows how
// to handle our posts data. Reducer functions need to have some initial data
// included so that the Redux store has those values loaded when the app
// starts up (for know, use an array of fake post objects)
import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
// import { sub } from 'date-fns'
import { client } from '../../api/client'

const postsAdapter = createEntityAdapter({ // for creating the posts entity
  sortComparer: (a, b) => b.date.localeCompare(a.date) // default sorting behavior based on date (newer items first)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    // The Payload creator received the partial {title, content, user} object
    const response = await client.post('/fakeApi/posts', initialPost) // We send the initial data to  the fake API server
    return response.data // The response includes the complete post object, including unique ID
  }
)

// create a new redux slice for posts
const postsSlice = createSlice({
  name: 'posts', // name of the slice
  initialState, // initial state of the slice
  reducers: {
    // define reduces for the slice
    postAdded: {
      // reducer for adding a new post
      // 2 args: state and action, state is the current state,
      // and action is what to do that that state
      // because the posts slice knows only about the data it's responsible for (posts),
      // that's all state consists of in this argument.
      // The action object will have our new post entry as the action.payload field, so
      // we'll put that new post object into the state array
      /**
       * reducers shouldn't generate random values (they wouldn't be testable) or so synchronous calls,
       * so that stuff should go in the prepare callback below
       * @param {current state} state
       * @param {what to do, with next state} action
       */
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      /**
       * prepare is a "prepare callback" that takes multiple arguments, can generate random values
       * like unique ids, and run whatever synchronous logic is needed to decide what values go into
       * the action object. It should then return an object with the payload field inside (may also
       * return a meta field for extra descriptive values and a boolean error field).
       * When accessing this reducer, all we need to supply is the title and the content
       * @param {title of new post} title
       * @param {content of new post} content
       * @returns {action payload with random id} action object  with payload field inside
       */
      prepare(title, content, userId, reactions) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions,
          },
        }
      },
    },
    // add another reducer for updating an existing post
    postUpdated(state, action) {
      /**
       * action.payload should only be 1 object, so in this case, we're expecting action to look like:
       * {
       *  type: 'posts/postUpdated',
       *  payload: {id, title, content}
       * }
       */
      // start by extracting the new post state out of the payload
      const { id, title, content } = action.payload
      // then, find the post that we need to update (based on id)
      const existingPost = state.entities[id]
      // if we can find the post, then update it mutably
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        postsAdapter.upsertMany(state, action.payload) // use the 'upsertMany' reducer as a mutating update utility
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne) // use the 'addOne' reducer for the fulfilled case
  },
})

// create slice will automatically create an action from the reducer
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// export the posts reducer that createSlice generated
export default postsSlice.reducer

// export the customized selectors for this adapter using `getSelectors`
export const { 
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts) // pass in a small selector to tell getSelectors where to look in state

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)
