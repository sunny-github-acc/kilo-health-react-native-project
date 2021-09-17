/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { AuthReducerInterface } from '@typings/authTypes';
import { UserReducerInterface } from '@typings/userTypes';

import { RootState } from '../reducers';

export const INITIAL_STATE: AuthReducerInterface = {
  isSyncing: {
    isSyncingMain: true,
    isSyncingEmail: false,
    isSyncingProfile: false,
    isSyncingMembers: false,
    isSyncingMember: false,
    isSyncingImage: false,
    isSyncingPassword: false,
    isSyncingLocation: false,
    isSyncingEvent: false,
    isSyncingEvents: false,
    isSyncingAuth: false,
    isSyncingChat: false,
  },
  authError: null,
  authSuccess: null,
};

const name = 'auth';

const authSlice = createSlice({
  name,
  initialState: INITIAL_STATE,
  reducers: {
    setSyncing: (state, action) => {
      state.isSyncing[action.payload.key] = action.payload.value;
    },
    checkAuth: () => {
      //
    },
    login: (state, action) => {
      //
    },
    signup: (state, action) => {
      //
    },
    logout: () => {
      //
    },
    recover: (state, action) => {
      //
    },
    setSuccess: (state, action) => {
      state.authSuccess = action.payload;
    },
    setError: (state, action) => {
      state.authError = action.payload;
    },
    clearMessages: state => {
      state.authError = null;
      state.authSuccess = null;
    },
  },
});

export const {
  checkAuth,
  setSyncing,
  login,
  signup,
  recover,
  logout,
  setSuccess,
  setError,
  clearMessages,
} = authSlice.actions;

export const selectIsSyncing = (state: RootState) => state.auth.isSyncing;
export const selectAuthSuccess = (state: RootState) => state.auth.authSuccess;
export const selectAuthError = (state: RootState) => state.auth.authError;

export default authSlice.reducer;
