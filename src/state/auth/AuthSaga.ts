import {
  asyncCheckUser,
  asyncLogin,
  asyncLogout,
  asyncRecover,
  asyncSignup,
  setDBUser,
} from '@api/index';
import { setChat } from '@state/chats/ChatsReducer';
import { resetEvents } from '@state/events/EventsReducer';
import { setMember } from '@state/members/MembersReducer';
import {
  watchFollowers,
  watchFollowing,
  watchUser,
} from '@state/user/UserWatcher';
import { AuthInterface, RecoverInterface } from '@typings/authTypes';
import i18n from 'i18next';
import { call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  checkAuth,
  login,
  logout,
  recover,
  setError,
  setSuccess,
  setSyncing,
  signup,
} from './AuthReducer';
import { SYNCING_ENDPOINTS } from './SyncingEndpoints';

function* handleCheckAuth() {
  try {
    yield call(asyncCheckUser);

    yield fork(watchUser);
    yield fork(watchFollowers);
    yield fork(watchFollowing);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Main, value: false }));
  }
}

function* handleSignup({ payload }: AuthInterface) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: true }));

    yield call(asyncSignup, payload);

    yield call(setDBUser);

    yield fork(watchUser);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: false }));
  }
}

function* handleLogin({ payload }: AuthInterface) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: true }));

    yield call(asyncLogin, payload);

    yield fork(watchUser);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: false }));
  }
}

function* handleLogout() {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: true }));

    yield call(asyncLogout);

    yield put(setMember(null));
    yield put(resetEvents());
    yield put(setChat(null));

    yield fork(watchUser);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: false }));
  }
}

function* handleRecoverPassword({ payload }: RecoverInterface) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: true }));

    yield call(asyncRecover, payload);

    yield put(setSuccess(i18n.t('login:passwordReset')));
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: false }));
  }
}

export function* authSaga() {
  yield takeLatest(checkAuth, handleCheckAuth);
  yield takeLatest(login, handleLogin);
  yield takeLatest(signup, handleSignup);
  yield takeLatest(recover, handleRecoverPassword);
  yield takeLatest(logout, handleLogout);
}
