import { from, Observable, of } from 'rxjs';
import { repeat } from 'rxjs/operators';

const FALSE = false;

describe('rxjs repeat', () => {
  it('sequence', (done) => {
    let sum = 0;

    of(1, 2)
      .pipe()
      .subscribe((val) => {
        if ((sum += val) === 3) {
          done();
        }
      });
  });

  it('repeat', (done) => {
    let sum = 0;

    of(1)
      .pipe(repeat(2))
      .subscribe((val) => {
        if ((sum += val) === 2) {
          done();
        }
      });
  });
  if (FALSE) {
    it('promise', (done) => {
      let pCount = 0;
      let sum = 0;

      const source: () => Promise<number> = () =>
        new Promise<number>((resolve) => {
          pCount++;
          resolve(1);
        });

      from(source())
        .pipe(repeat(2))
        .subscribe((val) => {
          if ((sum += val) === 2) {
            expect(pCount).toEqual(2);
            done();
          }
        });
    });

    it('observable', (done) => {
      let pCount = 0;
      let sum = 0;

      const source: () => Promise<number> = () =>
        new Promise<number>((resolve) => {
          pCount++;
          console.log('promise');
          resolve(1);
        });

      const source$ = new Observable<number>((observer) => {
        void source().then((val) => observer.next(val));
      });

      source$.pipe(repeat(2)).subscribe((val) => {
        if ((sum += val) === 2) {
          expect(pCount).toEqual(2);
          done();
        }
      });
    });
  }
});
