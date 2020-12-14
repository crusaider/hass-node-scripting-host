/* eslint-disable @typescript-eslint/unbound-method */
import { NEVER } from 'rxjs';
import { Mock } from 'ts-mockery';
import { HAInstance } from '../HAInstance';
import { RESTClient } from '../RESTClient';
import { Switch } from './Switch';
import { SwitchEntity } from './SwitchEntity';

describe('Switch', () => {
  describe('Service methods', () => {
    let rest: RESTClient;
    let instance: HAInstance;
    let object: Switch;
    const id = 'switch.id';
    beforeEach(() => {
      rest = Mock.of<RESTClient>();
      instance = Mock.from<HAInstance>({
        rest,
        entityState$: () => NEVER
      });

      object = new Switch(instance, id);
    });

    it('should exist', () => {
      expect(object).toBeDefined();
    });

    describe('entity properties', () => {
      beforeEach(() => {
        Mock.extend(rest).with({
          getEntityState: () =>
            Promise.resolve(
              Mock.of<SwitchEntity>({
                attributes: {
                  is_on: true,
                  current_power_w: 123,
                  total_energy_kwh: 123,
                  is_standby: true
                }
              })
            )
        });
      });

      it('should return property values', async () => {
        expect(await object.isOn).toBeTruthy();
        expect(await object.currentPowerW).toEqual(123);
        expect(await object.totalEnergyKwh).toEqual(123);
        expect(await object.isStandby).toBeTruthy();
      });
    });

    describe('service methods', () => {
      beforeEach(() => {
        Mock.extend(rest).with({ callService: () => Promise.resolve() });
      });
      it('turnOn', async () => {
        await object.turnOn();
        expect(rest.callService).toBeCalledTimes(1);
        expect(rest.callService).toHaveBeenCalledWith('switch', 'turn_on', {
          entity_id: id
        });
      });
      it('turnOff', async () => {
        await object.turnOff();
        expect(rest.callService).toBeCalledTimes(1);
        expect(rest.callService).toHaveBeenCalledWith('switch', 'turn_off', {
          entity_id: id
        });
      });
      it('toggle', async () => {
        await object.toggle();
        expect(rest.callService).toBeCalledTimes(1);
        expect(rest.callService).toHaveBeenCalledWith('switch', 'toggle', {
          entity_id: id
        });
      });
    });
  });
});
