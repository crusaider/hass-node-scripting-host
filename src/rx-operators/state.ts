import { HassEntityBase } from 'home-assistant-js-websocket';
import { OperatorFunction } from 'rxjs';
import { pluck } from 'rxjs/operators';

export function state<ST>(): OperatorFunction<HassEntityBase, ST> {
  return (input$) => input$.pipe(pluck<HassEntityBase, ST>('state'));
}
