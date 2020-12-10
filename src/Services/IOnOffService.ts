export interface IOnOffService {
  readonly turnOn: () => Promise<void>;
  readonly turnOff: () => Promise<void>;
}
