/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextPrimary } from '@components/texts/Texts';
import { useNavigation } from '@react-navigation/native';
import { setFab } from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { setEditProfileSubmit } from '@state/user/UserReducer';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface HeaderInterface {
  title: string;
  isFab?: boolean;
  route?: string;
}

export const GenericHeader = memo(
  ({ title, isFab = false, route = null }: HeaderInterface) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const theme = useSelector(selectTheme);

    const goBack = useCallback(() => {
      dispatch(setEditProfileSubmit(null));

      route ? navigation.navigate(route) : navigation.goBack();

      isFab && dispatch(setFab(true));
    }, []);

    return (
      <Header>
        <Appbar.BackAction onPress={goBack} color={theme.colors.white20} />

        <TextPrimary>{t('common:' + title)}</TextPrimary>
      </Header>
    );
  },
);

GenericHeader.displayName = 'GenericHeader';

const Header = styled(Appbar.Header)`
  background: ${props => props.theme.colors.secondary};
`;
