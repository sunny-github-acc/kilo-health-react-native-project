import { database } from '@api/database';
import { PATHS } from '@api/PathNames';
import auth from '@react-native-firebase/auth';
import {
  GetFollowInterface,
  SetFollowPayloadInterface,
} from '@typings/userTypes';
import { CONSTANTS } from '@utils/constants';
import { eventChannel } from 'redux-saga';
import * as _ from 'lodash';
import { avatars } from '@assets/data/avatars';
import { usernames } from '@assets/data/usernames';

const uid = auth()?.currentUser?.uid;

export const setDBUser = async () => {
  type AvatarKeysTypes = keyof typeof avatars;
  type UsernamesKeysTypes = keyof typeof usernames.firstName;

  const randomNumber = (Math.round(Math.random() * 6) +
    1) as UsernamesKeysTypes;
  const randomNumber2 = (Math.round(Math.random() * 6) +
    1) as UsernamesKeysTypes;
  const randomNumber3 = (Math.round(Math.random() * 6) + 1) as AvatarKeysTypes;

  const {
    email,
    uid,
    metadata: { creationTime },
  } = auth().currentUser;

  await database.ref(PATHS.Users + '/' + uid).set({
    email,
    uid,
    username:
      usernames.firstName[randomNumber] + usernames.lastName[randomNumber2],
    creationTime,
    image: { uri: avatars[randomNumber3] },
    followersNumber: 0,
    followingNumber: 0,
    modal: true,
  });
};

export const getDBUser = async (uid: string) => {
  let user = {};

  await database
    .ref(PATHS.Users + '/' + uid)
    .once(CONSTANTS.Value)
    .then(snapshot => (user = { ...user, ...snapshot.val() }));

  await database
    .ref(PATHS.Followers + '/' + uid)
    .once(CONSTANTS.Value)
    .then(snapshot => {
      const followersNumber = snapshot.val()
        ? _.keysIn(snapshot.val()).length
        : 0;

      user = { ...user, following: snapshot.val(), followersNumber };
    });

  await database
    .ref(PATHS.Following + '/' + uid)
    .once(CONSTANTS.Value)
    .then(snapshot => {
      const followingNumber = snapshot.val()
        ? _.keysIn(snapshot.val()).length
        : 0;

      user = { ...user, following: snapshot.val(), followingNumber };
    });

  return user;
};

export const setDBModal = async (modal: boolean) =>
  database.ref(PATHS.Users + '/' + uid).update({
    modal,
  });

export const setDBFollow = async ({
  uid,
  path,
  key,
  value,
}: SetFollowPayloadInterface) =>
  database.ref(path + '/' + uid).update({
    [key]: value,
  });

export const getDBFollow = async ({ userUID, path }: GetFollowInterface) =>
  database
    .ref(path + '/' + userUID)
    .once(CONSTANTS.Value)
    .then(snapshot => ({ [path]: snapshot.val() }));

export const deleteDBUser = async () =>
  database.ref(PATHS.Users + '/' + uid).remove();

export const usersChannel = (uid: string) => {
  const db = database.ref(PATHS.Users + '/' + uid);

  return eventChannel(emit => {
    db.on(
      CONSTANTS.Value,
      snapshot => emit({ user: snapshot.val() }),
      ({ code }: { code: string }) => emit({ error: code }),
    );
    return () => db.off();
  });
};

export const followersChannel = (uid: string) => {
  const dbFolowers = database.ref(PATHS.Followers + '/' + uid);

  return eventChannel(emit => {
    dbFolowers.on(
      CONSTANTS.Value,
      snapshot => emit({ followers: snapshot.val() }),
      ({ code }: { code: string }) => emit({ error: code }),
    );
    return () => dbFolowers.off();
  });
};

export const followingChannel = (uid: string) => {
  const dbFollowing = database.ref(PATHS.Following + '/' + uid);

  return eventChannel(emit => {
    dbFollowing.on(
      CONSTANTS.Value,
      snapshot => emit({ following: snapshot.val() }),
      ({ code }: { code: string }) => emit({ error: code }),
    );
    return () => dbFollowing.off();
  });
};
