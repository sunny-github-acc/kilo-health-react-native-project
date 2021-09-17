import {
  ButtonSecondary,
  SearchButton,
  StyledDivider,
  TextLeft,
  TextSmallBold,
  ViewMargin,
  ViewMarginVertical,
  ViewRowSpaceBetween,
  ViewWidth,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import {
  selectEvent,
  selectSelectedLocation,
  setSelectedLocation,
} from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { selectLocation } from '@state/user/UserReducer';
import { EventValues3Interface } from '@typings/eventsTypes';
import { CONSTANTS } from '@utils/constants';
import {
  handleSingleDigits,
  styleNotSelected,
  styleSelected,
  updatedDate,
} from '@utils/functions/eventsFunctions';
import { Formik } from 'formik';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import CreateEventStep3Date from './CreateEventStep3Date';
import CreateEventStep3Days from './CreateEventStep3Days';

interface StepInterface {
  setStep: (e: EventValues3Interface) => void;
}

const CreateEventStep3 = memo(({ setStep }: StepInterface) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isSyncingEvent } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);
  const location = useSelector(selectLocation);
  const selectedLocation = useSelector(selectSelectedLocation);
  const oldEvent = useSelector(selectEvent);

  let setValue: (e1: string, e2: Date | string) => void;

  const [date, setDate] = useState(
    oldEvent?.date
      ? updatedDate({
          date: new Date(oldEvent.date),
          days: new Date(oldEvent.date).getDate(),
          hours: new Date(oldEvent.date).getHours(),
        })
      : updatedDate({
          date: new Date(),
          days: new Date().getDate() + 1,
          hours: 12,
        }),
  );

  const title = () => {
    if (!oldEvent?.location && !selectedLocation) {
      return t('errorMessages:locationRequired');
    } else {
      if (isSyncingEvent) return t('common:saving');
      else return t('common:save');
    }
  };

  const goToSearchLocation = useCallback(() => {
    navigation.navigate(ROUTES.SearchLocation, { route: ROUTES.CreateEvent });
  }, []);

  useEffect(() => {
    dispatch(setSelectedLocation(oldEvent?.location || location));
  }, []);

  return (
    <Formik
      initialValues={{
        date,
        reccuring: oldEvent?.reccuring || CONSTANTS.OneOff,
        location: selectedLocation,
        step: 3,
      }}
      onSubmit={values => {
        const createdAt = oldEvent?.createdAt || new Date().getTime();
        const dateNumber = values.date.getTime();
        const result = {
          ...values,
          date: dateNumber,
          location: selectedLocation,
          createdAt,
        };

        setStep(result);
      }}
    >
      {({ setFieldValue, handleSubmit, values }) => {
        if (setValue !== setFieldValue) {
          setValue = setFieldValue;
        }

        return (
          <ViewMargin>
            <ScrollView>
              <ViewMarginVertical>
                <TextLeft>
                  <TextSmallBold>{t('main:dayAndTime')}</TextSmallBold>
                </TextLeft>
              </ViewMarginVertical>

              <CreateEventStep3Days
                setFieldValue={setFieldValue}
                setDate={setDate}
                date={date}
                values={values}
              />

              <ViewMargin />

              <ViewRowSpaceBetween>
                {formHours.map(hours => (
                  <ButtonWidth30
                    onPress={() => {
                      setFieldValue('date', updatedDate({ date, hours }));
                      setDate(updatedDate({ date, hours }));
                    }}
                    title={handleSingleDigits(hours) + ':00'}
                    style={
                      values.date.getHours() === hours &&
                      values.date.getMinutes() === 0
                        ? styleSelected(theme)
                        : styleNotSelected(theme)
                    }
                    key={hours}
                  />
                ))}
              </ViewRowSpaceBetween>

              <CreateEventStep3Date
                date={date}
                setDate={setDate}
                setValue={setValue}
              />

              <ViewMarginVertical>
                <ViewMarginVertical>
                  <TextLeft>
                    <TextSmallBold>{t('main:location')}</TextSmallBold>
                  </TextLeft>
                </ViewMarginVertical>

                <SearchButton
                  onPress={goToSearchLocation}
                  icon={CONSTANTS.MapMarker}
                  title={selectedLocation || t('main:searchLocation')}
                  style={searchStyle}
                />
              </ViewMarginVertical>

              <ViewMarginVertical>
                <StyledDivider />
              </ViewMarginVertical>

              <ViewMarginVertical>
                <ViewWidth>
                  <ButtonSecondary
                    onPress={handleSubmit}
                    title={title()}
                    disabled={
                      (!oldEvent?.location && !selectedLocation) ||
                      isSyncingEvent
                    }
                  />
                </ViewWidth>
              </ViewMarginVertical>
            </ScrollView>
          </ViewMargin>
        );
      }}
    </Formik>
  );
});

CreateEventStep3.displayName = 'CreateEventStep3';

export default CreateEventStep3;

const ButtonWidth30 = styled(ButtonSecondary)`
  width: 100%;
  margin: 10px 0 10px 0;
  width: 32%;
`;

const formHours = [8, 12, 18];

const searchStyle = {
  alignSelf: 'flex-start',
  marginHorizontal: 5,
};
