/**
 * PostSlice.js
 * This is a redux "slice" that will contain the data for our posts.
 */

// use the create slice function to make a reducer function that knows how
// to handle our posts data. Reducer functions need to have some initial data
// included so that the Redux store has those values loaded when the app 
// starts up (for know, use an array of fake post objects)
import { createSlice } from '@reduxjs/toolkit';

// define initial posts array data
const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post!', content: 'More text' }
]

// create a new redux slice for posts
const postsSlice = createSlice({
  name: 'posts', // name of the slice
  initialState, // initial state of the slice
  reducers: { // define reduces for the slice
    // reducer for adding a new post
    // 2 args: state and action, state is the current state,
    // and action is what to do that that state
    // because the posts slice knows only about the data it's responsible for (posts), 
    // that's all state consists of in this argument.
    // The action object will have our new post entry as the action.payload field, so 
    // we'll put that new post object into the state array
    postAdded(state, action) {
      state.push(action.payload); // only mutate state inside of createSlice
    }
  } 
})

// create slice will automatically create an action from the reducer
export const { postAdded } = postsSlice.actions

// export the posts reducer that createSlice generated
export default postsSlice.reducer