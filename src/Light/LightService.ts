export interface LightService {
  readonly turnOn: (options?: LightServiceOptions) => Promise<void>;
  readonly turnOff: (options?: LightServiceOptions) => Promise<void>;
  readonly toggle: (options?: LightServiceOptions) => Promise<void>;
}

export interface LightServiceOptions {
  //readonly device_id: string;
  readonly transition?: number;
  readonly rgb_color?: [number, number, number];
  readonly color_name?: string;
  readonly hs_color?: [number, number];
  readonly xy_color?: [number, number];
  readonly color_temp?: number;
  readonly kelvin?: number;
  readonly white_value?: number;
  readonly brightness?: number;
  readonly brightness_pct?: number;
  readonly profile?: string;
  readonly flash?: 'short' | 'long';
  readonly effect?: string;
}
