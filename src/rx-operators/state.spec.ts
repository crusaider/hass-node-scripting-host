import { HassEntityBase } from 'home-assistant-js-websocket';
import { of } from 'rxjs';
import { state } from './state';
describe('state', () => {
  const baseState: HassEntityBase = {
    entity_id: 'id',
    state: 'state',
    last_changed: 'changed',
    last_updated: 'updated',
    attributes: {},
    context: {
      id: 'id',
      user_id: 'user_id'
    }
  };

  const source$ = of<HassEntityBase>(baseState);

  it('should give a state value', (done) => {
    source$.pipe(state()).subscribe((state) => {
      expect(state).toMatch(baseState.state);
      done();
    });
  });
});
