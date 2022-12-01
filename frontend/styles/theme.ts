import { DefaultTheme } from 'styled-components';

const calcRem = (size: number) => `${size / 16}rem`;

const fontSizes = {
  xs: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  title: calcRem(32),
  titleL: calcRem(40),
  titleXL: calcRem(48),
  titleXXL: calcRem(60),
};

const fontWeights = {
  small: 300,
  base: 400,
  lg: 500,
  xl: 700,
};

const lightColors = {
  default: '#121212',
  basic1: '#4b53e5',
  basic2: '#7279ff',
  black1: '#353535',
  gray1: '#495057',
  gray2: '#959595',
  gray3: '#e0e0e0',
  blue1: '#49c7f6',
};

const darkColors = {
  default: '#f9f9f9',
  basic1: '#4b53e5',
  basic2: '#c0c3ff',
  black1: '#efebeb',
  gray1: '#bbbfc3',
  gray2: '#acacac',
  gray3: '#727272',
  blue1: '#49c7f6',
};

const lightBackgroundColors = {
  body: '#f6f6f6',
  default: '#ffffff',
  white1: '#f2f2f2',
  white2: '#f2f2f2',
  basic1: '#4b53e5',
  basic2: '#7279ff',
  black1: '#353535',
  gray1: '#eee',
  blue1: '#a1e3fc',
  blue2: '#58d1ff',
  red1: '#ff4e4e',
  purple1: '#7e2db2',
  yellow1: '#f9e000',
};

const darkBackgroundColors = {
  body: '#121212',
  default: '#141414',
  white1: '#3e3e3e',
  white2: '#191919',
  basic1: '#4b53e5',
  basic2: '#7279ff',
  black1: '#efebeb',
  gray1: '#b2b2b2',
  blue1: '#a1e3fc',
  blue2: '#58d1ff',
  red1: '#ff4e4e',
  purple1: '#7e2db2',
  yellow1: '#f9e000',
};

const deviceWrapSizes = {
  tablet: '768px',
  tabletL: 'calc(100% - 2rem)',
  laptop: '1024px',
  laptopL: '1376px',
  default: '1728px',
};

const deviceSizes = {
  mobile: '375px',
  tablet: '768px',
  tabletL: '1024px',
  laptop: '1440px',
  laptopL: '1919px',
};

const device = {
  mobile: `screen and (max-width:${deviceSizes.mobile})`,
  tablet: `screen and (max-width:${deviceSizes.tablet})`,
  tabletL: `screen and (max-width:${deviceSizes.tabletL})`,
  laptop: `screen and (max-width:${deviceSizes.laptop})`,
  laptopL: `screen and (max-width:${deviceSizes.laptopL})`,
};

export type FontSizesTypes = typeof fontSizes;
export type FontWeightsTypes = typeof fontWeights;
export type DeviceSizesTypes = typeof deviceSizes;
export type DeviceTypes = typeof device;
export type DeviceWrapSizesTypes = typeof deviceWrapSizes;
export type ColorsTypes = typeof lightColors;
export type BackgroundColorsTypes = typeof lightBackgroundColors;
export type CalcRemTypes = typeof calcRem;

const theme: DefaultTheme = {
  fontSizes,
  fontWeights,
  deviceSizes,
  device,
  deviceWrapSizes,
  calcRem,
};

export const lightTheme: DefaultTheme = {
  ...theme,
  colors: lightColors,
  backgroundColors: lightBackgroundColors,
};

export const darkTheme: DefaultTheme = {
  ...theme,
  colors: darkColors,
  backgroundColors: darkBackgroundColors,
};
