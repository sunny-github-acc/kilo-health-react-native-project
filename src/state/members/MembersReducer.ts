/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/reducers';
import { MembersReducerInterface } from '@typings/membersTypes';

const INITIAL_STATE: MembersReducerInterface = {
  members: {},
  member: {
    uid: null,
    username: null,
    email: null,
    bio: null,
    location: null,
    image: {
      name: null,
      uri: null,
      temp: null,
    },
    followers: null,
    following: null,
    followersNumber: 0,
    followingNumber: 0,
    creationTime: null,
  },
};

const name = 'members';

const membersSlice = createSlice({
  name,
  initialState: INITIAL_STATE,
  reducers: {
    getMembers: () => {
      //
    },
    getMember: (state, action) => {
      //
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setMember: (state, action) => {
      if (!action.payload) state.member = INITIAL_STATE.member;
      else {
        state.member.username = action.payload.username;
        state.member.uid = action.payload.uid;
        state.member.email = action.payload.email;
        state.member.bio = action.payload.bio;
        state.member.image = action.payload.image;
        state.member.followers = action.payload.followers;
        state.member.following = action.payload.following;
        state.member.creationTime = action.payload.creationTime;
        state.member.location = action.payload.location;
        state.member.followersNumber = action.payload.followersNumber;
        state.member.followingNumber = action.payload.followingNumber;
      }
    },
    setMemberFollowersNumber: (state, action) => {
      state.member.followersNumber = action.payload.followersNumber;
    },
    setMemberFollowingNumber: (state, action) => {
      state.member.followingNumber = action.payload.followingNumber;
    },
  },
});

export const {
  getMembers,
  getMember,
  setMembers,
  setMember,
  setMemberFollowersNumber,
  setMemberFollowingNumber,
} = membersSlice.actions;

export const selectMembers = (state: RootState) => state.members.members;
export const selectMember = (state: RootState) => state.members.member;
export const selectMemberUID = (state: RootState) => state.members.member.uid;
export const selectMemberUsername = (state: RootState) =>
  state.members.member.username;
export const selectMemberImage = (state: RootState) =>
  state.members.member.image;

export default membersSlice.reducer;
