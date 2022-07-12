import 'styled-components';
import { FontSizesTypes, DeviceSizesTypes, DeviceTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontSizes: FontSizesTypes;
    deviceSizes: DeviceSizesTypes;
    device: DeviceTypes;
  }
}
