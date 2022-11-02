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
  title: calcRem(28),
  titleL: calcRem(32),
  titleXL: calcRem(36),
};

const fontWeights = {
  small: 300,
  base: 400,
  lg: 500,
  xl: 700,
};

const colors = {
  black1: '#353535',
  gray1: '#495057',
  gray2: '#959595',
  gray3: '#eeeeee',
  blue1: '#49c7f6',
};

const backgroundColors = {
  black1: '#353535',
  gray1: '#eee',
  blue1: '#a1e3fc',
  blue2: '#58d1ff',
  blue3: '#4b53e5',
  red1: '#ff4e4e',
  purple1: '#7e2db2',
  yellow1: '#f9e000',
};

// 보라색 계열로

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
export type ColorsTypes = typeof colors;
export type BackgroundColorsTypes = typeof backgroundColors;
export type CalcRemTypes = typeof calcRem;

export const theme: DefaultTheme = {
  fontSizes,
  fontWeights,
  deviceSizes,
  device,
  deviceWrapSizes,
  colors,
  backgroundColors,
  calcRem,
};
