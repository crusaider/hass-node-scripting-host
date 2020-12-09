import { Entity } from '../HAInstance/Entity';
import { HAInstance } from '../HAInstance/HAInstance';
import { WeatherEntity } from './WeatherEntity';

export class Weather extends Entity<WeatherEntity, 'string'> {
  constructor(protected readonly instance: HAInstance, public readonly id: string) {
    super(instance, id);
  }
}
