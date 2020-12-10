import { HAInstance, Light, Sun } from 'hass-node-scripting-host';
import { distinctUntilChanged, filter, startWith } from 'rxjs/operators';

async function main() {
  // Create a HAInstance to connect to the host
  const instance = await HAInstance.create(
    '192.168.10.4:8123', //'hostname:port',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZjFhZjQyMDNiMzQ0Yzg2OWZmYTNhYzE4ODkzMzZlMCIsImlhdCI6MTYwNjk4NjgwNSwiZXhwIjoxOTIyMzQ2ODA1fQ.6yaqjJ8AfGaKLyCB0_LSn8W1zlzroNEi9FypkamV-z4' //'long-lived-access-token'
  );

  const bedLight = instance.getEntity<Light>('light.sanglampa', Light);
  const sun = instance.getEntity<Sun>(Sun.ENTITY_ID, Sun);

  sun.state$
    .pipe(
      startWith(await sun.state),
      distinctUntilChanged(),
      filter((s) => s === 'below_horizon')
    )
    .subscribe(() => void bedLight.turnOn());

  console.log(await sun.entity);

  // Don't forget to close the connection, the node process will not
  // exit until you do.
  // instance.close();
}

void main();
