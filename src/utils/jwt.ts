import decodeJWT from 'jwt-decode';
import { isBefore } from 'date-fns';

export const isJWTValid = token => {
  try {
    const decoded: { exp: number } = decodeJWT(token);
    const exp = decoded?.exp || 0;
    const expUTC = exp * 1000;
    const nowUTC = new Date().getTime();
    return isBefore(nowUTC, expUTC);
  } catch {
    return false;
  }
};
