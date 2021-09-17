import {
  ButtonPrimary,
  TextLeft,
  TextPrimary,
  ViewMargin,
  ViewMarginVertical,
} from '@components/index';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { deleteEvent, selectEvent, setFab } from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const EventBottom = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);
  const event = useSelector(selectEvent);

  const user = auth().currentUser.uid;
  const styleText = {
    color: theme.colors.tertiary,
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEvent('/' + event?.uid + '/' + event?.createdAt));

    navigation.navigate(ROUTES.Events);

    dispatch(setFab(true));
  };

  return (
    <>
      {user === event?.uid ? (
        <ViewMargin>
          <TextLeft>
            <TextPrimary>{t('main:eventSettings')}</TextPrimary>
          </TextLeft>

          <ViewMarginVertical>
            <ButtonPrimary
              title={t('main:deleteEvent')}
              onPress={handleDeleteEvent}
              styleText={styleText}
            />
          </ViewMarginVertical>
        </ViewMargin>
      ) : null}
    </>
  );
});

EventBottom.displayName = 'EventBottom';

export default EventBottom;
