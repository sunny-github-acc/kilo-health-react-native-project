/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextPrimary } from '@components/texts/Texts';
import {
  ViewMargin,
  ViewRowCentered,
  ViewRowSpaceBetween,
} from '@components/views/Views';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import {
  selectEvent,
  selectEventStep,
  setEventImage,
  setEventStep,
  setFab,
} from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { HeaderSecondary } from './HeaderSecondary';

export const CreateEventHeader = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);
  const step = useSelector(selectEventStep);
  const oldEvent = useSelector(selectEvent);

  const handleSteps = () => {
    if (!step) goBack();
    else dispatch(setEventStep(step - 1));
  };

  const goBack = useCallback(() => {
    navigation.goBack();

    dispatch(setFab(true));
    dispatch(setEventStep(0));
    dispatch(setEventImage(null));
  }, []);

  const goToMain = useCallback(() => {
    navigation.navigate(ROUTES.Events);

    dispatch(setFab(true));
    dispatch(setEventStep(0));
    dispatch(setEventImage(null));
  }, []);

  return (
    <HeaderSecondary>
      <ViewStyled>
        <ViewRowCentered>
          <Appbar.BackAction
            onPress={handleSteps}
            color={theme.colors.white20}
          />

          {oldEvent ? (
            <TextPrimary>{t('main:updateEvent')}</TextPrimary>
          ) : (
            <TextPrimary>{t('main:createEvent')}</TextPrimary>
          )}
        </ViewRowCentered>

        <TouchableOpacity onPress={goToMain}>
          <ViewMargin>
            <MaterialCommunityIcons
              size={30}
              color={theme.colors.white20}
              name={CONSTANTS.Close}
            />
          </ViewMargin>
        </TouchableOpacity>
      </ViewStyled>
    </HeaderSecondary>
  );
});

CreateEventHeader.displayName = 'CreateEventHeader';

const ViewStyled = styled(ViewRowSpaceBetween)`
  width: 100%;
  align-items: center;
`;
