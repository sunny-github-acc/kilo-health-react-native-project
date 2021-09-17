import {
  BodyLoader,
  StyledDivider,
  TextLeft,
  TextSmall,
} from '@components/index';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectEvent, setEventAttendees } from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import { dateToString } from '@utils/functions/eventsFunctions';
import * as _ from 'lodash';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const EventTopInfo = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);
  const event = useSelector(selectEvent);

  const user = auth().currentUser.uid;

  if (!event) return <BodyLoader />;

  const { date: eventDate, location, username, attendees } = event;
  const attendeesSize = _.size(attendees);

  const { date, time } = dateToString(new Date(eventDate));
  const today = dateToString(new Date());
  const tomorrow = dateToString(
    new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
  );
  const isToday = today.date === date;
  const isTomorrow = tomorrow.date === date;

  const goToMember = () => {
    const uid = auth().currentUser.uid;

    if (event?.uid === uid) {
      navigation.navigate(ROUTES.Profile);
    } else {
      navigation.navigate(ROUTES.Members);
      navigation.navigate(ROUTES.MemberProfile);
    }
  };

  const handleAttend = () => {
    dispatch(
      setEventAttendees({
        ...event,
        attendees: { value: !_.has(attendees, user) ? true : null },
      }),
    );
  };

  return (
    <>
      <TouchableOpacity onPress={goToMember}>
        <TextLeft>
          <MaterialCommunityIcons
            size={25}
            color={theme.colors.white20}
            name={CONSTANTS.Account}
          />
          <TextGrey> {username}</TextGrey>
        </TextLeft>
      </TouchableOpacity>

      <TextLeft>
        <MaterialCommunityIcons
          size={25}
          color={theme.colors.white20}
          name={CONSTANTS.MapMarker}
        />
        <TextGrey> {location}</TextGrey>
      </TextLeft>

      <TextLeft>
        <MaterialCommunityIcons
          size={25}
          color={theme.colors.white20}
          name={CONSTANTS.CalendarMonth}
        />
        <TextGrey>
          {' '}
          {isToday ? t('main:today') : null}
          {isTomorrow ? t('main:tomorrow') : null}
          {!isToday && !isTomorrow ? date : null} {t('main:at')} {time}
        </TextGrey>
      </TextLeft>

      <TextLeft>
        <MaterialCommunityIcons
          size={25}
          color={theme.colors.white20}
          name={CONSTANTS.AccountMultiple}
        />
        <TextGrey>
          {' '}
          {attendeesSize === 0 ? t('main:attendsZero') : null}
          {attendeesSize === 1 ? `1 ${t('main:attendsOne')}` : null}
          {attendeesSize > 1 ? `${attendeesSize} ${t('main:attends')}` : null}
        </TextGrey>
      </TextLeft>

      <TouchableOpacity onPress={handleAttend}>
        <TextLeft>
          <MaterialCommunityIcons
            size={25}
            color={
              _.has(attendees, user)
                ? theme.colors.tertiary
                : theme.colors.white20
            }
            name={CONSTANTS.Campfire}
          />
          <TextGrey>
            {' '}
            {_.has(attendees, user)
              ? t('main:userAttended')
              : t('main:userNotAttended')}
          </TextGrey>
        </TextLeft>
      </TouchableOpacity>

      <StyledDivider />
    </>
  );
});

EventTopInfo.displayName = 'EventTopInfo';

export default EventTopInfo;

const TextGrey = styled(TextSmall)`
  color: ${props => props.theme.colors.white40};
`;
