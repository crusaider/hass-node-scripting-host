/* eslint-disable @typescript-eslint/unbound-method */
import { NEVER } from 'rxjs';
import { Mock } from 'ts-mockery';
import { HAInstance } from '../HAInstance';
import { RESTClient } from '../RESTClient';
import { Light } from './Light';
import { LightEntity } from './LightEntity';

describe('Switch', () => {
  describe('Service methods', () => {
    let rest: RESTClient;
    let instance: HAInstance;
    let object: Light;
    const id = 'light.id';
    beforeEach(() => {
      rest = Mock.of<RESTClient>();
      instance = Mock.from<HAInstance>({
        rest,
        entityState$: () => NEVER
      });

      object = new Light(instance, id);
    });

    it('should exist', () => {
      expect(object).toBeDefined();
    });

    describe('entity properties', () => {
      beforeEach(() => {
        Mock.extend(rest).with({
          getEntityState: () =>
            Promise.resolve(
              Mock.of<LightEntity>({
                attributes: {
                  brightness: 123,
                  color_temp: 123,
                  effect: 'effect',
                  effect_list: ['effect1', 'effect2'],
                  hs_color: [123, 123],
                  is_on: true,
                  max_mireds: 123,
                  min_mireds: 123,
                  supported_features: 123,
                  white_value: 123
                }
              })
            )
        });
      });

      it('should return property values', async () => {
        expect(await object.brightness).toEqual(123);
        expect(await object.colorTemp).toEqual(123);
        expect(await object.effect).toMatch('effect');
        expect(await object.effectList).toEqual(['effect1', 'effect2']);
        expect(await object.hsColor).toEqual([123, 123]);
        expect(await object.isOn).toBeTruthy();
        expect(await object.maxMireds).toEqual(123);
        expect(await object.minMireds).toEqual(123);
        expect(await object.whiteValue).toEqual(123);
      });
    });

    describe('service methods', () => {
      beforeEach(() => {
        Mock.extend(rest).with({ callService: () => Promise.resolve() });
      });
      describe('onOffToggle - service options', () => {
        it('turnOn', async () => {
          await object.turnOn({ brightness: 100 });
          expect(rest.callService).toBeCalledTimes(1);
          expect(rest.callService).toHaveBeenCalledWith('light', 'turn_on', {
            entity_id: id,
            brightness: 100
          });
        });
        it('turnOff', async () => {
          await object.turnOff({ brightness: 100 });
          expect(rest.callService).toBeCalledTimes(1);
          expect(rest.callService).toHaveBeenCalledWith('light', 'turn_off', {
            entity_id: id,
            brightness: 100
          });
        });
        it('toggle', async () => {
          await object.toggle({ brightness: 100 });
          expect(rest.callService).toBeCalledTimes(1);
          expect(rest.callService).toHaveBeenCalledWith('light', 'toggle', {
            entity_id: id,
            brightness: 100
          });
        });
      });
    });
  });
});
