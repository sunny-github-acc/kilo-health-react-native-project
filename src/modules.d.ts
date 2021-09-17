declare module 'reactotron-react-native/dist/flipper';
declare namespace NodeJS {
  interface Global {
    width: number;
    height: number;
    aspectRatio: number;
    timeFormat: string;
    isSmallScreen: boolean;
    isSmallHeight: boolean;
    isIOS: boolean;
    hasNotch: boolean;
    brand: string;
    localeId: string;
  }
}
