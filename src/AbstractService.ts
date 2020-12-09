import { RESTClient } from './RESTClient';

export abstract class AbstractService {
  constructor(protected readonly restClient: RESTClient) {}
}
