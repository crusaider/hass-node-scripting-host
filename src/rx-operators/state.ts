import { HassEntityBase } from 'home-assistant-js-websocket';
import { OperatorFunction } from 'rxjs';
import { pluck } from 'rxjs/operators';

/**
 * Plucks the ```state``` value from an entity.
 *
 * @template ST The type of the state value (always represented as a
 * string in Home Assistant)
 * @returns The state value
 */
export function state<ST extends string = string>(): OperatorFunction<
  HassEntityBase,
  ST
> {
  return (input$) => input$.pipe(pluck<HassEntityBase, ST>('state'));
}
