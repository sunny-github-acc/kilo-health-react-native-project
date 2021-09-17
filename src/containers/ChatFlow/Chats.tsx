import ChatCard from '@components/cards/ChatCard';
import {
  Body,
  BodyLoader,
  SearchButton,
  TextSmallMargin,
  ViewMargin,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { findChatsKeys, selectChatsKeys } from '@state/chats/ChatsReducer';
import { CONSTANTS } from '@utils/constants';
import * as _ from 'lodash';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Chats = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isSyncingChats } = useSelector(selectIsSyncing);
  const chatsKeys = useSelector(selectChatsKeys);

  const chatsKeysArray = _.valuesIn(chatsKeys);

  const renderItem = ({ item }: { item: string }) => (
    <ChatCard chatUID={item} />
  );

  const Content = () =>
    chatsKeysArray.length > 0 ? (
      <FlatList
        data={chatsKeysArray}
        renderItem={renderItem}
        keyExtractor={(chat: string) => chat}
      />
    ) : (
      <TextSmallMargin>{t('main:noChats')}</TextSmallMargin>
    );

  const goToSearch = useCallback(() => {
    navigation.navigate(ROUTES.MemberSearch);
  }, []);

  useEffect(() => {
    dispatch(findChatsKeys());
  }, []);

  return (
    <Body>
      <ViewMargin>
        <SearchButton
          onPress={goToSearch}
          title={t('common:search')}
          icon={CONSTANTS.AccountSearch}
        />
      </ViewMargin>

      {isSyncingChats ? <BodyLoader /> : Content()}
    </Body>
  );
});

Chats.displayName = 'Chats';

export default Chats;
