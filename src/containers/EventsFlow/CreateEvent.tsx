import { Body } from '@components/index';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import {
  selectEvent,
  selectEventStep,
  setEventStep,
  submitEvent,
  uploadEventImage,
} from '@state/events/EventsReducer';
import { getMember } from '@state/members/MembersReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { selectUsername } from '@state/user/UserReducer';
import { EventValuesInterface } from '@typings/eventsTypes';
import { CONSTANTS } from '@utils/constants';
import Carousel from 'pinar';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import CreateEventModal from './CreateEventModal';
import CreateEventStep1 from './CreateEventStep1';
import CreateEventStep2 from './CreateEventStep2';
import CreateEventStep3 from './CreateEventStep3';

const CreateEvent = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const carouselRef = useRef(null);

  const theme = useSelector(selectTheme);
  const step = useSelector(selectEventStep);
  const username = useSelector(selectUsername);
  const oldEvent = useSelector(selectEvent);

  const [input, setInput] = useState({});

  const handleStep = (values: EventValuesInterface) => {
    const result = { ...input, ...values };

    if (values.step === 3) {
      const uid = auth().currentUser.uid;

      navigation.navigate(ROUTES.Event);

      dispatch(
        submitEvent({
          ...result,
          username,
          uid: oldEvent?.uid || uid,
        }),
      );

      dispatch(
        uploadEventImage({
          uid: oldEvent?.uid || uid,
          createdAt: values.createdAt,
        }),
      );

      dispatch(getMember(oldEvent?.uid || uid));

      dispatch(setEventStep(0));
    } else {
      scrollToNext();

      setInput(result);

      dispatch(setEventStep(values.step));
    }
  };

  const scrollToNext = useCallback(() => {
    carouselRef?.current?.scrollToNext();
  }, []);

  const scrollToPrev = useCallback(() => {
    carouselRef?.current?.scrollToPrev();
  }, []);

  useEffect(() => {
    (step === 0 || step === 1) && scrollToPrev();
  }, [step]);

  return (
    <Body>
      <CreateEventModal />

      <ProgressBar progress={step / 3} color={theme.colors.white20} />

      <Carousel
        ref={carouselRef}
        controlsContainerStyle={{ display: CONSTANTS.None }}
        dotsContainerStyle={{ display: CONSTANTS.None }}
        scrollEnabled={false}
      >
        <CreateEventStep1 setStep={handleStep} />
        <CreateEventStep2 setStep={handleStep} />
        <CreateEventStep3 setStep={handleStep} />
      </Carousel>
    </Body>
  );
});

CreateEvent.displayName = 'CreateEvent';

export default CreateEvent;
