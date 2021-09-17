import { TextPrimary, TextSmall } from '@components/texts/Texts';
import { ViewRow, ViewRowCenteredVertical } from '@components/views/Views';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import {
  selectEvent,
  setEvent,
  setEventStep,
  setFab,
} from '@state/events/EventsReducer';
import { setMember } from '@state/members/MembersReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

export const EventHeader = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isSyncingEvent } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);

  const event = useSelector(selectEvent);

  const user = auth().currentUser.uid;

  const goToEditEvent = useCallback(() => {
    navigation.navigate(ROUTES.Events);
    navigation.navigate(ROUTES.CreateEvent);

    dispatch(setEventStep(0));
  }, []);

  const goBack = useCallback(() => {
    navigation.navigate(ROUTES.Events);

    dispatch(setEvent(null));
    dispatch(setMember(null));

    dispatch(setFab(true));
  }, []);

  return (
    <Header>
      {isSyncingEvent ? (
        <ViewRowCenteredVertical>
          <Appbar.BackAction onPress={goBack} color={theme.colors.white20} />

          <TextPrimary>{t('main:loadingEvent')} </TextPrimary>
        </ViewRowCenteredVertical>
      ) : (
        <ViewRowNowrap>
          <Appbar.BackAction onPress={goBack} color={theme.colors.white20} />

          <TextShrink numberOfLines={1}>
            {event?.name || t('main:event')}
          </TextShrink>

          {user && user === event?.uid ? (
            <ViewGrow>
              <ButtonBorder onPress={goToEditEvent}>
                <TextSmall numberOfLines={1}>{t('main:edit')}</TextSmall>
              </ButtonBorder>
            </ViewGrow>
          ) : null}
        </ViewRowNowrap>
      )}
    </Header>
  );
});

EventHeader.displayName = 'EventHeader';

const Header = styled(Appbar.Header)`
  background: ${props => props.theme.colors.secondary};
`;

const TextShrink = styled(TextPrimary)`
  text-align: left;
  flex-shrink: 1;
`;

const ViewGrow = styled(ViewRow)`
  justify-content: flex-end;
  flex-grow: 1;
`;

const ButtonBorder = styled(TouchableOpacity)`
  font-weight: ${props => props.theme.fonts.weight.bold};
  border-radius: ${props => props.theme.borderRadius};
  padding: 5px;
  border: 1.2px solid ${props => props.theme.colors.white20};
  margin-horizontal: 10px;
`;

const ViewRowNowrap = styled(ViewRowCenteredVertical)`
  flex-wrap: nowrap;
`;
