import { eventsChannel, userEventChannel } from '@api/index';
import { SYNCING_ENDPOINTS } from '@state/auth/SyncingEndpoints';
import { setEvent, setEvents } from '@state/events/EventsReducer';
import { EventValuesInterface } from '@typings/eventsTypes';
import i18n from 'i18next';
import { EventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { setError, setSyncing } from '../auth/AuthReducer';

interface WatchEventsInterface {
  events: { [key: string]: EventValuesInterface };
  error: string;
}

interface WatchEventInterface {
  event: EventValuesInterface;
  error: string;
}

export function* watchEvents() {
  const eventCh: EventChannel<WatchEventsInterface> = yield call(eventsChannel);

  try {
    while (true) {
      const { events, error } = yield take(
        eventCh as EventChannel<WatchEventsInterface>,
      );

      if (error) {
        yield put(setError(i18n.t(`errorMessages:${error}`)));
      } else yield put(setEvents(events));

      yield put(setSyncing({ key: SYNCING_ENDPOINTS.Events, value: false }));
    }
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }

  yield put(setSyncing({ key: SYNCING_ENDPOINTS.Events, value: false }));
}

export function* watchEvent(payload: { uid: string; createdAt: number }) {
  const channel: EventChannel<WatchEventInterface> = yield call(
    userEventChannel,
    payload,
  );

  try {
    while (true) {
      const { event, error } = yield take(
        channel as EventChannel<WatchEventInterface>,
      );

      if (error) {
        yield put(setError(i18n.t(`errorMessages:oops`)));
      } else yield put(setEvent(event));

      yield put(setSyncing({ key: SYNCING_ENDPOINTS.Event, value: false }));
    }
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }

  yield put(setSyncing({ key: SYNCING_ENDPOINTS.Event, value: false }));
}
