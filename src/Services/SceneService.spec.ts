/* eslint-disable @typescript-eslint/unbound-method */
import { Mock } from 'ts-mockery';
import { RESTClient } from '../RESTClient';
import { SceneService } from './SceneService';

describe('SceneService', () => {
  let object: SceneService;
  let rest: RESTClient;
  const id = 'scene.id';
  beforeEach(() => {
    rest = Mock.of<RESTClient>();
    object = new SceneService(rest);
  });

  it('should exist', () => {
    expect(object).toBeDefined();
  });

  describe('service methods', () => {
    beforeEach(() => {
      Mock.extend(rest).with({ callService: () => Promise.resolve() });
    });

    describe('turnOn', () => {
      it('should have been called without transition', async () => {
        await object.turnOn(id);
        expect(rest.callService).toBeCalledTimes(1);
        expect(rest.callService).toHaveBeenCalledWith('scene', 'turn_on', {
          entity_id: id
        });
      });
      it('should have been called with transition', async () => {
        await object.turnOn(id, 1000);
        expect(rest.callService).toBeCalledTimes(1);
        expect(rest.callService).toHaveBeenCalledWith('scene', 'turn_on', {
          entity_id: id,
          transition: 1000
        });
      });
    });
  });
});
