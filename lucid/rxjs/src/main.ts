// import {interval, take, lastValueFrom, of, firstValueFrom} from 'rxjs';
//
// async function execute() {
//   const source$ = interval(2000).pipe(take(2));
//   const finalNumber = await lastValueFrom(source$);
//   console.log(`The final number is ${finalNumber}`);
// }
//
// execute();
//
// async function execute2() {
//   const source$ = interval(2000).pipe(take(2));
//   const finalNumber = await firstValueFrom(source$);
//   console.log(`The first number is ${finalNumber}`);
// }
//
// execute2()
//
//
// const a = of(of(1));
// console.log(a)

import {fromEvent, map, interval, take, exhaustAll, lastValueFrom, of} from 'rxjs';
import {run} from "./opservable";

const clicks = fromEvent(document, 'click');
const higherOrder = clicks.pipe(
  map(() => interval(1000).pipe(take(5)))
);
const result = higherOrder.pipe(exhaustAll());
result.subscribe(x => console.log(x));

const a = of(of(1))
const a4 = await lastValueFrom(a.pipe(exhaustAll()))

console.log({a4})
run()