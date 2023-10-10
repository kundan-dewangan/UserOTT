import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { setAuthAsync } from '../async/auth.async';

const initialState = {
  isLoading: false,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(setAuthAsync.pending), (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(isAnyOf(setAuthAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = payload?.data?.data;
    });

    builder.addMatcher(isAnyOf(setAuthAsync.rejected), (state) => {
      state.isLoading = false;
    });  
  },
//   reducers: {},
});

// export const {  } = authSlice.actions;
export const authReducer = authSlice.reducer;
