import {
  HassEntityAttributeBase,
  HassEntityBase
} from 'home-assistant-js-websocket';

export type SwitchEntity = HassEntityBase & {
  readonly attributes: HassEntityAttributeBase & {
    readonly is_on?: boolean;
    readonly current_power_w?: number;
    readonly total_energy_kwh?: number;
    readonly is_standby?: boolean;
  };
};
