import { HassEntityBase, HassEventBase } from 'home-assistant-js-websocket';

/**
 * Custom version of the StateChangedEvent suppporting a gneric type of
 * the entity that has changed state.
 *
 * @template T Entity tape of the entity.
 */
export type StateChangedEvent<T extends HassEntityBase> = HassEventBase & {
  event_type: 'state_changed';
  data: {
    entity_id: string;
    new_state: T | null;
    old_state: T | null;
  };
};
