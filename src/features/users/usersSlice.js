/**
 * Slice of redux state in charge of managing global user state
 */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

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

export const { selectAll: selectAllUsers, selectById: selectUserById } = 
  usersAdaptor.getSelectors(state => state.users)