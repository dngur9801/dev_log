import { DefaultTheme } from 'styled-components';

const colors = {
  black: '#1e1f1d',
  yellow: '#edb83c',
  orange: '#eb7952',
  gray: '#6e6e6e',
  gray_background: '#f5f5f5',
};

export type ColorsTypes = typeof colors;

export const theme: DefaultTheme = {
  colors,
};
