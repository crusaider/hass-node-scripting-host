import { HassEntity, HassEntityBase } from 'home-assistant-js-websocket';
import { from, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RESTClient } from '../RestClient';
import { attribute, newState, state } from '../rx-operators';
import { HAInstance } from './HAInstance';

export class Entity<
  T extends HassEntityBase = HassEntity,
  S = string
> extends Observable<T> {
  constructor(
    protected readonly instance: HAInstance,
    public readonly id: string
  ) {
    super();
    this.source = this.instance.entityState$<T>(id).pipe(
      newState(),
      filter<T>(Boolean),
      tap<T>((e) => (this._entity = e))
    );

    /*
    super((subs) => {
      this.instance
        .entityState$<T>(id)
        .pipe(
          newState(),
          filter<T>(Boolean),
          tap<T>((e) => (this._entity = e))
        )
        .subscribe({
          next: (r) => subs.next(r),
          error: (e) => subs.error(e),
          complete: () => subs.complete()
        });
    });
*/
    this._entity = undefined;
    this.restClient = instance.rest;
  }

  protected restClient: RESTClient;

  protected _entity: T | undefined;

  /**
   * The last known values of the Entity.
   *
   * @readonly
   * @type {Promise<T>}
   * @memberof Entity
   */
  get entity(): Promise<T> {
    return this._entity
      ? Promise.resolve(this._entity)
      : this.restClient.getEntityState<T>(this.id);
  }

  /**
   * The last known device state.
   *
   * @readonly
   * @type {Promise<S>}
   * @memberof Entity
   */
  get state(): Promise<S> {
    return from(this.entity).pipe(state<S>()).toPromise();
  }

  getAttribute<T>(key: string): Promise<T> {
    return from(this.entity).pipe(attribute<T>(key)).toPromise();
  }

  /**
   * Emits the state whenever it changes.
   *
   * @memberof Entity
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

  async toString(pretty = true): Promise<string> {
    const e = await this.entity;
    return JSON.stringify(e, undefined, pretty ? 2 : undefined);
  }
}
