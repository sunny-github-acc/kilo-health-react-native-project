import {
  deleteDBEvent,
  findLocationsAsync,
  getDBEvents,
  setDBAttendees,
  setDBEvent,
  setDBEventImage,
} from '@api/index';
import storage from '@react-native-firebase/storage';
import { setError, setSuccess, setSyncing } from '@state/auth/AuthReducer';
import { SYNCING_ENDPOINTS } from '@state/auth/SyncingEndpoints';
import { EventValuesInterface } from '@typings/eventsTypes';
import { ImageInterface } from '@typings/userTypes';
import i18n from 'i18next';
import ImageResizer from 'react-native-image-resizer';
import {
  call,
  cancel,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import {
  deleteEvent,
  findLocations,
  getEvent,
  getEvents,
  selectEventImage,
  setEventAttendees,
  setLocations,
  setLocationsError,
  submitEvent,
  uploadEventImage,
} from './EventsReducer';
import { watchEvent, watchEvents } from './EventsWathcers';

interface LocationInterface {
  iso_a2: string;
  value: string;
  key: string;
}

interface GetEventInterface {
  payload: { uid: string; createdAt: number };
}

function* handleLocations({ payload }: { payload: string }) {
  try {
    yield put(setLocationsError(false));
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Location, value: true }));

    const { locations }: { locations: LocationInterface[] } = yield call(
      findLocationsAsync,
      payload,
    );

    yield put(
      setLocations(
        locations.map(({ iso_a2, value, key }: LocationInterface) => ({
          country: iso_a2,
          city: value,
          key,
        })),
      ),
    );
  } catch (error) {
    yield put(setLocationsError(true));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Location, value: false }));
  }
}

function* handleSubmitEvent({ payload }: { payload: EventValuesInterface }) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Event, value: true }));

    yield call(setDBEvent, payload);

    yield fork(watchEvent, payload);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

function* handleSetEventAttendees({
  payload,
}: {
  payload: Partial<EventValuesInterface>;
}) {
  try {
    yield call(setDBAttendees, payload);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

function* handleGetEvents() {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Events, value: true }));

    yield call(getDBEvents);

    yield fork(watchEvents);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

function* handleGetEvent({ payload }: GetEventInterface) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Event, value: true }));

    yield fork(watchEvent, payload);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

function* handleDeleteEvent({ payload }: { payload: string }) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Event, value: true }));

    yield call(deleteDBEvent, payload);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Event, value: false }));
    yield put(setSuccess(i18n.t(`successMessages:eventDeleted`)));
  }
}

function* handleUploadEventImage({
  payload: { uid, createdAt },
}: {
  payload: { uid: string; createdAt: number };
}) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Image, value: true }));

    const image: ImageInterface = yield select(selectEventImage);
    if (!image?.uri) yield cancel();

    const imageResized: ImageInterface = yield ImageResizer.createResizedImage(
      image.uri,
      400, // Width
      400, // Height
      'JPEG',
      90, // Quality
      0, // Rotation
    );
    const { uri, name } = imageResized;

    yield call(setDBEventImage, { uri: uri, name, uid, createdAt });

    const newReference = storage().ref(name);
    yield newReference.putFile(uri);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:uploadImage`)));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Image, value: false }));
  }
}

export function* mainSaga() {
  yield takeLatest(findLocations, handleLocations);
  yield takeLatest(submitEvent, handleSubmitEvent);
  yield takeLatest(getEvents, handleGetEvents);
  yield takeLatest(getEvent, handleGetEvent);
  yield takeLatest(deleteEvent, handleDeleteEvent);
  yield takeLatest(uploadEventImage, handleUploadEventImage);
  yield takeLatest(setEventAttendees, handleSetEventAttendees);
}
