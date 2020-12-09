import { HassEntity } from 'home-assistant-js-websocket';
import { of } from 'rxjs';
import { attribute } from './attribute';

describe('attribute', () => {
  const baseState: HassEntity = {
    entity_id: 'id',
    state: 'state',
    last_changed: 'changed',
    last_updated: 'updated',
    attributes: {
      attr1: 123,
      attr2: 'string'
    },
    context: {
      id: 'id',
      user_id: 'user_id'
    }
  };

  const source$ = of<HassEntity>(baseState);

  it('should give number value', (done) => {
    source$.pipe(attribute<number>('attr1')).subscribe((value) => {
      expect(value).toEqual(123);
      done();
    });
  });
  it('should give string value', (done) => {
    source$.pipe(attribute<number>('attr2')).subscribe((value) => {
      expect(value).toMatch('string');
      done();
    });
  });
});
