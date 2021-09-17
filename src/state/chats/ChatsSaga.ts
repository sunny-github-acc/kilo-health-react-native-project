import { setDBChat, setDBChatsKeys } from '@api/index';
import { setError, setSyncing } from '@state/auth/AuthReducer';
import { SYNCING_ENDPOINTS } from '@state/auth/SyncingEndpoints';
import { SendChatInterface } from '@typings/chatsTypes';
import i18n from 'i18next';
import { call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  findChat,
  findChatsKeys,
  sendChat,
  sendChatsKeys,
} from './ChatsReducer';
import { watchChat, watchChatsKeys } from './ChatsWatcher';

function* handleFindChat({ payload }: { payload: string }) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Chat, value: true }));

    yield fork(watchChat, payload);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Chat, value: true }));
  }
}

function* handleSendChat({ payload }: SendChatInterface) {
  try {
    yield call(setDBChat, payload);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

function* handleChatsKeys({ payload }: { payload: string }) {
  try {
    yield call(setDBChatsKeys, payload);

    yield fork(watchChatsKeys);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

function* handleFindChatsKeys() {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Chats, value: true }));

    yield fork(watchChatsKeys);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

export function* chatsSaga() {
  yield takeEvery(findChat, handleFindChat);
  yield takeEvery(sendChat, handleSendChat);
  yield takeEvery(sendChat, handleSendChat);
  yield takeEvery(sendChatsKeys, handleChatsKeys);
  yield takeEvery(findChatsKeys, handleFindChatsKeys);
}
