import { setError, setSyncing } from '@state/auth/AuthReducer';
import { SYNCING_ENDPOINTS } from '@state/auth/SyncingEndpoints';
import i18n from 'i18next';
import { fork, put, takeLatest } from 'redux-saga/effects';

import { getMember, getMembers } from './MembersReducer';
import {
  watchMember,
  watchMembers,
  watchMembersFollowers,
  watchMembersFollowing,
} from './MembersWatchers';

function* handleMembers() {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Members, value: true }));

    yield fork(watchMembers);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Members, value: false }));
  }
}

function* handleMember({ payload: uid }: { payload: string }) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Member, value: true }));

    yield fork(watchMember, uid);
    yield fork(watchMembersFollowers, uid);
    yield fork(watchMembersFollowing, uid);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Member, value: false }));
  }
}

export function* membersSaga() {
  yield takeLatest(getMember, handleMember);
  yield takeLatest(getMembers, handleMembers);
}
