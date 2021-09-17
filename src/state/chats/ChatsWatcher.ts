import { chatsChannel, chatsKeysChannel } from '@api/index';
import auth from '@react-native-firebase/auth';
import { SYNCING_ENDPOINTS } from '@state/auth/SyncingEndpoints';
import { setChat, setChatsKeys } from '@state/chats/ChatsReducer';
import { selectMemberImage } from '@state/members/MembersReducer';
import {
  ChatsReducerInterface,
  SendChatPayloadInterface,
} from '@typings/chatsTypes';
import { ImageInterface } from '@typings/userTypes';
import { sortChat } from '@utils/chatFunctions';
import { CONSTANTS } from '@utils/constants';
import i18n from 'i18next';
import * as _ from 'lodash';
import { EventChannel } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';

import { setError, setSyncing } from '../auth/AuthReducer';

interface WatchChatInterface {
  chat: ChatsReducerInterface['chat'];
  error: string;
}

interface WatchChatsKeysInterface {
  chatsKeys: { [key: string]: string };
  error: string;
}

export function* watchChatsKeys() {
  const channel: EventChannel<WatchChatsKeysInterface> = yield call(
    chatsKeysChannel,
  );

  try {
    while (true) {
      const { chatsKeys, error } = yield take(
        channel as EventChannel<WatchChatsKeysInterface>,
      );

      if (error) {
        yield put(setError(i18n.t(`errorMessages:oops`)));
      } else {
        if (chatsKeys) {
          yield put(setChatsKeys(chatsKeys));
        } else {
          yield put(setChatsKeys({}));
        }
      }

      yield put(setSyncing({ key: SYNCING_ENDPOINTS.Chats, value: false }));
    }
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }

  yield put(setSyncing({ key: SYNCING_ENDPOINTS.Chats, value: false }));
}

export function* watchChat(endpoint: string) {
  const channel: EventChannel<WatchChatInterface> = yield call(
    chatsChannel,
    endpoint,
  );

  try {
    while (true) {
      const { chats: chat, error } = yield take(
        channel as EventChannel<WatchChatInterface>,
      );

      if (error) {
        yield put(setError(i18n.t(`errorMessages:oops`)));
      } else {
        if (chat) {
          const uid = auth().currentUser.uid;
          const image: ImageInterface = yield select(selectMemberImage);

          const giftedChat = _.valuesIn(chat).map(
            (c: SendChatPayloadInterface) => ({
              ...c,
              user: {
                _id: c.user === uid ? 1 : 2,
                name: CONSTANTS.ReactNative,
                avatar: image?.uri,
              },
            }),
          );

          yield put(setChat(giftedChat.sort(sortChat)));
        } else {
          yield put(setChat([]));
        }
      }

      yield put(setSyncing({ key: SYNCING_ENDPOINTS.Chat, value: false }));
    }
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }

  yield put(setSyncing({ key: SYNCING_ENDPOINTS.Chat, value: false }));
}
