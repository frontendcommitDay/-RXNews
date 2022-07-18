# [6911](https://github.com/ReactiveX/rxjs/pull/6911)

## 요약
 - exhaustAll 함수의 구현을 기존의 exhaustMap 함수로 대체 하였음                                                                                                         
 - Converts a higher-order Observable into a first-order Observable by dropping inner Observables while the previous inner Observable has not yet completed                                                                 
 - 이전 내부 Observable 이 아직 완료되지 않은 상태에서 내부 Observable 을 삭제하여 고차 Observable을 1차 Observable로 변환합니다.
                                                      
 - 기존 코드를 exhaustMap(identity) 로 고쳣다.
 - Projects each source value to an Observable which is merged in the output Observable only if the previous projected Observable has completed.
 - 이전에 투영된 Observable 이 완료된 경우에만 출력 Observable에 병합되는 Observable 에 각 소스 값을 투영합니다.
                   



```javascript
import { exhaustAll, exhaustMap, firstValueFrom, lastValueFrom, of, identity } from 'rxjs'
                                                   
const a = of(of(1))

const a1 = await firstValueFrom(a.pipe(exhaustMap(identity)))
assert.deepStrictEqual(a1, 1) // success

const a2 = await firstValueFrom(a.pipe(exhaustAll()))
assert.deepStrictEqual(a2, 1) // success

const a3 = await lastValueFrom(a.pipe(exhaustMap(identity)))
assert.deepStrictEqual(a3, 1) // success

const a4 = await lastValueFrom(a.pipe(exhaustAll()))
assert.deepStrictEqual(a4, 1) // timeout cause `a4` never resolves

```