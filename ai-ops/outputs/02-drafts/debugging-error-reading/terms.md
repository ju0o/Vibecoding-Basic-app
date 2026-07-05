# 용어 초안: debugging-error-reading

## Debugging
- category: 개발 기초
- shortDefinition: 코드가 기대와 다르게 동작하는 원인을 찾아 수정하는 활동
- explanation: Debugging은 오류 메시지, console output, breakpoint, variables, call stack 같은 단서를 이용해 실패 원인을 좁히는 절차입니다. AI와 협업할 때는 원인 추측보다 재현 가능한 evidence packet을 만드는 것이 중요합니다.
- related: ["Error Message", "Breakpoint", "Verification"]

## Error Message
- category: 개발 기초
- shortDefinition: 코드 실행 실패의 종류와 위치를 설명하는 텍스트 단서
- explanation: Error Message는 error type, message, file, line 같은 정보를 포함할 수 있습니다. 메시지를 일부만 요약하지 말고 원문으로 보존하면 MDN error reference나 AI 디버깅 요청에서 더 정확하게 대조할 수 있습니다.
- related: ["Debugging", "JavaScript Error Reference", "Command Output"]

## Breakpoint
- category: 개발 기초
- shortDefinition: debugger가 코드 실행을 멈추도록 지정한 위치
- explanation: Breakpoint는 특정 line에서 실행을 멈추고 현재 variables, watch expression, call stack을 확인하게 합니다. 오류가 특정 branch나 반복 중에만 발생할 때 실제 runtime state를 보는 데 유용합니다.
- related: ["Debugger", "Call Stack", "Variable Inspection"]

## Call Stack
- category: 개발 기초
- shortDefinition: 현재 실행 지점까지 이어진 함수 호출 경로
- explanation: Call Stack은 오류가 드러난 line뿐 아니라 어떤 함수들이 그 지점까지 호출되었는지 보여줍니다. 오류 location과 실제 원인이 다를 수 있으므로 call stack은 원인을 거슬러 올라가는 중요한 단서입니다.
- related: ["Function", "Debugging", "Breakpoint"]

## Evidence Packet
- category: AI 코딩
- shortDefinition: AI에게 오류 분석을 맡길 때 함께 제공하는 실행 증거 묶음
- explanation: Evidence Packet은 command, current directory, shell, error message, file path, expected result, actual result, 최근 변경 사항을 묶은 디버깅 입력입니다. "안 돼요"를 원인 분석 가능한 기술적 질문으로 바꿉니다.
- related: ["Command Output", "Debugging", "AI Learning Verification"]
