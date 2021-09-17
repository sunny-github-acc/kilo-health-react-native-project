import {
  asyncChangePassword,
  asyncDelete,
  asyncReauthenticate,
  asyncUpdateEmail,
  deleteDBUser,
  setDBEmail,
  setDBFollow,
  setDBImage,
  setDBModal,
  setDBProfileValues,
} from '@api/index';
import storage from '@react-native-firebase/storage';
import { setError, setSuccess, setSyncing } from '@state/auth/AuthReducer';
import { SYNCING_ENDPOINTS } from '@state/auth/SyncingEndpoints';
import {
  ImageInterface,
  ProfileValuesInterface,
  SetFollowInterface,
  UserDeleteInterface,
  UserEmailInterface,
  UserPasswordInterface,
} from '@typings/userTypes';
import i18n from 'i18next';
import ImageResizer from 'react-native-image-resizer';
import {
  call,
  cancel,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  deleteAccount,
  selectImage,
  setEmail,
  setFollow,
  setModal,
  setPassword,
  setUser,
  setValue,
  uploadImage,
} from './UserReducer';
import { watchFollowers, watchFollowing, watchUser } from './UserWatcher';

function* handleUpdate({ payload }: ProfileValuesInterface) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Profile, value: true }));

    yield call(setDBProfileValues, payload);

    yield fork(watchUser);

    yield put(setSuccess(i18n.t('profile:updated')));
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Profile, value: false }));
  }
}

function* handleEmail({
  payload: { email, passwordConfirm },
}: UserEmailInterface) {
  try {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Email, value: true }));

    yield call(asyncReauthenticate, passwordConfirm);

    yield call(asyncUpdateEmail, email);

    yield call(setDBEmail, email);

    yield fork(watchUser);

    yield put(setSuccess(i18n.t('settings:emailUpdated')));
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Email, value: false }));
  }
}

function* handleUploadImage({ payload: uri }: { payload: string }) {
  try {
    if (!uri) yield cancel();
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Image, value: true }));

    const image: ImageInterface = yield select(selectImage);
    const imageResized: ImageInterface = yield ImageResizer.createResizedImage(
      uri,
      400, // Width
      400, // Height
      'JPEG',
      90, // Quality
      0, // Rotation
    );
    const { uri: path, name } = imageResized;

    const newReference = storage().ref(name);
    yield newReference.putFile(path);

    const ref = storage().ref('/' + name);
    const imageURI: string = yield ref.getDownloadURL();

    yield call(setDBImage, { uri: imageURI, name });
    yield fork(watchUser);

    if (image?.name) {
      const oldReference = storage().ref(image.name);

      const onResolve = () => oldReference.delete();
      const onReject = () => '';

      yield oldReference.getDownloadURL().then(onResolve, onReject);
    }

    yield put(setSuccess(i18n.t('profile:imageUpdated')));
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:uploadImage`)));
  } finally {
    yield put(setSyncing({ key: SYNCING_ENDPOINTS.Image, value: false }));
  }
}

function* handleModal({ payload }: { payload: boolean }) {
  try {
    yield call(setDBModal, payload);

    yield fork(watchUser);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

function* handleFollow({
  payload: { uid, path, key, value },
}: SetFollowInterface) {
  try {
    yield call(setDBFollow, { uid, path, key, value });

    yield fork(watchFollowers);
    yield fork(watchFollowing);
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

function* handlePassword({
  payload: { oldPassword, newPassword },
}: UserPasswordInterface) {
  try {
    yield call(asyncReauthenticate, oldPassword);

    yield call(asyncChangePassword, newPassword);

    yield put(setSuccess(i18n.t('settings:passwordUpdated')));
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

function* handleDelete({ payload: { passwordConfirm } }: UserDeleteInterface) {
  try {
    yield call(asyncReauthenticate, passwordConfirm);

    const image: ImageInterface = yield select(selectImage);

    const oldReference = storage().ref(image.name);

    const onResolve = () => oldReference.delete();
    const onReject = () => '';

    yield oldReference.getDownloadURL().then(onResolve, onReject);

    yield call(deleteDBUser);

    yield call(asyncDelete);

    yield put(setUser(null));

    yield put(setSuccess(i18n.t('settings:accountDeleted')));
  } catch (error) {
    yield put(setError(i18n.t(`errorMessages:${error.code}`)));
  }
}

export function* userSaga() {
  yield takeEvery(setValue, handleUpdate);
  yield takeLatest(setEmail, handleEmail);
  yield takeLatest(uploadImage, handleUploadImage);
  yield takeLatest(setModal, handleModal);
  yield takeEvery(setFollow, handleFollow);
  yield takeLatest(setPassword, handlePassword);
  yield takeLatest(deleteAccount, handleDelete);
}
