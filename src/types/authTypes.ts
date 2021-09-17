export interface AuthReducerInterface {
  isSyncing: { [key: string]: boolean };
  authError: string | null;
  authSuccess: string | null;
}

export interface AuthInterface {
  payload: {
    email: string;
    password: string;
  };
}

export type AuthPayloadInterface = AuthInterface['payload'];

export interface RecoverInterface {
  payload: string;
}
