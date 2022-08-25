import { createSlice, PayloadAction  } from '@reduxjs/toolkit'

// Define a type for the slice state
interface Name {
  firstname: string,
  lastname : string
}

interface User {
  id: number
  name: Name,
  email: string,
  username: string
}

interface UserState {
  value: User[]
}

// Define the initial state using that type
const initialState: UserState = {value: []}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<User[]> ) => {
        state.value = action.payload
    },
    deleteUser: (state, action: PayloadAction<number> ) => {
      state.value = state.value.filter(user => user.id !== action.payload)
    },
  }
})

// Action creators are generated for each case reducer function
export const { setAllUsers, deleteUser } = userSlice.actions

export default userSlice.reducer