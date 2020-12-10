import { from, of } from 'rxjs';
import { delay, repeat, switchMap } from 'rxjs/operators';
import { HAInstance, Light, Sun } from '..';

export async function sun(instance: HAInstance): Promise<void> {
  const sun = instance.getEntity<Sun>(Sun.ENTITY_ID, Sun);
  const light = instance.getEntity<Light>('light.sanglampa', Light);

  console.log(await sun.nextDawn);

  from(sun.nextSetting)
    .pipe(
      switchMap((nextSetting) => of().pipe(delay(nextSetting))),
      repeat()
    )
    .subscribe(() => {
      void light.turnOn();
    });
}
