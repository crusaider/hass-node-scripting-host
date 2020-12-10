import { HassEntityBase } from 'home-assistant-js-websocket';
import { OperatorFunction } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { StateChangedEvent } from './../StateChangedEvent';

/**
 * Plucks the new state from a emitted {@link StateChangedEvent}.
 *
 * @template T Type of the entity that has changed state.
 * @returns The new state from the {@link StateChangedEvent}.
 */
export function newState<T extends HassEntityBase>(): OperatorFunction<
  StateChangedEvent<T>,
  T
> {
  return (input$) =>
    input$.pipe(pluck<StateChangedEvent<T>, T>('data', 'new_state'));
}
