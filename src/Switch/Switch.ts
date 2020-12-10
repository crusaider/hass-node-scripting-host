import { IOnOffService, IToggleService } from '..';
import { Entity } from '../HAInstance/Entity';
import { SwitchEntity } from './SwitchEntity';

export class Switch
  extends Entity<SwitchEntity, 'on' | 'off'>
  implements IOnOffService, IToggleService {
  get isOn(): Promise<boolean | undefined> {
    return this.getAttribute<boolean | undefined>('is_on');
  }

  get currentPowerW(): Promise<number | undefined> {
    return this.getAttribute<number | undefined>('current_power_w');
  }

  get totalEnergyKwh(): Promise<number | undefined> {
    return this.getAttribute<number | undefined>('total_energy_kwh');
  }

  get isStandby(): Promise<boolean | undefined> {
    return this.getAttribute<boolean | undefined>('is_standby');
  }

  // IOnOffService

  async turnOn(): Promise<void> {
    await this.restClient.callService('switch', 'turn_on', {
      entity_id: this.id
    });
  }

  async turnOff(): Promise<void> {
    await this.restClient.callService('switch', 'turn_off', {
      entity_id: this.id
    });
  }

  // IToggleService

  async toggle(): Promise<void> {
    await this.restClient.callService('switch', 'toggle', {
      entity_id: this.id
    });
  }
}
