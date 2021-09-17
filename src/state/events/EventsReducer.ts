/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { EventsReducerInterface } from '@typings/eventsTypes';

import { RootState } from '../reducers';

export const INITIAL_STATE: EventsReducerInterface = {
  modal: true,
  fab: true,
  locations: [],
  selectedLocation: null,
  locationsError: false,
  createEventScroll: null,
  createEventStep: null,
  events: null,
  event: null,
  eventImage: { uri: null, name: null },
};

const name = 'events';

const eventsSlice = createSlice({
  name,
  initialState: INITIAL_STATE,
  reducers: {
    setFab: (state, action) => {
      state.fab = action.payload;
    },
    findLocations: (state, action) => {
      //
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setLocationsError: (state, action) => {
      state.locationsError = action.payload;
    },
    setEventScroll: (state, action) => {
      state.createEventScroll = action.payload;
    },
    setEventStep: (state, action) => {
      state.createEventStep = action.payload;
    },
    submitEvent: (state, action) => {
      //
    },
    getEvents: () => {
      //
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    getEvent: (state, action) => {
      //
    },
    uploadEventImage: (state, action) => {
      //
    },
    setEventAttendees: (state, action) => {
      //
    },
    deleteEvent: (state, action) => {
      //
    },
    resetEvents: state => {
      state = INITIAL_STATE;
    },
    setEventImage: (state, action) => {
      if (action.payload) {
        state.eventImage = action.payload;
      } else {
        state.eventImage.name = null;
        state.eventImage.uri = null;
      }
    },
  },
});

export const {
  setFab,
  findLocations,
  setLocations,
  setSelectedLocation,
  setLocationsError,
  setEventScroll,
  setEventStep,
  submitEvent,
  getEvents,
  setEvents,
  getEvent,
  setEvent,
  uploadEventImage,
  setEventAttendees,
  deleteEvent,
  resetEvents,
  setEventImage,
} = eventsSlice.actions;

export const selectFab = (state: RootState) => state.events.fab;
export const selectLocations = (state: RootState) => state.events.locations;
export const selectSelectedLocation = (state: RootState) =>
  state.events.selectedLocation;
export const selectLocationsError = (state: RootState) =>
  state.events.locationsError;
export const selectEventScroll = (state: RootState) =>
  state.events.createEventScroll;
export const selectEventStep = (state: RootState) =>
  state.events.createEventStep;
export const selectEvents = (state: RootState) => state.events.events;
export const selectEvent = (state: RootState) => state.events.event;
export const selectEventImage = (state: RootState) => state.events.eventImage;

export default eventsSlice.reducer;
