import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { IOnOffService } from '..';

export function delayedAction(
  delay: number,
  e: IOnOffService | IOnOffService,
  a: <T>(e: T) => void
): void {
  interval(delay)
    .pipe(take(1))
    .subscribe(() => a(e));
}
