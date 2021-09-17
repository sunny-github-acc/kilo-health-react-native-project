export interface EventsReducerInterface {
  modal: boolean;
  fab: boolean;
  locations: { country: string; city: string; key: string }[];
  selectedLocation: string;
  locationsError: boolean;
  createEventScroll: () => void;
  createEventStep: number;
  events: EventsInterface;
  event: EventValuesInterface;
  eventImage: { uri: string; name: string };
}

export type EventsInterface = {
  [key: string]: { [key: string]: EventValuesInterface };
};

export interface EventValuesInterface
  extends EventValues1Interface,
    EventValues2Interface,
    EventValues3Interface {
  attendees?: { [key: string]: boolean };
  username: string;
  uid: string;
  image?: { uri: string; name: string };
}

export interface EventValues1Interface {
  name: string;
  description: string;
  type: string;
  setting: string;
  step: number;
}

export interface EventValues2Interface {
  approach: string;
  audience: string;
  size: string;
  step: number;
}

export interface EventValues3Interface {
  date: number;
  createdAt: number;
  reccuring: string;
  location: string;
  step: number;
}
