import { database } from '@api/database';
import { PATHS } from '@api/PathNames';
import auth from '@react-native-firebase/auth';
import { SendChatPayloadInterface } from '@typings/chatsTypes';
import { CONSTANTS } from '@utils/constants';
import { eventChannel } from 'redux-saga';

export const getDBChat = async (endpoint: string) =>
  database
    .ref(PATHS.Chats + '/' + endpoint)
    .once(CONSTANTS.Value)
    .then(snapshot => snapshot.val());

export const setDBChat = async ({
  _id,
  uidKey,
  createdAt,
  text,
  user,
}: SendChatPayloadInterface) =>
  database.ref(PATHS.Chats + '/' + uidKey + '/' + createdAt).set({
    _id,
    createdAt,
    text,
    user,
  });

export const setDBChatsKeys = async (uidKey: string) => {
  const userUID = auth().currentUser.uid;
  const memberUID = uidKey.replace(userUID, '');

  database.ref(PATHS.Chats + PATHS.Keys + '/' + userUID).update({
    [memberUID]: uidKey,
  });

  database.ref(PATHS.Chats + PATHS.Keys + '/' + memberUID).update({
    [userUID]: uidKey,
  });
};

export const chatsChannel = (uid = '') => {
  const dbChats = database.ref(PATHS.Chats + '/' + uid);

  return eventChannel(emit => {
    dbChats.on(
      CONSTANTS.Value,
      snapshot => emit({ chats: snapshot.val() }),
      ({ code }: { code: string }) => emit({ error: code }),
    );
    return () => dbChats.off();
  });
};

export const chatsKeysChannel = () => {
  const uid = auth().currentUser.uid;
  const dbChatsKeys = database.ref(PATHS.Chats + PATHS.Keys + '/' + uid);

  return eventChannel(emit => {
    dbChatsKeys.on(
      CONSTANTS.Value,
      snapshot => emit({ chatsKeys: snapshot.val() }),
      ({ code }: { code: string }) => emit({ error: code }),
    );
    return () => dbChatsKeys.off();
  });
};
