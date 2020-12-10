import {
  HassEntityAttributeBase,
  HassEntityBase
} from 'home-assistant-js-websocket';

/**
 * Properties of a Light entity.
 *
 * See: (Light)[https://developers.home-assistant.io/docs/core/entity/light]
 */
export type LightEntity = HassEntityBase & {
  readonly attributes: HassEntityAttributeBase & {
    //int	None	Return the brightness of this light between 0..255
    readonly brightness?: number;
    //int	None	Return the CT color value in mireds.
    readonly color_temp?: number;
    readonly effect?: string; //String	None	Return the current effect.
    readonly effect_list?: string[]; //list	None	Return the list of supported effects.
    readonly hs_color?: [number, number]; //list	None	Return the hue and saturation color value [float, float].
    readonly is_on?: boolean; //bool	Returns if the light entity is on or not.
    readonly max_mireds?: number; //int	int	Return the warmest color_temp that this light supports.
    readonly min_mireds?: number; //int	int	Return the coldest color_temp that this light supports.
    readonly supported_features?: number; //int	int	Flag supported features.
    readonly white_value?: number; //int	None	Return the white value of this light between 0..255.};
  };
};

export enum LightSupportedFeatures {
  SUPPORT_BRIGHTNESS = 1,
  SUPPORT_COLOR_TEMP = 2,
  SUPPORT_EFFECT = 4,
  SUPPORT_FLASH = 8,
  SUPPORT_COLOR = 16,
  SUPPORT_TRANSITION = 32,
  SUPPORT_WHITE_VALUE = 128
}
