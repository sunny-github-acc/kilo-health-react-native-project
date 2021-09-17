import { all, fork } from 'redux-saga/effects';

import { authSaga } from './auth/AuthSaga';
import { userSaga } from './user/UserSaga';
import { membersSaga } from './members/MembersSaga';
import { mainSaga } from './events/EventsSaga';
import { chatsSaga } from './chats/ChatsSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(membersSaga),
    fork(mainSaga),
    fork(chatsSaga),
  ]);
}
