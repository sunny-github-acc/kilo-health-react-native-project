import { followersChannel, followingChannel, usersChannel } from '@api/index';
import auth from '@react-native-firebase/auth';
import { SYNCING_ENDPOINTS } from '@state/auth/SyncingEndpoints';
import { setFollowers, setFollowing, setUser } from '@state/user/UserReducer';
import { UserReducerInterface } from '@typings/userTypes';
import i18n from 'i18next';
import * as _ from 'lodash';
import { EventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { setError, setSyncing } from '../auth/AuthReducer';

interface WatchUserInterface {
  user: UserReducerInterface;
  error: string;
}

interface WatchFollowersInterface {
  followers: UserReducerInterface['followers'];
  error: string;
}

interface WatchFollowingInterface {
  following: UserReducerInterface['following'];
  error: string;
}

export function* watchUser() {
  const uid = auth().currentUser && auth().currentUser.uid;

  if (uid) {
    const channel: EventChannel<WatchUserInterface> = yield call(
      usersChannel,
      uid,
    );

    try {
      while (true) {
        const { user, error } = yield take(
          channel as EventChannel<WatchUserInterface>,
        );

        if (error) {
          yield put(setError(i18n.t(`errorMessages:oops`)));
        } else yield put(setUser(user));

        yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: false }));
        yield put(setSyncing({ key: SYNCING_ENDPOINTS.Main, value: false }));
      }
    } catch (error) {
      yield put(setError(i18n.t(`errorMessages:${error.code}`)));
    }
  } else {
    yield put(setUser(null));
  }
  yield put(setSyncing({ key: SYNCING_ENDPOINTS.Auth, value: false }));
  yield put(setSyncing({ key: SYNCING_ENDPOINTS.Main, value: false }));
}

export function* watchFollowers() {
  const uid = auth().currentUser && auth().currentUser.uid;

  if (uid) {
    const followersCh: EventChannel<WatchFollowersInterface> = yield call(
      followersChannel,
      uid,
    );

    try {
      while (true) {
        const { followers, error } = yield take(
          followersCh as EventChannel<WatchFollowersInterface>,
        );
        const followersNumber = followers ? _.keysIn(followers).length : 0;

        if (error) {
          yield put(setError(i18n.t(`errorMessages:${error}`)));
        } else yield put(setFollowers({ followers, followersNumber }));
      }
    } catch (error) {
      yield put(setError(i18n.t(`errorMessages:${error.code}`)));
    }
  }
}

export function* watchFollowing() {
  const uid = auth().currentUser && auth().currentUser.uid;

  if (uid) {
    const followingCh: EventChannel<WatchFollowingInterface> = yield call(
      followingChannel,
      uid,
    );

    try {
      while (true) {
        const { following, error } = yield take(
          followingCh as EventChannel<WatchFollowingInterface>,
        );
        const followingNumber = following ? _.keysIn(following).length : 0;

        if (error) {
          yield put(setError(i18n.t(`errorMessages:${error}`)));
        } else yield put(setFollowing({ following, followingNumber }));
      }
    } catch (error) {
      yield put(setError(i18n.t(`errorMessages:${error.code}`)));
    }
  }
}
