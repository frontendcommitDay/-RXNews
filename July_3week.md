## debounceTime
- output 사이에서 특정 시간보다 적은 시간에 배출된 값은 모두 버린다.
- 예를들어, debounceTime(5000)은 4.999999....초 내에 나온 결과는 버린다는 것

### ⛏️PR _ `fix(debounceTime)`_[#6464](https://github.com/ReactiveX/rxjs/pull/6464)
- 완료되기 전 구독 취소 시 task들이 관리되지 않음.
> "notifier subscription"은 더 이상 부모의 subscription 에서 관리되지 않습니다.        
> 남은 task들 (여기서는 dangling task 라고 표기함)들이 남겨져 있습니다.     
> 그런데 이것을 어떻게 test 할지는 모르겠다. 

##### PR_Ans.
- 밑의 예시처럼 `asyncScheduler`의 속성을 사용해 test 할 수 있을 것 같습니다.
```javascript
 expect(animationFrame.actions.length).to.equal(2); 
 action1.unsubscribe(); 
 action2.unsubscribe(); 
 expect(animationFrame.actions.length).to.equal(0);
```

### ✔️PR_Merge
#### 1)  changeLog
- debounceTime-spec.ts
- debounceTime.ts


#### 2) 바뀐 코드
- debounceTime test코드 추가
```javascript
import { AnimationFrameAction } from 'rxjs/internal/scheduler/AnimationFrameAction';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';
import { NEVER, of, Subject } from 'rxjs';

  it('should unsubscribe from the scheduled debounce action when downstream unsubscribes', () => {
    const scheduler = new AnimationFrameScheduler(AnimationFrameAction);
    
<!-- 처음 상태 확인 -->
    expect(scheduler._scheduled).to.not.exist;
    expect(scheduler.actions).to.be.empty;

<!-- debounceTime 구독 -->
    const subscription = NEVER.pipe(startWith(1), debounceTime(0, scheduler)).subscribe();

    expect(scheduler._scheduled).to.exist;
    expect(scheduler.actions.length).to.equal(1);

    subscription.unsubscribe();

<!-- subscription 취소 시 원상복귀 -->
    expect(scheduler._scheduled).to.not.exist;
    expect(scheduler.actions).to.be.empty;
  });
```
- debounceTime.ts 코드 추가
```javascript
if (now < targetTime) {
  // On that case, re-schedule to the new target
  activeTask = this.schedule(undefined, targetTime - now);
  subscriber.add(activeTask);
  return;
}

// Only set up a task if it's not already up
if (!activeTask) {
    activeTask = scheduler.schedule(emitWhenIdle, dueTime);
    subscriber.add(activeTask);
  }
},
```
##### NEVER
- NEVER : Observer 항목을 emit하지 않고, 완료되지 않는 Observable
- 테스트 목적 or Observable구독 자동 폐기를 방지

##### AnimationFrameScheduler
- asyncScheduler: 다른 스케쥴러가 상속받는 부모 스케쥴러 / 일정 시간 이후 실행되도록 만들어준다.
