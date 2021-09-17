/* eslint-disable @typescript-eslint/no-explicit-any */
import { OutlinedButton } from '@components/buttons/OutlinedButton';
import { TextPrimary } from '@components/texts/Texts';
import { ViewHeader } from '@components/views/Views';
import { useNavigation } from '@react-navigation/native';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import {
  selectDeleteAccountSubmit,
  setDeleteAccountSubmit,
} from '@state/user/UserReducer';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { HeaderSecondary } from './HeaderSecondary';

export const DeleteAccountHeader = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isSyncingAuth } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);
  const deleteAccountSubmit = useSelector(selectDeleteAccountSubmit);

  const goBack = useCallback(() => {
    dispatch(setDeleteAccountSubmit(null));

    navigation.goBack();
  }, []);

  const handleSave = () => {
    if (isSyncingAuth) return null;

    deleteAccountSubmit();
  };

  return (
    <HeaderSecondary>
      <Appbar.BackAction onPress={goBack} color={theme.colors.white20} />

      <ViewHeader>
        <TextPrimary>{t('settings:deleteAccount')}</TextPrimary>

        <OutlinedButton onPress={handleSave} title={t('settings:save')} />
      </ViewHeader>
    </HeaderSecondary>
  );
});

DeleteAccountHeader.displayName = 'DeleteAccountHeader';
