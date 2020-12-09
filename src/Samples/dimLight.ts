import { defer, Subject } from 'rxjs';
import { delay, repeat, takeUntil, tap } from 'rxjs/operators';
import { HAInstance } from '..';
import { Light } from '../Light';
import { attribute } from '../rx-operators';

export async function dimLight(
  instance: HAInstance,
  doLog = false
): Promise<void> {
  return new Promise<void>((resolve) => {
    const bedLight = instance.getEntity<Light>('light.sanglampa', Light);

    let brightness_pct = 100;

    const controller = new Subject();

    defer(async () => await bedLight.turnOn({ brightness_pct }))
      .pipe(
        tap(() => (brightness_pct -= 1)),
        delay(1),
        repeat(100)
      )
      .subscribe({
        complete: () => {
          controller.next();
          resolve();
        }
      });

    if (doLog) {
      bedLight
        .pipe(takeUntil(controller), attribute<string>('brightness'))
        .subscribe({
          next: (value) => console.log(value)
        });
    }
  });
}
