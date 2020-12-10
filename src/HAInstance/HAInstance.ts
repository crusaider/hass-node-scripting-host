import {
  Connection,
  createConnection,
  HassEntity,
  HassEntityBase
} from 'home-assistant-js-websocket';
import { Observable } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import { AbstractService } from '../AbstractService';
import { AccessToken } from '../AccessToken';
import { RESTClient } from '../RestClient';
import { StateChangedEvent } from '../StateChangedEvent';
import { createSocketFactory } from './createSocketFactory';
import { Entity } from './Entity';

/**
 * Main entry point to the module. A object of this class represents a
 * running home assistant instance that exposes the websocket and rest
 * API:s.
 *
 * Instances of this class should be created using the static
 * ``create`` method.
 *
 * @export
 * @class HAInstance
 */
export class HAInstance {
  private constructor(
    private readonly wsConnection: Connection,
    public readonly rest: RESTClient
  ) {}

  /**
   * Factory function creating new instances of the class.
   *
   * @param  host Hostname (and port) of the running home
   * assistant system to connect to.
   * @param token A (long lived) token authorizing access
   * to the Home Assistant system.
   */
  public static async create(
    host: string,
    token: AccessToken
  ): Promise<HAInstance> {
    const connection = await createConnection({
      createSocket: createSocketFactory(`ws://${host}/api/websocket`, token)
    });

    const restClient = new RESTClient(`http://${host}/api`, token);

    return new HAInstance(connection, restClient);
  }

  private unSubscribe: () => void = () => undefined;

  /**
   * A hot observable that will emit when there is a state change in the
   * Home Assistant system.
   */
  state$ = new Observable<StateChangedEvent<HassEntity>>((subs) => {
    void this.wsConnection
      .subscribeEvents((evt: StateChangedEvent<HassEntity>) => {
        subs.next(evt);
      }, 'state_changed')
      .then((f) => (this.unSubscribe = f));
  }).pipe(share());

  /**
   * Returns a hot observable that will emit when the state of the given
   * entity changes.
   *
   * @template T Type of the entity to monitor.
   * @param id Id of the entity to monitor.
   */
  entityState$<T extends HassEntityBase>(
    id: string
  ): Observable<StateChangedEvent<T>> {
    return this.state$.pipe(
      map((e) => e as StateChangedEvent<T>),
      filter<StateChangedEvent<T>>((evt) => evt.data.entity_id === id)
    );
  }

  /**
   * Closes the connection to home assistant and unsubscribes all
   * observables.
   */
  close(): void {
    this.unSubscribe();
    this.wsConnection.close();
  }

  /**
   * Returns a {@link Entity} instance or a object of a derived class
   * representing the state of a given entity in the Home Assistant
   * system.
   *
   * @template T A type derived from {@link Entity} matching the type of
   * entity represented by the given ```id```.
   * @param  id Entity id
   * @param  type Optional Class function of T , if omitted a object of
   * class {@link Entity} will be returned.
   * @returns A object of type T.
   */
  getEntity<T extends Entity = Entity>(
    id: string,
    type?: { new (i: HAInstance, id: string): T }
  ): T {
    return type ? new type(this, id) : (new Entity(this, id) as T);
  }
  /**
   * Returns a object derived from {@link AbstractService} ready to send
   * service requests to the Home Assistant system.
   *
   * @template T A type derived from {@link AbstractService}.
   * @param  type Class function of T.
   * @returns A object of type T.
   */
  getService<T extends AbstractService>(type: { new (r: RESTClient): T }): T {
    return new type(this.rest);
  }
}
