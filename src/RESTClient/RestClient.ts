import { HassEntity } from 'home-assistant-js-websocket';
import { AccessToken } from '../AccessToken';
import { HttpClient } from './HttpClient';

/**
 * 
 */

export class RESTClient extends HttpClient {
  constructor(baseUrl: string, token: AccessToken) {
    super(baseUrl, token);
  }

  getEntityState<T = HassEntity>(id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http
        .get<T>(`/states/${id}`)
        .then((r) => resolve(r.data))
        .catch((e) => reject(e));
    });
  }
  callService(
    domain: string,
    service: string,
    serviceData: Record<string, unknown>
  ): Promise<HassEntity[]> {
    return new Promise<HassEntity[]>((resolve, reject) => {
      this.http
        .post<HassEntity[]>(`/services/${domain}/${service}`, serviceData)
        .then((r) => resolve(r.data))
        .catch((e) => reject(e));
    });
  }
}
