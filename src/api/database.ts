import { firebase } from '@react-native-firebase/database';
import { DB_URL } from '@env';

DB_URL;

export const database = firebase.app().database(DB_URL);
