import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { Light } from '..';
import { Switch } from '..';

export function delayedAction(
  delay: number,
  e: Switch | Light,
  a: (e: Switch | Light) => void
): void {
  interval(delay)
    .pipe(take(1))
    .subscribe(() => a(e));
}
