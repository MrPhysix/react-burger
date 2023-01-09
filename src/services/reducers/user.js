import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSlice(state, action) {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.success = action.payload.success;
    },
    resetUserSlice: () => initialState,
  },
});

export const { setUserSlice, resetUserSlice } = userSlice.actions;
export default userSlice.reducer;
