/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvatarSecondary } from '@components/images/Image';
import { TextPrimary } from '@components/texts/Texts';
import {
  ViewMarginHorizontal,
  ViewRowCenteredVertical,
} from '@components/views/Views';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { setFab } from '@state/events/EventsReducer';
import {
  selectMemberImage,
  selectMemberUsername,
  setMember,
} from '@state/members/MembersReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

export const MemberCardHeader = memo(({ path }: { path: string }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isSyncingMember } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);
  const username = useSelector(selectMemberUsername);
  const image = useSelector(selectMemberImage);

  const goToMembers = useCallback(() => {
    dispatch(setMember(null));

    navigation.navigate(path);

    dispatch(setFab(false));
  }, []);

  const goToMember = useCallback(() => {
    navigation.navigate(ROUTES.MemberProfile);

    dispatch(setFab(true));
  }, []);

  return (
    <Header>
      <Appbar.BackAction onPress={goToMembers} color={theme.colors.white} />

      {isSyncingMember ? (
        <ActivityIndicator animating={true} color={theme.colors.white20} />
      ) : (
        <TouchableOpacity onPress={goToMember}>
          <ViewRowCenteredVertical>
            <AvatarSecondary
              source={{
                uri: image?.uri,
              }}
              size={40}
            />

            <ViewMarginHorizontal>
              <TextPrimary>{username}</TextPrimary>
            </ViewMarginHorizontal>
          </ViewRowCenteredVertical>
        </TouchableOpacity>
      )}
    </Header>
  );
});

MemberCardHeader.displayName = 'MemberCardHeader';

const Header = styled(Appbar.Header)`
  background: ${props => props.theme.colors.secondary};
`;
