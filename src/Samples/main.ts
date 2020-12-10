import * as env from 'dotenv';
import { HAInstance } from '..';
import { dimLight } from './dimLight';
import { sun } from './sun';

env.config();

const FALSE = false;

async function main() {
  const instance = await HAInstance.create(
    process.env.HASS_HOST as string,
    process.env.HASS_TOKEN as string
  );

  await sun(instance);

  if (FALSE) {
    /*
    delayedAction(
      1000,
      instance.getEntity<Switch>('switch.skrivbord', Switch),
      //async <IToggleService>(e: IToggleService) => void e.toggle()
    );*/
    await dimLight(instance, true);
  }

  instance.close();
}

void main();
