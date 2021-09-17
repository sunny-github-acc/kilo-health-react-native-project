import MemberCard from '@components/cards/MemberCard';
import {
  Body,
  BodyLoader,
  SearchButton,
  TextSmallMargin,
  ViewFlex1,
  ViewMargin,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { getMembers, selectMembers } from '@state/members/MembersReducer';
import { selectUID } from '@state/user/UserReducer';
import { UserReducerInterface } from '@typings/userTypes';
import { CONSTANTS } from '@utils/constants';
import * as _ from 'lodash';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Members = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isSyncingMembers } = useSelector(selectIsSyncing);
  const members = useSelector(selectMembers) || {};
  const uid = useSelector(selectUID);

  const membersArray = _.valuesIn(members);

  const renderItem = ({ item }: { item: UserReducerInterface }) => {
    if (uid === item.uid) return null;

    return <MemberCard member={item} />;
  };

  const Content = () =>
    membersArray.length > 1 ? (
      <FlatList
        data={membersArray}
        renderItem={renderItem}
        keyExtractor={(member: UserReducerInterface) => member.uid}
      />
    ) : (
      <TextSmallMargin>{t('main:noMembers')}</TextSmallMargin>
    );

  const goToSearch = useCallback(() => {
    navigation.navigate(ROUTES.MemberSearch);
  }, []);

  useEffect(() => {
    dispatch(getMembers());
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

      <ViewFlex1>{isSyncingMembers ? <BodyLoader /> : Content()}</ViewFlex1>
    </Body>
  );
});

Members.displayName = 'Members';

export default Members;
