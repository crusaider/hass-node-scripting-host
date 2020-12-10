import { Entity } from '../HAInstance/Entity';
import { SunEntity } from './SunEntity';

export class Sun extends Entity<SunEntity, 'above_horizon' | 'below_horizon'> {
  /**
   * The is only one instance of this entity with a fixed id.
   */
  static readonly ENTITY_ID = 'sun.sun';

  get nextDawn(): Promise<Date> {
    return this.getAttribute<Date>('next_dawn');
  }
  get nextDusk(): Promise<Date> {
    return this.getAttribute<Date>('next_dusk');
  }
  get nextMidnight(): Promise<Date> {
    return this.getAttribute<Date>('next_midnight');
  }
  get nextRising(): Promise<Date> {
    return this.getAttribute<Date>('next_rising');
  }
  get nextSetting(): Promise<Date> {
    return this.getAttribute<Date>('next_setting');
  }
  get elevation(): Promise<number> {
    return this.getAttribute<number>('elevation');
  }
  get azimuth(): Promise<number> {
    return this.getAttribute<number>('azimuth');
  }
  get rising(): Promise<boolean> {
    return this.getAttribute<boolean>('rising');
  }
}
