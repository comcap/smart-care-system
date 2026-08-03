import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  identifier: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  identifier: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ identifier: string }>) {
      state.identifier = action.payload.identifier
      state.isAuthenticated = true
    },
    logout(state) {
      state.identifier = null
      state.isAuthenticated = false
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer

export const selectIsAuthenticated = (state: {
  auth: AuthState
}): boolean => {
  return state.auth.isAuthenticated
}
