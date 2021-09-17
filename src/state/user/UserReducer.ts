/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { UserReducerInterface } from '@typings/userTypes';
import { CONSTANTS } from '@utils/constants';

import { RootState } from '../reducers';

export const INITIAL_STATE: UserReducerInterface = {
  uid: null,
  username: null,
  email: null,
  bio: null,
  location: null,
  image: {
    name: null,
    uri: CONSTANTS.DefaultImage,
    temp: null,
  },
  modal: null,
  followers: null,
  following: null,
  followersNumber: 0,
  followingNumber: 0,
  creationTime: null,
  editProfileSubmit: null,
  updateEmailSubmit: null,
  changePasswordSubmit: null,
  deleteAccountSubmit: null,
};

const name = 'user';

const userSlice = createSlice({
  name,
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      if (!action.payload) return (state = INITIAL_STATE);

      if (action.payload.image) state.image = action.payload.image;

      state.username = action.payload.username;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
      state.creationTime = action.payload.creationTime;
      state.location = action.payload.location;
      state.modal = action.payload.modal;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setFollow: (state, action) => {
      //
    },
    setFollowers: (state, action) => {
      state.followers = action.payload.followers;
      state.followersNumber = action.payload.followersNumber;
    },
    setFollowing: (state, action) => {
      state.following = action.payload.following;
      state.followingNumber = action.payload.followingNumber;
    },
    setValue: (state, action) => {
      //
    },
    setImage: (state, action) => {
      state.image.name = action.payload.name;
      state.image.uri = action.payload.uri;
    },
    setImageTemp: (state, action) => {
      state.image.temp = action.payload;
    },
    uploadImage: (state, action) => {
      //
    },
    hideModal: (state, action) => {
      state.modal = action.payload;
    },
    setModal: (state, action) => {
      //
    },
    setEmail: (state, action) => {
      //
    },
    setPassword: (state, action) => {
      //
    },
    deleteAccount: (state, action) => {
      //
    },
    setEditProfileSubmit: (state, action) => {
      state.editProfileSubmit = action.payload;
    },
    setUpdateEmailSubmit: (state, action) => {
      state.updateEmailSubmit = action.payload;
    },
    setChangePasswordSubmit: (state, action) => {
      state.changePasswordSubmit = action.payload;
    },
    setDeleteAccountSubmit: (state, action) => {
      state.deleteAccountSubmit = action.payload;
    },
  },
});

export const {
  setUser,
  setLocation,
  setFollow,
  setFollowers,
  setFollowing,
  setValue,
  setImage,
  hideModal,
  setModal,
  setImageTemp,
  uploadImage,
  setEmail,
  setPassword,
  deleteAccount,
  setEditProfileSubmit,
  setUpdateEmailSubmit,
  setChangePasswordSubmit,
  setDeleteAccountSubmit,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUsername = (state: RootState) => state.user.username;
export const selectBio = (state: RootState) => state.user.bio;
export const selectUID = (state: RootState) => state.user.uid;
export const selectModal = (state: RootState) => state.user.modal;
export const selectLocation = (state: RootState) => state.user.location;
export const selectFollowing = (state: RootState) => state.user.following;
export const selectImage = (state: RootState) => state.user.image;
export const selectChangePasswordSubmit = (state: RootState) =>
  state.user.changePasswordSubmit;
export const selectDeleteAccountSubmit = (state: RootState) =>
  state.user.deleteAccountSubmit;
export const selectEditProfileSubmit = (state: RootState) =>
  state.user.editProfileSubmit;
export const selectUpdateEmailSubmit = (state: RootState) =>
  state.user.updateEmailSubmit;

export default userSlice.reducer;
