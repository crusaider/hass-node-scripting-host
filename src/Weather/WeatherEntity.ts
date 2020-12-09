import {
  HassEntityAttributeBase,
  HassEntityBase
} from 'home-assistant-js-websocket';

export type WeatherEntity = HassEntityBase & {
  readonly attributes: HassEntityAttributeBase & {
    readonly condition: string; //	string	Required	The current weather condition.
    readonly temperature: number; //	float	Required	The current temperature in °C or °F.
    readonly temperature_unit: string; //	string	Required	The temperature unit, °C or °F.
    readonly pressure?: number; //	float	None	The current air pressure in hPa or inHg.
    readonly humidity?: number; //	float	None	The current humidity in %.
    readonly ozone?: number; //	float	None	The current ozone level.
    readonly visibility?: number; //	float	None	The current visibility in km or mi.
    readonly wind_speed?: number; //	float	None	The current wind speed in km/h or mi/h.
    readonly wind_bearing?: number; //	float or string	None	The current wind bearing in azimuth angle (degrees) or 1-3 letter cardinal direction.
    readonly attribution?: string; //	string	None	The branding text required by the API provider.
    readonly forecast?: WeatherForecast[]; //	array	None	Daily or Hourly forecast data.
  };
};

interface WeatherForecast {
  readonly datetime: string; //	string	Required	UTC Date time in RFC 3339 format.
  readonly temperature: number; //	float	Required	The higher temperature in °C or °F
  readonly condition?: string; //	string	None	The weather condition at this point.
  readonly templow?: number; //float	None	The lower daily Temperature in °C or °F
  readonly precipitation?: number; //float	None	The precipitation amount in mm or inch.
  readonly precipitation_probability?: number; //	int	None	The probability of precipitation in %.
  readonly wind_bearing?: number; //	float or string	None	The wind bearing in azimuth angle (degrees) or 1-3 letter cardinal direction.
  readonly wind_speed?: number; //int	None	The wind speed in km/h or mi/h.
}
