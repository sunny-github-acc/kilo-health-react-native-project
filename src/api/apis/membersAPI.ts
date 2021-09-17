import { database } from '@api/database';
import { PATHS } from '@api/PathNames';
import { CONSTANTS } from '@utils/constants';

export const getDBMembers = async () =>
  database
    .ref(PATHS.Users)
    .once(CONSTANTS.Value)
    .then(snapshot => snapshot.val());
