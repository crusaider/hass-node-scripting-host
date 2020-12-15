import { NEVER } from 'rxjs';
import { Mock } from 'ts-mockery';
import { HAInstance } from '../HAInstance';
import { RESTClient } from '../RESTClient';
import { Sun } from './Sun';
import { SunEntity } from './SunEntity';

describe('Switch', () => {
  describe('Service methods', () => {
    let rest: RESTClient;
    let instance: HAInstance;
    let object: Sun;
    const id = 'sun.sun';
    beforeEach(() => {
      rest = Mock.of<RESTClient>();
      instance = Mock.from<HAInstance>({
        rest,
        entityState$: () => NEVER
      });

      object = new Sun(instance, id);
    });

    it('should exist', () => {
      expect(object).toBeDefined();
    });

    it('there can be only one', () => {
      expect(Sun.ENTITY_ID).toEqual(id);
    });

    describe('entity properties', () => {
      const dateValue = new Date(Date.now());

      beforeEach(() => {
        Mock.extend(rest).with({
          getEntityState: () =>
            Promise.resolve(
              Mock.of<SunEntity>({
                attributes: {
                  next_dawn: dateValue,
                  next_dusk: dateValue,
                  next_midnight: dateValue,
                  next_noon: dateValue,
                  next_rising: dateValue,
                  next_setting: dateValue,
                  elevation: 123,
                  azimuth: 123,
                  rising: true
                }
              })
            )
        });
      });

      it('should return property values', async () => {
        expect(await object.nextDawn).toEqual(dateValue);
        expect(await object.nextDusk).toEqual(dateValue);
        expect(await object.nextMidnight).toEqual(dateValue);
        expect(await object.nextRising).toEqual(dateValue);
        expect(await object.nextSetting).toEqual(dateValue);
        expect(await object.elevation).toEqual(123);
        expect(await object.azimuth).toEqual(123);
        expect(await object.rising).toBeTruthy();
      });
    });
  });
});
