import { HassEntityBase } from 'home-assistant-js-websocket';
import { Mock } from 'ts-mockery';
import { testScheduler } from '../TestUtils';
import { state } from './state';

describe('state operator', () => {
  it('should emit state', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable } = helpers;
      const res$ = hot<HassEntityBase>('a', {
        a: Mock.of<HassEntityBase>({ state: 'state' })
      }).pipe(state());
      expectObservable(res$).toBe('a', { a: 'state' });
    });
  });
});
