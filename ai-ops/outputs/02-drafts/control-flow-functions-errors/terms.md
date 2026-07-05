# 용어 초안: control-flow-functions-errors

## Control Flow
- category: 개발 기초
- shortDefinition: 코드가 어떤 순서와 조건으로 실행될지 정하는 흐름
- explanation: Control Flow는 조건문, 반복문, 함수 호출, 오류 처리처럼 코드의 가능한 실행 경로를 만드는 구조입니다. AI가 생성한 코드를 검토할 때는 문법뿐 아니라 어떤 입력이 어떤 branch와 return value로 이어지는지 확인해야 합니다.
- related: ["Conditional", "Loop", "Exception Handling"]

## Conditional
- category: 개발 기초
- shortDefinition: test result에 따라 다른 code path를 실행하는 구조
- explanation: Conditional은 `if...else`, `switch`, ternary처럼 조건이 true인지 false인지 또는 어떤 case인지에 따라 실행할 code block을 고르는 구조입니다. 빈 값, 권한, 응답 상태, array length 같은 판단 기준을 코드 흐름으로 바꿉니다.
- related: ["Control Flow", "Boolean", "Branch"]

## Loop
- category: 개발 기초
- shortDefinition: 같은 작업을 여러 항목이나 조건에 대해 반복 실행하는 구조
- explanation: Loop는 목록의 각 항목을 처리하거나 특정 조건이 유지되는 동안 같은 규칙을 적용하는 control flow입니다. 시작점, 계속 조건, 갱신, 종료 조건을 함께 읽어야 무한 반복이나 누락을 피할 수 있습니다.
- related: ["Array", "Control Flow", "Iteration"]

## Function
- category: 개발 기초
- shortDefinition: 입력과 처리를 이름 있는 재사용 가능한 코드 블록으로 묶은 단위
- explanation: Function은 reusable blocks of code로, parameter를 받고 내부 body를 실행한 뒤 return value를 낼 수 있습니다. 함수 이름, parameter, return value는 AI에게 작업을 맡기거나 코드 변경을 검토할 때 가장 좋은 경계가 됩니다.
- related: ["Parameter", "Return Value", "Scope"]

## Exception Handling
- category: 개발 기초
- shortDefinition: 정상 흐름으로 처리할 수 없는 실패를 던지고 잡아 다루는 구조
- explanation: Exception Handling은 `throw`와 `try...catch` 같은 흐름으로 실패를 드러내고 처리합니다. 오류를 숨기는 것이 아니라 사용자 메시지, 로그, fallback, 재시도 같은 의미 있는 후속 행동으로 연결해야 합니다.
- related: ["Error Message", "Debugging", "Control Flow"]
