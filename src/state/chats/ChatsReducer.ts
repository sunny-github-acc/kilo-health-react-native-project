/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { ChatsReducerInterface } from '@typings/chatsTypes';

import { RootState } from '../reducers';

export const INITIAL_STATE: ChatsReducerInterface = {
  chat: null,
  chatsKeys: {},
};

const name = 'chats';

const chatsSlice = createSlice({
  name,
  initialState: INITIAL_STATE,
  reducers: {
    setChat: (state, action) => {
      if (!action.payload) state = INITIAL_STATE;
      else state.chat = action.payload;
    },
    findChat: (state, action) => {
      //
    },
    sendChat: (state, action) => {
      //
    },
    sendChatsKeys: (state, action) => {
      //
    },
    findChatsKeys: () => {
      //
    },
    setChatsKeys: (state, action) => {
      state.chatsKeys = action.payload;
    },
  },
});

export const {
  setChat,
  findChat,
  sendChat,
  findChatsKeys,
  setChatsKeys,
  sendChatsKeys,
} = chatsSlice.actions;

export const selectChat = (state: RootState) => state.chats.chat;
export const selectChatsKeys = (state: RootState) => state.chats.chatsKeys;

export default chatsSlice.reducer;
