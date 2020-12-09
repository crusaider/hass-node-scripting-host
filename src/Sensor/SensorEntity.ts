import {
  HassEntityAttributeBase,
  HassEntityBase
} from 'home-assistant-js-websocket';

export type LightEntity = HassEntityBase & {
  readonly attributes: HassEntityAttributeBase & {
  };
};

export enum LightSupportedFeatures {
}
