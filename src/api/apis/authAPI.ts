import auth from '@react-native-firebase/auth';
import { AuthPayloadInterface } from '@typings/authTypes';

const user = auth()?.currentUser;

export const asyncCheckUser = async () => auth().onAuthStateChanged(() => null);

export const asyncReauthenticate = async (password: string) => {
  const { email } = user;
  const credential = auth.EmailAuthProvider.credential(email, password);

  await user.reauthenticateWithCredential(credential);
};

export const asyncSignup = async ({ email, password }: AuthPayloadInterface) =>
  auth().createUserWithEmailAndPassword(email, password);

export const asyncLogin = async ({ email, password }: AuthPayloadInterface) =>
  auth().signInWithEmailAndPassword(email, password);

export const asyncUpdateEmail = async (email: string) =>
  auth().currentUser.updateEmail(email);

export const asyncChangePassword = async (password: string) => {
  auth().currentUser.updatePassword(password);
};

export const asyncRecover = async (login: string) =>
  auth().sendPasswordResetEmail(login);

export const asyncLogout = async () => auth().signOut();

export const asyncDelete = async () => user.delete();
