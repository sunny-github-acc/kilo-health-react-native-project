import { Body, BodyLoader, ViewMargin05 } from '@components/index';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import {
  findChat,
  selectChat,
  sendChat,
  sendChatsKeys,
} from '@state/chats/ChatsReducer';
import { setFab } from '@state/events/EventsReducer';
import {
  selectMemberImage,
  selectMemberUID,
} from '@state/members/MembersReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { uidString } from '@utils/chatFunctions';
import { CONSTANTS } from '@utils/constants';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import {
  Bubble,
  Composer,
  Day,
  GiftedChat,
  Time,
} from 'react-native-gifted-chat';
import { Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

const Chat = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isSyncingChat } = useSelector(selectIsSyncing);
  const image = useSelector(selectMemberImage);
  const memberUID = useSelector(selectMemberUID);
  const theme = useSelector(selectTheme);
  const chat = useSelector(selectChat);

  const [messages, setMessages] = useState([]);

  const uid = auth().currentUser.uid;
  const uidKey = uidString({ uid, memberUID });

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    dispatch(
      sendChat({
        // eslint-disable-next-line no-underscore-dangle
        _id: messages[0]._id,
        uidKey,
        createdAt: messages[0].createdAt.getTime(),
        text: messages[0].text,
        user: uid,
      }),
    );
  }, []);

  const handleSend = useCallback(props => {
    props.onSend({ text: props.text.trim() }, true);
  }, []);

  const goToMember = useCallback(() => {
    navigation.navigate(ROUTES.MemberProfile);

    dispatch(setFab(true));
  }, []);

  useEffect(() => {
    setMessages(chat);
  }, [chat]);

  useEffect(() => {
    dispatch(sendChatsKeys(uidKey));

    dispatch(findChat(uidKey));
  }, []);
  return (
    <Body>
      {isSyncingChat ? (
        <BodyLoader />
      ) : (
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          isTyping={true}
          placeholder={t('chats:chatPlaceholder')}
          onPressAvatar={() => null}
          renderSend={props => (
            <TouchableOpacity onPress={() => handleSend(props)}>
              <ViewMargin05>
                <MaterialCommunityIcons
                  size={35}
                  color={theme.colors.secondary}
                  name={CONSTANTS.Send}
                />
              </ViewMargin05>
            </TouchableOpacity>
          )}
          renderAvatar={() => (
            <TouchableOpacity onPress={goToMember}>
              <Avatar.Image
                source={{
                  uri: image?.uri,
                }}
                size={40}
              />
            </TouchableOpacity>
          )}
          renderComposer={props1 => (
            <Composer
              {...props1}
              textInputStyle={{ color: theme.colors.grey }}
            />
          )}
          renderTime={props => (
            <Time
              {...props}
              timeTextStyle={{
                left: {
                  color: theme.colors.white40,
                },
                right: {
                  color: theme.colors.white40,
                },
              }}
            />
          )}
          renderDay={props => (
            <Day {...props} textStyle={{ color: theme.colors.white40 }} />
          )}
          renderBubble={props => (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: theme.colors.white20,
                },
                left: {
                  color: theme.colors.white20,
                },
              }}
              wrapperStyle={{
                right: {
                  backgroundColor: theme.colors.secondary20,
                },
                left: {
                  backgroundColor: theme.colors.secondary,
                },
              }}
            />
          )}
        />
      )}
    </Body>
  );
});

Chat.displayName = 'Chat';

export default Chat;
