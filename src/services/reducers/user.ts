import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../types';

const initialState: TUser = {
  name: '',
  email: '',
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSlice(state, action: PayloadAction<any>) {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.success = action.payload.success;
    },
    resetUserSlice: () => initialState,
  },
});

export const { setUserSlice, resetUserSlice } = userSlice.actions;
export default userSlice.reducer;
