/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextPrimary, TextSmallBold } from '@components/texts/Texts';
import { ViewRowSpaceBetween } from '@components/views/Views';
import { useNavigation } from '@react-navigation/native';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { setSelectedLocation } from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import {
  selectEditProfileSubmit,
  setEditProfileSubmit,
} from '@state/user/UserReducer';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

export const EditProfileHeader = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isSyncingAuth } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);
  const editProfileSubmit = useSelector(selectEditProfileSubmit);

  const goBack = useCallback(() => {
    navigation.goBack();

    dispatch(setEditProfileSubmit(null));

    dispatch(setSelectedLocation(null));
  }, []);

  const handleSave = () => {
    if (!isSyncingAuth) editProfileSubmit();
  };

  return (
    <Header>
      <Appbar.BackAction onPress={goBack} color={theme.colors.white20} />

      <ViewSpaceBetween>
        <TextPrimary>{t('profile:editProfile')}</TextPrimary>

        <ButtonSave onPress={handleSave}>
          <TextSmallBold>{t('profile:save')}</TextSmallBold>
        </ButtonSave>
      </ViewSpaceBetween>
    </Header>
  );
});

EditProfileHeader.displayName = 'EditProfileHeader';

const Header = styled(Appbar.Header)`
  background: ${props => props.theme.colors.secondary};
`;

const ButtonSave = styled(TouchableOpacity)`
  font-weight: ${props => props.theme.fonts.weight.bold};
  border-radius: ${props => props.theme.borderRadius};
  padding: 5px;
  border: 1.2px solid ${props => props.theme.colors.white20};
`;

const ViewSpaceBetween = styled(ViewRowSpaceBetween)`
  flex: 1;
  margin-right: 20px;
`;
