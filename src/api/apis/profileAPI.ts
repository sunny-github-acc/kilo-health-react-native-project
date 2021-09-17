import { database } from '@api/database';
import { PATHS } from '@api/PathNames';
import auth from '@react-native-firebase/auth';
import {
  ImageInterface,
  ProfileValuesPayloadInterface,
} from '@typings/userTypes';

const uid = auth()?.currentUser?.uid;
console.log('uid: ', uid);

export const setDBProfileValues = async (
  values: ProfileValuesPayloadInterface,
) => database.ref(PATHS.Users + '/' + uid).update(values);

export const setDBEmail = async (email: string) =>
  database.ref(PATHS.Users + '/' + uid).update({
    email,
  });

export const setDBImage = async ({ name, uri }: ImageInterface) =>
  database.ref(PATHS.Users + '/' + uid).update({
    image: { name, uri },
  });
