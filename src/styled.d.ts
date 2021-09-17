import { ThemeInterface } from 'styled-components/native';

declare module 'styled-components/native' {
  export interface ThemeInterface {
    theme?: string;
    type?: string;
    colors?: AppColors;
    height?: { s: string };
    borderRadius?: string;
    fonts?: {
      size?: {
        xs?: string;
        s?: string;
        m?: string;
        l?: string;
        xl?: string;
        xxl?: string;
        xxxl?: string;
        x64?: string;
      };
      weight?: {
        regular?: string;
        bold?: string;
        italic?: string;
      };
    };
    shadows?: {
      default?: string;
      light?: string;
      medium?: string;
      strong?: string;
    };
    headers?: {
      main?: number;
      inner?: number;
      paralax?: number;
    };
    hitSlop?: {
      top?: number;
      left?: number;
      bottom?: number;
      right?: number;
    };
  }
}

export interface AppColors {
  accent?: ThemeInterface;
  primary?: string;
  secondary?: string;
  secondary10?: string;
  secondary20?: string;
  secondary30?: string;
  tertiary?: string;
  primaryContent?: string;
  primary10?: string;
  primary20?: string;
  primary30?: string;
  primary60?: string;
  secondaryContent?: string;
  invertedContent?: string;
  grey?: string;
  grey05?: string;
  grey10?: string;
  grey20?: string;
  grey30?: string;
  grey40?: string;
  grey60?: string;
  green?: string;
  greenLight?: string;
  yellow?: string;
  lightOrange?: string;
  background?: string;
  backgroundPrimary?: string;
  backgroundSecondary?: string;
  white?: string;
  blueLight?: string;
  white90?: string;
  white80?: string;
  white60?: string;
  white50?: string;
  white40?: string;
  white30?: string;
  white20?: string;
  white10?: string;
  input?: string;
  black?: string;
  black80?: string;
  black70?: string;
  black60?: string;
  black50?: string;
  black40?: string;
  black30?: string;
  black20?: string;
  black10?: string;
  text?: string;
  text10?: string;
  text15?: string;
  text20?: string;
  text40?: string;
  text50?: string;
  text60?: string;
  text80?: string;
  tabBarItemInactive?: string;
  error?: string;
  orange?: string;
  redDark?: string;
  red?: string;
  cancel?: string;
  border?: string;
  almostWhite?: string;
  backgroundLight?: string;
  placeholder?: string;
}
