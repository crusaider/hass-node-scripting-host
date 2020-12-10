import { HassEntityBase } from 'home-assistant-js-websocket';
import { OperatorFunction } from 'rxjs';
import { pluck } from 'rxjs/operators';

/**
 * Plucks a attribute from a home assistant entity.
 *
 * @template AT Type of the attribute.
 * @param  key Property key of the attribute.
 * @returns Value of the attribute
 */
export function attribute<AT>(
  key: string
): OperatorFunction<HassEntityBase, AT> {
  return (input$) => input$.pipe(pluck<HassEntityBase, AT>('attributes', key));
}
