import { HassEventBase } from 'home-assistant-js-websocket';


export type StateChangedEvent<T> = HassEventBase & {
  event_type: 'state_changed';
  data: {
    entity_id: string;
    new_state: T | null;
    old_state: T | null;
  };
};
