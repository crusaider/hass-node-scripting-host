import * as env from 'dotenv';
import { HAInstance, Switch } from '..';
import { delayedAction } from './delayedAction';
import { dimLight } from './dimLight';

env.config();

const FALSE = false;

async function main() {
  const instance = await HAInstance.create(
    process.env.HASS_HOST as string,
    process.env.HASS_TOKEN as string
  );

  if (FALSE) {
    delayedAction(
      1000,
      instance.getEntity<Switch>('switch.skrivbord', Switch),
      (e) => void e.toggle()
    );
  }
  await dimLight(instance, true);

  instance.close();
}

void main();
