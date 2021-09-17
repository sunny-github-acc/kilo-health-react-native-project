import { AuthReducerInterface } from '@typings/authTypes';
import { MembersReducerInterface } from '@typings/membersTypes';
import { ThemeReducerInterface } from '@typings/themeTypes';
import { UserReducerInterface } from '@typings/userTypes';
import { CombinedState, combineReducers } from 'redux';
import { EventsReducerInterface } from '@typings/eventsTypes';
import { ChatsReducerInterface } from '@typings/chatsTypes';

import authSlice from './auth/AuthReducer';
import themeSlice from './theme/ThemeReducer';
import userSlice from './user/UserReducer';
import membersSlice from './members/MembersReducer';
import eventsSlice from './events/EventsReducer';
import chatsSlice from './chats/ChatsReducer';

export interface RootState {
  theme: ThemeReducerInterface;
  auth: AuthReducerInterface;
  user: UserReducerInterface;
  members: MembersReducerInterface;
  events: EventsReducerInterface;
  chats: ChatsReducerInterface;
}

export interface PersistedAppState extends RootState {
  _persist: { version: number; rehydrated: boolean };
}

const rootReducer = combineReducers<CombinedState<RootState>>({
  auth: authSlice,
  user: userSlice,
  theme: themeSlice,
  members: membersSlice,
  events: eventsSlice,
  chats: chatsSlice,
});

export { rootReducer };
