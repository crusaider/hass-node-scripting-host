/* eslint-disable @typescript-eslint/unbound-method */
import { HassEntity } from 'home-assistant-js-websocket';
import { of } from 'rxjs';
import { Mock } from 'ts-mockery';
import { Entity, HAInstance } from '.';
import { RESTClient } from '../RESTClient';
import { StateChangedEvent } from '../StateChangedEvent';

describe('Entity', () => {
  let rest: RESTClient;
  let instance: HAInstance;
  let object: Entity;
  const id = 'entity.id';

  const mockUpdate = Mock.of<StateChangedEvent<HassEntity>>({
    event_type: 'state_changed',
    data: {
      entity_id: id,
      new_state: {
        entity_id: id,
        state: 'state',
        attributes: {
          friendly_name: 'friendly_name',
          unit_of_measurement: 'unit_of_measurement',
          icon: 'icon',
          entity_picture: 'entity_picture',
          supported_features: 123,
          hidden: true,
          assumed_state: true,
          device_class: 'device_class'
        }
      }
    }
  });

  beforeEach(() => {
    rest = Mock.of<RESTClient>({
      getEntityState: () => Promise.resolve(mockUpdate.data?.new_state)
    });
    instance = Mock.from<HAInstance>({
      rest,
      entityState$: () => of(mockUpdate)
    });

    object = new Entity(instance, id);
  });

  it('should exist', () => {
    expect(object).toBeDefined();
  });

  describe('toString', () => {
    it('should return a string', async () => {
      expect(await object.toString()).toBeDefined();
    });
  });

  describe('state', () => {
    it('should return a state value', async () => {
      expect(await object.state).toMatch('state');
    });
  });

  describe('getAttribute', () => {
    it('should return a attribute value', async () => {
      expect(await object.getAttribute<string>('friendly_name')).toMatch(
        'friendly_name'
      );
    });
  });

  describe('entity properties', () => {
    it('should return proper values', async () => {
      expect(await object.friendlyName).toMatch('friendly_name');
      expect(await object.unitOfMeasurement).toMatch('unit_of_measurement');
      expect(await object.icon).toMatch('icon');
      expect(await object.entityPicture).toMatch('entity_picture');
      expect(await object.supportedFeatures).toEqual(123);
      expect(await object.hidden).toBeTruthy();
      expect(await object.assumedState).toBeTruthy();
      expect(await object.deviceClass).toMatch('device_class');
    });
  });

  describe('entity', () => {
    describe('socket first', () => {
      beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        object.subscribe(() => {});
      });
      it('should not call rest api', async () => {
        const res = await object.entity;
        expect(res).toBeDefined();
        expect(res.entity_id).toMatch(id);
        expect(rest.getEntityState).not.toHaveBeenCalled();
      });
    });
    describe('rest first', () => {
      it('should call rest api', async () => {
        const res = await object.entity;
        expect(res).toBeDefined();
        expect(res.entity_id).toMatch(id);
        expect(rest.getEntityState).toHaveBeenCalled();
      });
    });
  });
});
