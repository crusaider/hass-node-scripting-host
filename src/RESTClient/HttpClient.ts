import axios, { AxiosInstance } from 'axios';

/**
 * @internal
 */
export abstract class HttpClient {
  protected http: AxiosInstance;

  constructor(baseURL: string, token: string) {
    this.http = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
