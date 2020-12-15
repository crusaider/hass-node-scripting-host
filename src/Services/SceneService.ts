import { AbstractService } from '../AbstractService';

export class SceneService extends AbstractService {
  async turnOn(ids: string | string[], transition?: number): Promise<void> {
    await this.restClient.callService('scene', 'turn_on', {
      entity_id: ids,
      transition
    });
  }
}
