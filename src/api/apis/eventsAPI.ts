import { database } from '@api/database';
import { PATHS } from '@api/PathNames';
import { RAPID_API_KEY } from '@env';
import auth from '@react-native-firebase/auth';
import { EventValuesInterface } from '@typings/eventsTypes';
import { ImageInterface } from '@typings/userTypes';
import { CONSTANTS } from '@utils/constants';
import axios, { AxiosRequestConfig } from 'axios';
import { eventChannel } from 'redux-saga';

interface EventChannelInterface {
  uid: string;
  createdAt: number;
}

export const setDBEvent = async (values: EventValuesInterface) =>
  database.ref(PATHS.Events + '/' + values.uid).update({
    [values.createdAt]: values,
  });

export const deleteDBEvent = async (endpoint: string) =>
  database.ref(PATHS.Events + endpoint).remove();

export const setDBAttendees = async (values: Partial<EventValuesInterface>) => {
  const user = auth().currentUser.uid;
  const ref =
    PATHS.Events + '/' + values.uid + '/' + values.createdAt + PATHS.Attendees;

  await database.ref(ref).update({
    [user]: values.attendees.value,
  });
};

export const getDBEvents = async (uid = '') =>
  database
    .ref(PATHS.Events + '/' + uid)
    .once(CONSTANTS.Value)
    .then(snapshot => ({ events: snapshot.val() }));

export const eventsChannel = () => {
  const dbEvents = database.ref(PATHS.Events);

  return eventChannel(emit => {
    dbEvents.on(
      CONSTANTS.Value,
      snapshot => emit({ events: snapshot.val() }),
      ({ code }: { code: string }) => emit({ error: code }),
    );
    return () => dbEvents.off();
  });
};

export const userEventChannel = ({ uid, createdAt }: EventChannelInterface) => {
  const dbEvent = database.ref(PATHS.Events + '/' + uid + '/' + createdAt);

  return eventChannel(emit => {
    dbEvent.on(
      CONSTANTS.Value,
      snapshot => emit({ event: snapshot.val() }),
      ({ code }: { code: string }) => emit({ error: code }),
    );
    return () => dbEvent.off();
  });
};

RAPID_API_KEY;

export const findLocationsAsync = async (input: string) => {
  const options: AxiosRequestConfig = {
    method: CONSTANTS.GET,
    url: CONSTANTS.RapidURL,
    params: {
      fields: CONSTANTS.RapidFields,
      lang: CONSTANTS.En,
      name: input,
      limit: CONSTANTS.RapidLimit5,
    },
    headers: {
      [CONSTANTS.RapidHost]: CONSTANTS.RapidHostValue,
      [CONSTANTS.RapidKey]: RAPID_API_KEY,
    },
  };

  return axios
    .request(options)
    .then(response => ({ locations: response.data }));
};

export const setDBEventImage = async ({
  name,
  uri,
  createdAt,
  uid,
}: ImageInterface) => {
  await database.ref(PATHS.Events + '/' + uid + '/' + createdAt).update({
    image: { name, uri },
  });
};
