import {
  HassEntityAttributeBase,
  HassEntityBase
} from 'home-assistant-js-websocket';

/**
 * https://www.home-assistant.io/integrations/sun/
 */
export type SunEntity = HassEntityBase & {
  readonly attributes: HassEntityAttributeBase & {
    readonly next_dawn: Date;
    readonly next_dusk: Date;
    readonly next_midnight: Date;
    readonly next_noon: Date;
    readonly next_rising: Date;
    readonly next_setting: Date;
    readonly elevation: number;
    readonly azimuth: number;
    readonly rising: boolean;
  };
};
