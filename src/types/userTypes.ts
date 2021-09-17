export interface UserReducerInterface {
  uid: string;
  email?: string;
  username?: string;
  bio?: string;
  location?: string;
  image?: { name: string; uri: string; temp: string };
  modal?: boolean;
  followers?: { [key: string]: boolean };
  following?: { [key: string]: boolean };
  followersNumber?: number;
  followingNumber?: number;
  creationTime?: string;
  editProfileSubmit?: () => void;
  updateEmailSubmit?: () => void;
  changePasswordSubmit?: () => void;
  deleteAccountSubmit?: () => void;
}

export interface ProfileValuesInterface {
  payload: {
    username: string;
    bio: string;
    location: string;
  };
}

export type ProfileValuesPayloadInterface = ProfileValuesInterface['payload'];

export interface UserEmailInterface {
  payload: {
    email: string;
    passwordConfirm: string;
  };
}

export interface UserPasswordInterface {
  payload: {
    oldPassword: string;
    newPassword: string;
  };
}

export interface UserDeleteInterface {
  payload: {
    passwordConfirm: string;
  };
}

export interface ImageInterface {
  name: string;
  uri: string;
  uid?: string;
  createdAt?: number;
  path?: string;
}

export interface SetFollowInterface {
  payload: {
    uid: string;
    path: string;
    key: string;
    value: boolean;
  };
}

export type SetFollowPayloadInterface = SetFollowInterface['payload'];

export interface GetFollowInterface {
  userUID: string;
  path: string;
}
