# 반응형 프로그래밍(Rxjs)

## 개요

- 모든 메이저언어에 사용 가능
- 실행중에 값이 변할수있는 변수들이 존재함
- 순수함수로 짠다(스레드로 교차방지) =>  선언형 프로그래밍 (과정을 나타냄)  ( 반] 명령형 )

~~~javascript
const {range} = rxjs;
const {filter, take, map, toArray} = rxjs.operators

range(1, 20).pipe(
	filter(n => n % 2 === 0),
	take(5),
	map(n => Math.pow(n, 2)),
	toArray(),
	map(arr => arr.join(''))
).
subscribe(console.log)


~~~

- range(Stream)  은 Operator(pipe) 를 통해서 계산한는 순수함수 => subscribe(옵저버)
- lodash, vanilla 있는데 왜 사용?
- ReactiveX 평면적인 1차원 값을 네트워크 요청, 배열, 시간 파이프 라인을 감시한다.

1) interval,
2) fromEvent(DomEvent),
3) ajax

```javascript
const {range} = rxjs;
const {ajax} = rxjs.ajax;
const {mergeMap, toArray, pluck, retry} = rxjs.operators
range(1, 20).pipe(
	mergeMap(index => ajax(
			`http://127.0.0.1:3000/peolpe/quarter-error/${index}`
		).pipe(
			pluck('response', 'first_name'),
			retry(3)
		)
		, 4),
	toArray()
).subscribe(console.log) // 선언형 (반응형, 함수형)

```


1) 키보드 이벤트
2) 마우스 휠, 휠 이벤트
3) 이벤트 제어
- 활용해서 스크립트(프롬프트 를 이용해 자막을 키보드 스크롤로 만드는 서비스)

## Observable
 - 시간에 구애받지 않는 스트리밍이다.
 - lazy 함수다, 누군가가 구독을 해야 발행을 시작, 각 구독자에게 따로 발행한다.
 - 만들수 잇는 4가지 함수
   - of: 그냥 값을 넣어서 스트리밍을 만든다.
   - from: 배열값을 옵저버블로 만든다
   - range: 범위안의 값을 생성해 옵저버블로 만든다
   - generate: 포문과 같이 특정한 옵저버를로 만든다.