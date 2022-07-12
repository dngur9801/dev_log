import { DefaultTheme } from 'styled-components';

const fontSizes = {
  fontSizeS: '0.8rem',
  fontSizeM: '1rem',
  fontSizeL: '1.2rem',
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
export type DeviceSizesTypes = typeof deviceSizes;
export type DeviceTypes = typeof device;

export const theme: DefaultTheme = {
  fontSizes,
  deviceSizes,
  device,
};
