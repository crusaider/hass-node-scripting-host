export interface LightServiceOptions {
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
