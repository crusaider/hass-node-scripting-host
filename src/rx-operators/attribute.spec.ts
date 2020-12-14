import { HassEntity, HassEntityBase } from 'home-assistant-js-websocket';
import { Mock } from 'ts-mockery';
import { testScheduler } from '../TestUtils';
import { attribute } from './attribute';

describe('attribute operator', () => {
  it('string attribute', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable } = helpers;

      const res$ = hot<HassEntityBase>('a', {
        a: Mock.of<HassEntity>({ attributes: { attr1: 'value1' } }),
        b: Mock.of<HassEntity>()
      }).pipe(attribute<string>('attr1'));
      expectObservable(res$).toBe('a', { a: 'value1', b: undefined });
    });
  });
  it('string attribute', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable } = helpers;

      const res$ = hot<HassEntityBase>('a', {
        a: Mock.of<HassEntity>({ attributes: { attr1: 1 } }),
        b: Mock.of<HassEntity>()
      }).pipe(attribute<number>('attr1'));
      expectObservable(res$).toBe('a', { a: 1, b: undefined });
    });
  });
});
