import { HassEntityBase } from 'home-assistant-js-websocket';
import { OperatorFunction } from 'rxjs';
import { pluck } from 'rxjs/operators';

export function attribute<AT>(
  key: string
): OperatorFunction<HassEntityBase, AT> {
  return (input$) => input$.pipe(pluck<HassEntityBase, AT>('attributes', key));
}
