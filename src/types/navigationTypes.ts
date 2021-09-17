export interface NavigationInterface {
  navigation?: { params: { data: string } };
  route?: { params: { data: string } };
}

export type MainStackType = {
  events: NavigationInterface;
  editProfile: NavigationInterface;
  updateImage: NavigationInterface;
  eventUpdateImage: NavigationInterface;
  memberProfile: NavigationInterface;
  memberSearch: NavigationInterface;
  settings: NavigationInterface;
  updateEmail: NavigationInterface;
  changePassword: NavigationInterface;
  deleteAccount: NavigationInterface;
  createEvent: NavigationInterface;
  searchLocation: NavigationInterface;
  event: NavigationInterface;
  chat: NavigationInterface;
};

export type UserSettingsType = {
  route: { params: { data: string } };
  navigation: { navigate: (path: string) => void };
};
