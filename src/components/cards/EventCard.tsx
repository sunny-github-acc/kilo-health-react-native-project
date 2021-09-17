import { ViewMargin } from '@components/index';
import { TextLeft, TextPrimary, TextSmall } from '@components/texts/Texts';
import {
  ViewFlex1,
  ViewMarginHorizontal,
  ViewRow,
} from '@components/views/Views';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import {
  getEvent,
  setEventAttendees,
  setFab,
} from '@state/events/EventsReducer';
import {
  getMember,
  getMembers,
  selectMembers,
} from '@state/members/MembersReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { EventValuesInterface } from '@typings/eventsTypes';
import { CONSTANTS } from '@utils/constants';
import { dateToString } from '@utils/functions/eventsFunctions';
import React, { memo, useCallback, useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

interface CardInterface {
  event: EventValuesInterface;
}

const EventCard = memo(({ event }: CardInterface) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const theme = useSelector(selectTheme);
  const members = useSelector(selectMembers);

  const { date: eventDate, name, location, uid, attendees, createdAt } = event;
  const { date, time } = dateToString(new Date(eventDate));

  const userUID = auth().currentUser.uid;
  const member = members[uid];
  const isAttended = attendees && attendees[userUID] ? true : null;

  const handleAttend = () => {
    dispatch(
      setEventAttendees({
        ...event,
        attendees: { value: !isAttended ? true : null },
      }),
    );
  };

  const handleGoToEvent = useCallback(() => {
    navigation.navigate(ROUTES.Event);

    dispatch(getEvent({ uid, createdAt }));
    dispatch(getMember(uid));

    dispatch(setFab(false));
  }, []);

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  return (
    <ViewMargin>
      <TouchableOpacity onPress={handleGoToEvent}>
        <ViewRow>
          <ViewImageContainer>
            <ImageFlex1
              source={{
                uri: event?.image?.uri || member?.image?.uri,
              }}
            />
          </ViewImageContainer>

          <ViewFlex1>
            <ViewMarginHorizontal>
              <TextLeft>
                <TextPrimary numberOfLines={1}>
                  {name}
                  {'\n'}
                </TextPrimary>
                <TextSmall numberOfLines={1}>
                  {location}
                  {'\n'}
                </TextSmall>
                <TextGrey numberOfLines={1}>
                  {date} · {time}
                </TextGrey>
              </TextLeft>
            </ViewMarginHorizontal>
          </ViewFlex1>

          <AlignSelf>
            <TouchableOpacity onPress={handleAttend}>
              <MaterialCommunityIcons
                size={50}
                color={
                  isAttended ? theme.colors.tertiary : theme.colors.white20
                }
                name={CONSTANTS.Campfire}
              />
            </TouchableOpacity>
          </AlignSelf>
        </ViewRow>
      </TouchableOpacity>
    </ViewMargin>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;

const ImageFlex1 = styled(Image)`
  flex: 1;
`;

const ViewImageContainer = styled(View)`
  width: 75px;
  height: 75px;
  margin-top: 10px;
`;

const AlignSelf = styled(View)`
  align-self: center;
`;

const TextGrey = styled(TextSmall)`
  color: ${props => props.theme.colors.white40};
`;
