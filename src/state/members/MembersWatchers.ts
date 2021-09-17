import { followersChannel, followingChannel, usersChannel } from '@api/index';
import { SYNCING_ENDPOINTS } from '@state/auth/SyncingEndpoints';
import {
  setMember,
  setMemberFollowersNumber,
  setMemberFollowingNumber,
  setMembers,
} from '@state/members/MembersReducer';
import { UserReducerInterface } from '@typings/userTypes';
import i18n from 'i18next';
import * as _ from 'lodash';
import { EventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { setError, setSyncing } from '../auth/AuthReducer';

interface WatchMembersInterface {
  members: { [key: string]: UserReducerInterface };
  error: string;
}

interface WatchMemberInterface {
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

export function* watchMembers() {
  const membersCh: EventChannel<WatchMembersInterface> = yield call(
    usersChannel,
    '',
  );

  try {
    while (true) {
      const { user: members, error } = yield take(
        membersCh as EventChannel<WatchMembersInterface>,
      );

      if (error) {
        yield put(setError(i18n.t(`errorMessages:oops`)));
      } else yield put(setMembers(members));

      yield put(setSyncing({ key: SYNCING_ENDPOINTS.Members, value: false }));
    }
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

export function* watchMember(uid: string) {
  const channel: EventChannel<WatchMemberInterface> = yield call(
    usersChannel,
    uid,
  );

  try {
    while (true) {
      const { user: member, error } = yield take(
        channel as EventChannel<WatchMemberInterface>,
      );

      if (error) {
        yield put(setError(i18n.t(`errorMessages:oops`)));
      } else yield put(setMember(member));

      yield put(setSyncing({ key: SYNCING_ENDPOINTS.Member, value: false }));
    }
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }

  yield put(setSyncing({ key: SYNCING_ENDPOINTS.Member, value: false }));
}

export function* watchMembersFollowers(uid: string) {
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
      } else yield put(setMemberFollowersNumber({ followersNumber }));
    }
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

export function* watchMembersFollowing(uid: string) {
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
      } else yield put(setMemberFollowingNumber({ followingNumber }));
    }
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}
