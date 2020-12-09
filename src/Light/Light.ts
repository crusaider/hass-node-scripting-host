import { Entity } from '../HAInstance/Entity';
import { LightEntity } from './LightEntity';
import { LightService, LightServiceOptions } from './LightService';

export class Light
  extends Entity<LightEntity, 'on' | 'off'>
  implements LightService {
  get brightness(): Promise<number | undefined> {
    return this.getAttribute<number | undefined>('brightness');
  }

  get colorTemp(): Promise<number | undefined> {
    return this.getAttribute<number | undefined>('color_temp');
  }

  get effect(): Promise<string | undefined> {
    return this.getAttribute<string | undefined>('effect');
  }

  get effectList(): Promise<string[] | undefined> {
    return this.getAttribute<string[] | undefined>('effect_list');
  }

  get hsColor(): Promise<[number, number] | undefined> {
    return this.getAttribute<[number, number] | undefined>('hs_color');
  }

  get isOn(): Promise<boolean | undefined> {
    return this.getAttribute<boolean | undefined>('is_on');
  }

  get maxMireds(): Promise<number | undefined> {
    return this.getAttribute<number | undefined>('max_mireds');
  }

  get minMireds(): Promise<number | undefined> {
    return this.getAttribute<number | undefined>('min_mireds');
  }

  get whiteValue(): Promise<number | undefined> {
    return this.getAttribute<number | undefined>('white_value');
  }

  // Light service

  async turnOn(options?: LightServiceOptions): Promise<void> {
    await this.restClient.callService('light', 'turn_on', {
      entity_id: this.id,
      ...options
    });
  }

  async turnOff(options?: LightServiceOptions): Promise<void> {
    await this.restClient.callService('light', 'turn_off', {
      entity_id: this.id,
      ...options
    });
  }

  async toggle(options?: LightServiceOptions): Promise<void> {
    await this.restClient.callService('light', 'toggle', {
      entity_id: this.id,
      ...options
    });
  }
}
