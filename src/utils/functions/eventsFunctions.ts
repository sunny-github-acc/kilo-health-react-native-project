import auth from '@react-native-firebase/auth';
import { EventsInterface, EventValuesInterface } from '@typings/eventsTypes';
import i18n from 'i18next';
import * as _ from 'lodash';
import { CONSTANTS } from '@utils/constants';
import { ThemeInterface } from 'styled-components/native';

interface DateInterface {
  date?: Date;
  hours?: number;
  days?: number;
}

export const updatedDate = ({
  date = new Date(),
  days,
  hours,
}: DateInterface) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    days || date.getDate(),
    hours || date.getHours(),
    0,
    0,
  );

export const dateToString = (date: Date) => {
  const month = handleSingleDigits(date.getMonth());
  const weekday = i18n.t('main:weekShort' + date.getDay());
  const day = handleSingleDigits(date.getDate());
  const hours = handleSingleDigits(date.getHours());
  const minutes = handleSingleDigits(
    date.getMinutes() % 5 === 0
      ? date.getMinutes()
      : Math.ceil(date.getMinutes() / 10) * 10,
  );

  return {
    date: weekday + ', ' + month + '-' + day,
    time: hours.toString() + ':' + minutes.toString(),
  };
};

export const weekdaysStartingToday = () => {
  const today = new Date().getDay();
  const days: string[] = [];

  for (let i = today; i < today + 7; i++) {
    i > 6 ? days.push((i - 7).toString()) : days.push(i.toString());
  }

  return days;
};

export const handleSingleDigits = (date: number) =>
  date < 10 ? '0' + date : date;

interface ExtractorInterface {
  events: EventsInterface;
  following: { [key: string]: boolean };
}

const sortEvent = (a: { date: number }, b: { date: number }) =>
  a.date > b.date ? 0 : -1;

export const extractedEvents = ({ events, following }: ExtractorInterface) => {
  const allEvents: EventValuesInterface[] = [];
  const followingEvents: EventValuesInterface[] = [];
  const attendedEvents: EventValuesInterface[] = [];
  const userEvents: EventValuesInterface[] = [];

  const uid = auth().currentUser.uid;

  _.valuesIn(events).map(event =>
    _.valuesIn(event).map(e => {
      e.uid === uid ? userEvents.push(e) : null;

      if (e.date < new Date().getTime()) return null;

      allEvents.push(e);
      _.has(following, e.uid) ? followingEvents.push(e) : null;
      _.has(e.attendees, uid) ? attendedEvents.push(e) : null;
    }),
  );

  return {
    allEvents: allEvents.sort(sortEvent),
    followingEvents: followingEvents.sort(sortEvent),
    attendedEvents: attendedEvents.sort(sortEvent),
    userEvents: userEvents.sort(sortEvent),
  };
};

export const pascalCase = (string: string) =>
  string.replace(
    /(\w)(\w*)/g,
    (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
  );

interface InputInterface {
  setFieldValue: (e1: string, e2: string) => void;
  type: string;
  value: string;
}

export const handleFormType = (props: InputInterface) => {
  const { setFieldValue, type, value } = props;

  if (type.includes(value)) {
    setFieldValue(
      CONSTANTS.Type,
      type
        .split(' ')
        .filter(val => val !== value)
        .join(' ') || CONSTANTS.Other,
    );
  } else {
    setFieldValue(CONSTANTS.Type, type + ' ' + value);
  }
};

export const styleSelected = (theme: ThemeInterface) => ({
  borderBottomColor: theme.colors.white20,
  borderBottomWidth: 2,
});

export const styleNotSelected = (theme: ThemeInterface) => ({
  backgroundColor: theme.colors.primary,
  borderBottomColor: theme.colors.white20,
  borderBottomWidth: 0.5,
});
