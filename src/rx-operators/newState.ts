import { OperatorFunction } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { StateChangedEvent } from '../StateChangedEvent';

/**
 * Selects the new state from a emitted {@link StateChangedEvent}.
 */
export function newState<T>(): OperatorFunction<StateChangedEvent<T>, T> {
  return (input$) =>
    input$.pipe(pluck<StateChangedEvent<T>, T>('data', 'new_state'));
}
