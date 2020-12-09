export interface SwitchService {
  readonly turnOn: () => Promise<void>;
  readonly turnOff: () => Promise<void>;
  readonly toggle: () => Promise<void>;
}


