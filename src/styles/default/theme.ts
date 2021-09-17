/* eslint-disable @typescript-eslint/no-namespace */
import { ThemeInterface } from 'styled-components/native';

declare global {
  namespace ReactNativePaper {
    interface ThemeFonts {
      superLight: string;
    }
    interface ThemeColors {
      customColor: string;
    }
    interface ThemeAnimation {
      customProperty: number;
    }
    interface Theme {
      userDefinedThemeProperty: string;
    }
  }
}

export const defaultTheme: ThemeInterface = {
  theme: 'defaultTheme',
  colors: {
    primary: '#68D1E7',
    primary10: '#80D5E7',
    primary20: '#96D9E7',
    primary30: '#AFDEE8',
    secondary: 'deepskyblue',
    secondary10: '#1AC6FF',
    secondary20: '#33CCFF',
    secondary30: '#4CD2FE',
    tertiary: '#FFFA5D',
    grey: '#808080',
    grey05: '#9A9A9A',
    grey10: '#B1B1B1',
    grey20: '#CBCBCB',
    grey30: '#E7E7E7',
    grey40: '#F2F2F2',
    white: '#FFFFFF',
    white10: '#FCFCFC',
    white20: '#FAFAFA',
    white30: '#F7F7F7',
    white40: '#F5F5F5',
  },
  height: { s: '50px' },
  borderRadius: '4px',
  fonts: {
    weight: { bold: '700', regular: '100' },
    size: { l: '35px', m: '25px', s: '20px', xs: '15px' },
  },
};
