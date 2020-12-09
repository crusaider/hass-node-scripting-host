import {
  Connection,
  createConnection,
  HassEntity
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
   * @static
   * @param {string} host Hostname (and port) of the running home
   * assistant system to connect to.
   * @param {AccessToken} token A (long lived) token authorizing access
   * to the Home Assistant system.
   * @returns {Promise<HAInstance>}
   * @memberof HAInstance
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
   * A hot observable that will emit when any state changes.
   *
   * @memberof HAInstance
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
   * @param {string} id Id of the entity to monitor.
   * @returns {Observable<StateChangedEvent<T>>}
   * @memberof HAInstance
   */
  entityState$<T>(id: string): Observable<StateChangedEvent<T>> {
    return this.state$.pipe(
      map((e) => e as StateChangedEvent<T>),
      filter<StateChangedEvent<T>>((evt) => evt.data.entity_id === id)
    );
  }

  /**
   * Closes the connection to home assistant and unsubscribes all
   * observables.
   *
   * @memberof HAInstance
   */
  close(): void {
    this.unSubscribe();
    this.wsConnection.close();
  }

  getEntity<T extends Entity = Entity>(
    id: string,
    type?: { new (i: HAInstance, id: string): T }
  ): T {
    return type ? new type(this, id) : (new Entity(this, id) as T);
  }

  getService<T extends AbstractService>(type: { new (r: RESTClient): T }): T {
    return new type(this.rest);
  }
}
