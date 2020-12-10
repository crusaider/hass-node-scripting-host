import { HassEntity, HassEntityBase } from 'home-assistant-js-websocket';
import { from, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RESTClient } from '../RestClient';
import { attribute, newState, state } from '../rx-operators';
import { HAInstance } from './HAInstance';

/**
 * Class representing entities on the Home Assistant system. This
 * class gives a generic view of all entities providing
 * functionality to monitor state changes as well as querying current
 * state disregarding.
 *
 * Objects of this call can be treated as a @{link Observable}.*
 *
 * @template T Type of the entity
 * @template S Type of the entity ```state``` property - represented as a
 * string in Home Assistant.
 */
export class Entity<
  T extends HassEntityBase = HassEntity,
  S = string
> extends Observable<T> {
  constructor(
    protected readonly instance: HAInstance,
    public readonly id: string
  ) {
    super();

    // This is a bit of a hack but it works, at least right now:-)
    this.source = this.instance.entityState$<T>(id).pipe(
      newState(),
      filter<T>(Boolean),
      tap<T>((e) => (this._entity = e))
    );

    this._entity = undefined;
    this.restClient = instance.rest;
  }

  protected restClient: RESTClient;

  protected _entity: T | undefined;

  /**
   * The last known values of the Entity.
   *
   * @type {Promise<T>}
   */
  get entity(): Promise<T> {
    return this._entity
      ? Promise.resolve(this._entity)
      : this.restClient.getEntityState<T>(this.id);
  }

  /**
   * The last known device state.
   *
   * @type {Promise<S>}
   */
  get state(): Promise<S> {
    return from(this.entity).pipe(state<S>()).toPromise();
  }

  /**
   * Get the last known value of a entity attribute.
   *
   * @template T Type of entity
   * @param  key Name (key) of attribute
   */
  getAttribute<T>(key: string): Promise<T> {
    return from(this.entity).pipe(attribute<T>(key)).toPromise();
  }

  /**
   * Emits the state whenever it changes.
   *
   */
  readonly state$ = this.pipe(state<S>());

  // Attributes

  get friendlyName(): Promise<string | undefined> {
    return this.getAttribute('friendly_name');
  }

  get unitOfMeasurement(): Promise<string | undefined> {
    return this.getAttribute('unit_of_measurement');
  }

  get icon(): Promise<string | undefined> {
    return this.getAttribute('icon');
  }

  get entityPicture(): Promise<string | undefined> {
    return this.getAttribute('entity_picture');
  }

  get supportedFeatures(): Promise<number | undefined> {
    return this.getAttribute<number | undefined>('supported_features');
  }

  get hidden(): Promise<boolean | undefined> {
    return this.getAttribute<boolean | undefined>('hidden');
  }

  get assumedState(): Promise<boolean | undefined> {
    return this.getAttribute<boolean | undefined>('assumed_state');
  }

  get deviceClass(): Promise<string | undefined> {
    return this.getAttribute('device_class');
  }

  // Misc

  /**
   * Returns a JSON string representation of the last known state of
   * the entity.
   *
   * @param  [pretty=true] Optional value, if true the string will be
   * pretty printed. {@see JSON.stringify} Defaults to ***true***.
   */
  async toString(pretty = true): Promise<string> {
    const e = await this.entity;
    return JSON.stringify(e, undefined, pretty ? 2 : undefined);
  }
}
