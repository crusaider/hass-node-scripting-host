import { HassEntity } from 'home-assistant-js-websocket';
import { AccessToken } from '../AccessToken';
import { HttpClient } from './HttpClient';

/**
 * Wraps a set of REST endpoints for communication with the Home
 * Assistant system.
 *
 * See [Home Assistant REST API](https://developers.home-assistant.io/docs/api/rest/)
 * @internal
 */
export class RESTClient extends HttpClient {
  constructor(baseUrl: string, token: AccessToken) {
    super(baseUrl, token);
  }

  /**
   * Get a entity.
   *
   * See: []
   *
   * @template T Type of the requested entity.
   * @param id Entity id of the entity to request.
   *
   */
  getEntityState<T = HassEntity>(id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http
        .get<T>(`/states/${id}`)
        .then((r) => resolve(r.data))
        .catch((e) => reject(e));
    });
  }

  /**
   * Call a service in Home Assistant.
   *
   * @param domain Service domain
   * @param service Service name
   * @param serviceData Optional additional data to supply to the service.
   * @returns {Promise<HassEntity[]>} A array of entities who's state
   * changed during the service execution.
   */
  callService(
    domain: string,
    service: string,
    serviceData: Record<string, unknown> = {}
  ): Promise<HassEntity[]> {
    return new Promise<HassEntity[]>((resolve, reject) => {
      this.http
        .post<HassEntity[]>(`/services/${domain}/${service}`, serviceData)
        .then((r) => resolve(r.data))
        .catch((e) => reject(e));
    });
  }
}
