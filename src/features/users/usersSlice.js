/**
 * Slice of redux state in charge of managing global user state
 */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'

import { apiSlice } from '../api/apiSlice'

import { client } from '../../api/client'

export const selectUsersResult = apiSlice.endpoints.getUsers.select()

const emptyUsers = []

export const selectAllUsers = createSelector(
  selectUsersResult,
  usersResult => usersResult?.data ?? emptyUsers
)

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find(user => user.id === userId)
)

const usersAdaptor = createEntityAdapter()

const initialState = usersAdaptor.getInitialState()

export const fetchUsers = createAsyncThunk('users/features', async () => {
  const response = await client.get('fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdaptor.setAll)
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },
})

export default usersSlice.reducer

// export const { selectAll: selectAllUsers, selectById: selectUserById } = 
//   usersAdaptor.getSelectors(state => state.users)