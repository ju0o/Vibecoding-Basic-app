'use strict';

// Pre-built advanced (심화 통합) course data. Authored directly (not via detail()/enrich)
// because it uses the 9-slot slides[] architecture and s-0N scene ids. Injected into
// curricula AFTER enrichCurricula() so it is not overwritten.
// scriptSlides are per-slide teaching scripts derived from slides[]/error/sources.
module.exports = {
  "title": "AI 심화 통합과정 · V3 파일럿",
  "shortTitle": "심화 통합 S",
  "code": "S50",
  "family": "심화 통합",
  "level": "ARCHITECT+",
  "color": "#2dd4bf",
  "visualMode": "advanced",
  "description": "Claude Code와 Codex 사용법을 다시 가르치지 않고, 두 도구를 비교·결합·계측하는 상위 설계 과정입니다.",
  "route": "도구 선택 → 컨텍스트 → Skill → MCP → Agent → 오케스트레이션 → 신뢰성 → 캡스톤",
  "outcomes": [
    "작업별 도구·표면 선택",
    "크로스툴 워크플로 설계",
    "실패·복구 기준 수립",
    "도구 조합 운영 판단"
  ],
  "sessions": [
    {
      "title": "도구 선택·CLI/표면 전략",
      "subtitle": "Claude Code · Codex · IDE/App 표면을 작업 기준으로 고르는 법",
      "module": "S1 · SURFACE STRATEGY",
      "objective": "같은 작업을 Claude Code, Codex, IDE/App 표면에서 비교해 언제 어떤 도구와 표면을 선택할지 판단 기준을 만듭니다.",
      "duration": "120분",
      "flow": [
        "진단 10분",
        "공식 개념·시각화 35분",
        "표면 비교 시연 20분",
        "결정표 실습 40분",
        "복구·리뷰 15분"
      ],
      "concepts": [
        [
          "작업 성격",
          "탐색, 대량 수정, 시각 QA, 릴리즈처럼 일의 성격을 먼저 분류합니다."
        ],
        [
          "표면 선택",
          "CLI, IDE, App, Cloud 중 어느 화면에서 실행할지 정합니다."
        ],
        [
          "권한과 증거",
          "승인, sandbox, diff, 로그, 캡처가 남는 방식을 비교합니다."
        ],
        [
          "조합 전략",
          "한 도구로 끝낼지, Claude와 Codex를 나누어 쓸지 결정합니다."
        ]
      ],
      "sequence": [
        "작업을 한 문장으로 정의",
        "위험도와 확인 증거 선택",
        "Claude Code 표면의 장점 확인",
        "Codex 표면의 장점 확인",
        "IDE/App에서 시각 결과 검증",
        "작업→도구·표면 결정표 작성"
      ],
      "demo": {
        "type": "surface-compare",
        "sceneId": "s-01-surface",
        "manual": true,
        "title": "같은 작업을 세 표면에서 비교합니다",
        "stages": [
          "작업 정의",
          "Claude CLI",
          "Codex CLI",
          "IDE/App",
          "선택 기준"
        ]
      },
      "compare": {
        "bad": [
          "최신 도구를 무조건 선택",
          "화면 확인이 필요한 일을 터미널 로그만 보고 종료",
          "대량 수정 작업을 캡처 중심으로만 진행"
        ],
        "good": [
          "작업 성격과 위험도를 먼저 분류",
          "증거가 잘 남는 표면을 선택",
          "구현·검증·릴리즈를 표면별로 나누어 사용"
        ]
      },
      "decisions": [
        [
          "시각 QA가 핵심인 작업을 CLI 로그만 보고 완료한다",
          "위험",
          "브라우저나 App 표면에서 실제 보이는 결과를 캡처로 남겨야 합니다."
        ],
        [
          "대량 파일 수정은 diff와 테스트가 강한 표면에서 진행한다",
          "좋음",
          "수정 범위가 넓을수록 변경 증거와 rollback 기준이 중요합니다."
        ],
        [
          "릴리즈 작업은 버전, 태그, 체크섬, GitHub 기록을 함께 본다",
          "필수",
          "출시 작업은 결과 화면보다 재현 가능한 기록이 더 중요합니다."
        ]
      ],
      "error": {
        "symptom": "작업에 맞지 않는 표면을 골라 검증 증거가 부족함",
        "trace": "surface mismatch: visual QA requested, terminal-only evidence attached",
        "cause": "작업 성격을 분류하지 않고 익숙한 도구에서 바로 시작함",
        "fix": "작업→도구·표면 결정표를 작성하고 필요한 증거가 남는 표면으로 재실행"
      },
      "practice": "자신의 실제 작업 1건을 골라 Claude Code, Codex, IDE/App 중 어떤 표면에서 진행할지 결정표로 작성하고 근거를 남깁니다.",
      "deliverables": [
        "작업→도구·표면 결정표",
        "선택 근거 메모",
        "실행 1건의 캡처 또는 로그",
        "실패 시 재선택 기준"
      ],
      "sources": [
        "claude-overview",
        "codex-overview",
        "claude-quickstart",
        "node-download"
      ],
      "sourceKeys": [
        "claude-overview",
        "codex-overview",
        "claude-quickstart",
        "node-download"
      ],
      "pathway": null,
      "professional": {
        "level": "AI 심화 통합과정 S1 강사용 연구노트",
        "focus": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
        "officialStudy": [
          "Anthropic · Claude Code 개요에서 Claude Code가 터미널 중심 개발 작업을 어떻게 다루는지 확인하고, 작업 폴더·권한·diff 증거를 수업 언어로 바꿉니다.",
          "OpenAI · Codex 개요에서 Codex의 App, CLI, IDE, cloud task 표면을 확인하고, 어떤 표면이 시각 QA와 릴리즈 검증에 유리한지 정리합니다.",
          "Anthropic · Claude Code 빠른 시작에서 첫 세션과 저장소 탐색 흐름을 확인해 C1과 S1의 경계를 구분합니다.",
          "Node.js 다운로드 문서는 개발환경 전제 조건으로만 확인하고, S1 본문에서는 설치법이 아니라 표면 선택 판단에 연결합니다."
        ],
        "visualSimulation": "표면 비교 매트릭스 장면을 사용합니다. 발표자는 작업 정의 → Claude CLI → Codex CLI → IDE/App → 선택 기준을 수동으로 넘기며, 각 단계마다 남는 증거와 부족한 증거를 비교합니다.",
        "demoRun": [
          "같은 작업 문장을 먼저 보여주고 작업 성격을 분류합니다.",
          "Claude CLI 패널에서 저장소 탐색과 diff 중심 증거를 강조합니다.",
          "Codex CLI 패널에서 sandbox, 승인, 검증 로그를 강조합니다.",
          "IDE/App 패널에서 실제 화면과 시각 QA 캡처를 강조합니다.",
          "마지막에 결정표로 어떤 표면을 선택할지 수강생에게 직접 판단시킵니다."
        ],
        "failureDrill": [
          "시각 QA가 필요한 작업에 터미널 로그만 첨부한 실패를 보여줍니다.",
          "증거 부족을 표면 선택 문제로 재분류합니다.",
          "브라우저 또는 App 표면에서 캡처와 클릭 가능성 검증을 추가해 복구합니다."
        ],
        "exercise": "자신의 프로젝트 작업 1건을 선택하고, 작업 성격·위험도·필요 증거·추천 표면을 한 표로 작성합니다.",
        "misconceptions": [
          [
            "최신 도구가 항상 우월하다",
            "작업 적합도가 기준입니다."
          ],
          [
            "CLI만 잘 쓰면 모든 검증이 끝난다",
            "화면 품질은 실제 브라우저와 캡처 증거가 필요합니다."
          ]
        ],
        "expertQuestions": [
          [
            "Claude Code와 Codex 중 무엇을 먼저 배워야 하나요?",
            "도구 순서보다 작업 성격을 먼저 봅니다. 탐색과 세션 운영은 Claude가 편할 수 있고, 시각 QA·릴리즈 검증은 Codex 표면이 더 직접적일 수 있습니다."
          ],
          [
            "둘 다 쓰면 복잡해지지 않나요?",
            "역할을 나누지 않으면 복잡해집니다. 구현, 검증, 릴리즈의 책임을 나누면 오히려 증거가 명확해집니다."
          ]
        ],
        "studyPath": [
          "Claude Code 개요와 빠른 시작에서 CLI 세션의 책임과 저장소 탐색 흐름을 확인",
          "Codex 개요에서 App, CLI, IDE, cloud task의 차이 확인",
          "각 표면에서 남길 수 있는 증거(diff, 로그, 스크린샷, PR)를 목록화",
          "C1/O1과 S1의 경계를 말로 설명할 수 있게 정리",
          "수업 전 모델명, 요금, 베타 UI, 명령 이름이 바뀌었는지 재확인"
        ],
        "slideUpgrade": [
          "표지는 AI 이미지 대신 실제 콘솔과 IDE 표면을 조합한 다큐멘터리 톤으로 유지",
          "핵심 개념은 카드보다 실제 도구 캡처 후보와 선택축을 나란히 배치",
          "대표 장면은 수동 5버튼으로 한 단계씩 비교",
          "오해 슬라이드는 최신 도구 경쟁이 아니라 작업 적합도 문제로 정리",
          "실습 슬라이드는 결정표를 빈 양식으로 보여주고 즉시 작성하게 설계"
        ],
        "motionStoryboard": [
          "Idle: 모든 패널은 낮은 opacity로 대기하고 자동 진행하지 않습니다.",
          "Focus: 현재 표면만 밝아지고 나머지 표면은 배경으로 물러납니다.",
          "Evidence: 단계마다 diff, approval, screenshot, release log 중 하나가 증거 배지로 켜집니다.",
          "Mismatch: 잘못된 표면 선택에서는 amber 경고선과 증거 부족 모달을 표시합니다.",
          "Resolve: 마지막 단계에서 결정표가 완성되며 teal 체크라인이 연결됩니다."
        ],
        "realWorldAssets": [
          "Claude CLI 세션 캡처",
          "Codex CLI 또는 App 승인 화면 캡처",
          "IDE diff와 브라우저 미리보기 캡처",
          "작업→도구·표면 결정표 샘플",
          "검증 증거가 부족한 실패 사례 캡처"
        ],
        "rehearsalChecklist": [
          "5버튼 수동 진행으로 각 표면을 한 단계씩 멈춰 설명",
          "C1/O1 사용법 재교육으로 흐르지 않는지 확인",
          "각 표면에서 남는 증거를 한 문장으로 말하기",
          "1280x720에서 모든 캡션과 코드가 잘리지 않는지 확인",
          "수업 전 공식 문서와 도구 UI 변경 여부 재확인"
        ]
      },
      "revision": "3.0.0-beta.3",
      "status": "review",
      "visualScene": {
        "id": "s-01-surface",
        "type": "surface-compare",
        "alias": "workflow-01-terminal",
        "title": "표면 비교 매트릭스",
        "layout": "surface-compare-matrix",
        "normalFlow": [
          "작업 정의",
          "Claude CLI 증거",
          "Codex CLI 증거",
          "IDE/App 시각 QA",
          "결정표 작성"
        ],
        "failureFlow": [
          "surface mismatch",
          "증거 부족",
          "검증 표면 재선택"
        ],
        "recoveryFlow": [
          "작업 성격 재분류",
          "필요 증거 지정",
          "맞는 표면에서 재실행"
        ],
        "steps": [
          {
            "label": "TASK",
            "title": "작업 성격을 먼저 정의",
            "detail": "버그 수정, 대량 수정, 시각 QA, 릴리즈 중 무엇인지 먼저 분류합니다."
          },
          {
            "label": "CLAUDE",
            "title": "저장소 탐색과 diff 증거",
            "detail": "Claude CLI 표면은 터미널 세션, 파일 탐색, 변경 설명을 강하게 보여줍니다."
          },
          {
            "label": "CODEX",
            "title": "sandbox와 검증 루프",
            "detail": "Codex 표면은 승인, 실행, 검증, 브라우저 QA까지 증거를 묶어 보기 좋습니다."
          },
          {
            "label": "IDE",
            "title": "화면과 코드의 동시 확인",
            "detail": "IDE/App 표면에서는 실제 화면, diff, 캡처 증거를 함께 보며 판단합니다."
          },
          {
            "label": "DECIDE",
            "title": "작업→도구·표면 결정표 완성",
            "detail": "선택 이유, 필요한 증거, 실패 시 재선택 기준을 한 줄로 남깁니다."
          }
        ]
      },
      "interactions": {
        "controls": [
          "start",
          "previous",
          "next",
          "pause",
          "reset"
        ],
        "predictionPrompt": "다음 표면에서 어떤 증거가 더 잘 남을지 먼저 말한 뒤 진행",
        "decisionCards": 3,
        "manualOnly": true
      },
      "assets": {
        "fallbackImage": "assets/v3/fallbacks/advanced-01.png",
        "sceneId": "s-01-surface",
        "keyvisuals": [
          "assets/v3/keyvisuals/s/01/cover.png",
          "assets/v3/keyvisuals/s/01/metaphor.png",
          "assets/v3/keyvisuals/s/01/next.png"
        ],
        "captures": [
          "assets/v3/captures/s/01/claude-cli.png",
          "assets/v3/captures/s/01/codex-cli.png",
          "assets/v3/captures/s/01/ide.png"
        ]
      },
      "demoProject": {
        "root": "v3/projects/advanced/01",
        "starter": "v3/projects/advanced/01/starter",
        "broken": "v3/projects/advanced/01/broken",
        "complete": "v3/projects/advanced/01/complete",
        "manifest": "v3/projects/advanced/01/lab.json"
      },
      "fallbackMedia": {
        "image": "assets/v3/fallbacks/advanced-01.png",
        "slide": "v3/deck.html?course=advanced&lesson=1&slide=4&motion=low"
      },
      "studentMaterials": [
        "workbook",
        "commands",
        "examples",
        "errors",
        "assessment",
        "practice"
      ],
      "instructorMaterials": [
        "script",
        "source-study",
        "demo-runbook",
        "deep-dive",
        "qa-bank",
        "fallback",
        "rehearsal"
      ],
      "slides": [
        {
          "slot": "cover",
          "kind": "img",
          "tag": "IMG",
          "title": "같은 작업, 다른 작업대",
          "screenText": "도구가 아니라 작업이 표면을 정합니다.",
          "presenterNote": "표지에서는 설명을 길게 하지 않고, 오늘은 선택 기준을 만드는 시간이라고만 안내합니다.",
          "asset": "assets/v3/keyvisuals/s/01/cover.png"
        },
        {
          "slot": "metaphor",
          "kind": "img",
          "tag": "IMG",
          "title": "공구함에서 공구를 고르듯",
          "screenText": "망치가 좋아도 나사를 조일 수는 없습니다.",
          "presenterNote": "Claude와 Codex의 우열이 아니라 작업 적합도를 이야기합니다.",
          "asset": "assets/v3/keyvisuals/s/01/metaphor.png"
        },
        {
          "slot": "concept",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "네 가지 선택축",
          "screenText": "탐색 · 대량수정 · 시각QA · 릴리즈",
          "presenterNote": "각 표면이 어떤 증거를 남기기 쉬운지 비교합니다.",
          "captures": [
            "assets/v3/captures/s/01/claude-cli.png",
            "assets/v3/captures/s/01/codex-cli.png",
            "assets/v3/captures/s/01/ide.png"
          ]
        },
        {
          "slot": "representative",
          "kind": "scene",
          "tag": "SCENE",
          "title": "표면 비교 매트릭스",
          "screenText": "같은 작업을 세 표면에서 한 단계씩 비교합니다.",
          "presenterNote": "자동 진행 없이 시작과 다음 버튼으로 증거를 하나씩 켭니다.",
          "sceneId": "s-01-surface"
        },
        {
          "slot": "pitfall",
          "kind": "text",
          "tag": "TEXT",
          "title": "오해: 최신 도구가 항상 정답",
          "screenText": "최신성보다 작업 성격과 검증 증거가 우선입니다.",
          "presenterNote": "수강생이 도구 구독 여부로 판단하지 않도록 기준을 작업 중심으로 되돌립니다."
        },
        {
          "slot": "qa",
          "kind": "text",
          "tag": "TEXT",
          "title": "현장 질문",
          "screenText": "둘 중 무엇을 먼저 쓰나요? → 이번 작업의 증거가 어디에 남아야 하나요?",
          "presenterNote": "질문을 도구 이름에서 필요한 증거로 바꿔 대답합니다."
        },
        {
          "slot": "lab",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "결정표 작성 실습",
          "screenText": "작업 · 위험도 · 필요한 증거 · 추천 표면",
          "presenterNote": "수강생 각자 실제 작업 한 건을 표로 작성하게 합니다.",
          "captures": [
            "assets/v3/captures/s/01/decision-matrix.png"
          ]
        },
        {
          "slot": "summary",
          "kind": "text",
          "tag": "TEXT",
          "title": "오늘의 한 문장",
          "screenText": "도구가 아니라 작업과 증거가 표면을 정합니다.",
          "presenterNote": "C/O 과정과 겹치지 않게 선택 기준만 다시 요약합니다."
        },
        {
          "slot": "next",
          "kind": "img",
          "tag": "IMG",
          "title": "다음: 컨텍스트 설계",
          "screenText": "무엇을 넣을지가 다음 작업의 품질을 정합니다.",
          "presenterNote": "S2는 CLAUDE.md와 AGENTS.md 작성법이 아니라 크로스툴 메모리 정책으로 이어집니다.",
          "asset": "assets/v3/keyvisuals/s/01/next.png"
        }
      ],
      "scriptSlides": [
        {
          "slide": 1,
          "title": "표지",
          "say": "도구가 아니라 작업이 표면을 정합니다.",
          "do": "표지 히어로만 띄우고 길게 설명하지 않습니다. 오늘의 한 문장만 예고합니다.",
          "ask": "오늘 주제와 관련해 최근 겪은 상황이 있나요?",
          "expected": "본인 경험 1~2개",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "응답이 없으면 구체적인 예시 하나를 제시하고 다시 질문합니다."
        },
        {
          "slide": 2,
          "title": "은유",
          "say": "망치가 좋아도 나사를 조일 수는 없습니다.",
          "do": "은유 키비주얼로 직관화하고 도구 우열 논쟁으로 흐르지 않게 합니다.",
          "ask": "이 비유에서 무엇을 기준으로 판단해야 할까요?",
          "expected": "작업 성격·필요 증거 같은 기준",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "비유의 한 지점만 짚고 다음으로 넘어갑니다."
        },
        {
          "slide": 3,
          "title": "핵심 개념",
          "say": "탐색 · 대량수정 · 시각QA · 릴리즈",
          "do": "개념/캡처 패널을 한 요소씩 공개하고 시선을 한 지점에 고정합니다.",
          "ask": "이 개념이 Claude와 Codex에서 같게 적용되려면 무엇이 필요할까요?",
          "expected": "공유 기준·동기화",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "요소 하나를 실제 화면에 연결해 다시 설명합니다."
        },
        {
          "slide": 4,
          "title": "대표 시연",
          "say": "같은 작업을 세 표면에서 한 단계씩 비교합니다.",
          "do": "수동 5버튼으로 한 단계씩 진행하고, 각 단계 전에 결과를 먼저 예측하게 합니다. 자동으로 넘기지 않습니다.",
          "ask": "다음 단계에서 무엇이 달라지고 어떤 증거가 남을까요?",
          "expected": "예측 한 문장",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "애매하면 직전 단계로 돌아가 증거를 다시 짚습니다."
        },
        {
          "slide": 5,
          "title": "자주 오해",
          "say": "최신성보다 작업 성격과 검증 증거가 우선입니다.",
          "do": "오해 → 교정 순으로 보여주고 판단 보드(결정 카드)를 노출합니다.",
          "ask": "이 오해대로 하면 무엇이 부족해질까요?",
          "expected": "부족한 증거·위험",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "실패 사례 한 장을 제시해 차이를 보여줍니다."
        },
        {
          "slide": 6,
          "title": "예상 질문",
          "say": "둘 중 무엇을 먼저 쓰나요? → 이번 작업의 증거가 어디에 남아야 하나요?",
          "do": "수강생 실제 사례 1건을 받아 즉석에서 기준으로 분류합니다.",
          "ask": "지금 진행 중인 작업 한 건을 말해줄 수 있나요?",
          "expected": "실제 사례 1건",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "사례가 없으면 예시 작업으로 대신 분류합니다."
        },
        {
          "slide": 7,
          "title": "실습 브리프",
          "say": "작업 · 위험도 · 필요한 증거 · 추천 표면",
          "do": "빈 양식과 예시 1행을 보여주고 즉시 작성하게 합니다.",
          "ask": "당신 작업의 완료 증거는 무엇인가요?",
          "expected": "완료 증거 1문장",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "예시 양식을 함께 한 줄 채워 시작점을 만듭니다."
        },
        {
          "slide": 8,
          "title": "실패 재현",
          "say": "작업에 맞지 않는 표면을 골라 검증 증거가 부족함",
          "do": "broken 상태를 실행해 로그(surface mismatch: visual QA requested, terminal-only evidence attached)를 보여주고 증상을 고정합니다.",
          "ask": "이 증상의 원인은 어디일까요?",
          "expected": "원인 가설 1개",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "로그의 첫 오류 줄을 함께 읽고 가설을 좁힙니다."
        },
        {
          "slide": 9,
          "title": "복구 기준",
          "say": "작업→도구·표면 결정표를 작성하고 필요한 증거가 남는 표면으로 재실행",
          "do": "complete 상태로 복구 과정을 보여주고 재현 가능한 기준을 남깁니다.",
          "ask": "무엇을 바꿔야 다시 정상이 될까요?",
          "expected": "복구 한 단계",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "직전 정상 상태와 현재 diff를 비교해 범위를 좁힙니다."
        },
        {
          "slide": 10,
          "title": "공식자료 확인",
          "say": "수업 전 claude-overview, codex-overview, claude-quickstart, node-download 를 재확인합니다.",
          "do": "🔄 공식 문서의 메뉴명·요금·베타·UI 변경을 확인합니다.",
          "ask": "최근 바뀐 용어나 화면이 있었나요?",
          "expected": "변경 여부 확인",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "확실치 않으면 공식 문서 링크를 함께 엽니다."
        },
        {
          "slide": 11,
          "title": "실습 타이머",
          "say": "자신의 실제 작업 1건을 골라 Claude Code, Codex, IDE/App 중 어떤 표면에서 진행할지 결정표로 작성하고 근거를 남깁니다.",
          "do": "40분 동안 작은 범위를 끝까지 진행하고 중간에 결과를 저장하게 합니다.",
          "ask": "막힌 사람은 현재 상태와 다음 한 단계를 말해줄 수 있나요?",
          "expected": "현재 상태 + 다음 한 단계",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "결과 추가 대신 완료 기준을 다시 설명하게 합니다."
        },
        {
          "slide": 12,
          "title": "리뷰",
          "say": "산출물: 작업→도구·표면 결정표 · 선택 근거 메모 · 실행 1건의 캡처 또는 로그 · 실패 시 재선택 기준",
          "do": "산출물을 직접 실행·확인하고 검증 기록을 남깁니다.",
          "ask": "사람이 판단한 부분과 AI 결과를 검증한 근거는 무엇인가요?",
          "expected": "판단·검증 근거",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "하나의 산출물을 함께 실행해 확인합니다."
        },
        {
          "slide": 13,
          "title": "다음 회차",
          "say": "무엇을 넣을지가 다음 작업의 품질을 정합니다.",
          "do": "다음 회차로 이어지는 한 문장을 예고하고 산출물을 보존하게 합니다.",
          "ask": "다음 수업 전 준비할 한 가지는 무엇인가요?",
          "expected": "준비 행동 1개",
          "deepDive": "S1은 Claude Code와 Codex의 사용법을 반복하지 않습니다. 강사는 같은 작업이라도 탐색, 수정, 시각 검증, 릴리즈에 따라 가장 좋은 표면이 달라진다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-overview, codex-overview, claude-quickstart, node-download 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "구체적인 준비 예시 하나를 제시합니다."
        }
      ]
    },
    {
      "title": "Workflow·컨텍스트·메모리 설계",
      "subtitle": "CLAUDE.md·AGENTS.md 작성법이 아니라, 두 도구가 공유할 컨텍스트·메모리 정책",
      "module": "S2 · CONTEXT & MEMORY",
      "objective": "같은 작업을 Claude와 Codex로 수행할 때 무엇을 컨텍스트에 넣고, 메모리에 무엇을 어떤 범위·유효기간으로 남길지 크로스툴 정책으로 설계합니다.",
      "duration": "120분",
      "flow": [
        "진단 10분",
        "공식 개념·시각화 35분",
        "컨텍스트·메모리 설계 시연 20분",
        "정책 실습 40분",
        "복구·리뷰 15분"
      ],
      "concepts": [
        [
          "컨텍스트 선별",
          "작업에 직접 필요한 정보만 추론 시점에 넣습니다. 많이가 아니라 적시에 넣습니다."
        ],
        [
          "context rot",
          "토큰이 늘수록 정확한 회수가 떨어집니다. 과다 투입은 오히려 품질을 낮춥니다."
        ],
        [
          "메모리 3요소",
          "메모리 항목마다 범위·유효기간·근거를 적어 옛 규칙이 새 작업에 새지 않게 합니다."
        ],
        [
          "크로스툴 동기화",
          "CLAUDE.md와 AGENTS.md가 같은 정책을 가리키게 맞춰 도구 간 메모리 드리프트를 막습니다."
        ]
      ],
      "sequence": [
        "작업에 필요한 컨텍스트 후보 나열",
        "과다 투입으로 정확 회수 저하 확인",
        "메모리에 범위·유효기간·근거 부여",
        "Claude·Codex 메모리 정책 동기화",
        "결정적/에이전틱 경계와 승격 규칙 확정"
      ],
      "demo": {
        "type": "context-memory",
        "sceneId": "s-02-context",
        "manual": true,
        "title": "같은 작업의 컨텍스트·메모리를 두 도구 정책으로 설계합니다",
        "stages": [
          "컨텍스트 선별",
          "context rot",
          "메모리 3요소",
          "크로스툴 동기화",
          "정책 확정"
        ]
      },
      "compare": {
        "bad": [
          "프로젝트 모든 문서를 한 번에 컨텍스트로 투입",
          "메모리에 범위·유효기간 없이 규칙을 영구 저장",
          "Claude와 Codex 메모리를 따로 관리해 규칙이 어긋남"
        ],
        "good": [
          "작업에 필요한 정보만 적시에 투입",
          "메모리에 범위·유효기간·근거를 명시",
          "두 도구가 같은 정책 문서를 가리키도록 동기화"
        ]
      },
      "decisions": [
        [
          "컨텍스트를 많이 넣을수록 답이 정확해진다",
          "아님",
          "토큰이 늘면 context rot로 정확한 회수가 떨어집니다."
        ],
        [
          "메모리 항목에 범위와 유효기간을 함께 적는다",
          "좋음",
          "옛 프로젝트 규칙이 현재 작업에 새는 것을 막습니다."
        ],
        [
          "Claude와 Codex 메모리를 같은 정책 기준으로 맞춘다",
          "필수",
          "도구 간 메모리 드리프트가 모순된 결과를 만듭니다."
        ]
      ],
      "error": {
        "symptom": "옛 프로젝트 규칙이 현재 작업에 적용되고 도구마다 결과가 다름",
        "trace": "stale context selected: memory item lacks scope/expiry; claude/codex memory drift",
        "cause": "메모리에 범위·유효기간·근거가 없고 두 도구 정책이 어긋남",
        "fix": "메모리에 범위·유효기간·근거를 부여하고 Claude·Codex 정책을 한 기준으로 동기화"
      },
      "practice": "실제 작업 1건을 골라 컨텍스트 예산표(넣을 것·뺄 것)와 메모리 정책표(범위·유효기간·근거)를 작성하고, Claude와 Codex가 같은 정책을 가리키도록 맞춥니다.",
      "deliverables": [
        "컨텍스트 예산표",
        "메모리 정책표(범위·유효기간·근거)",
        "크로스툴 동기화 체크",
        "stale 발생 시 복구 기준"
      ],
      "sources": [
        "anthropic-eng-context",
        "claude-memory",
        "codex-agents-md",
        "anthropic-eng-agents"
      ],
      "sourceKeys": [
        "anthropic-eng-context",
        "claude-memory",
        "codex-agents-md",
        "anthropic-eng-agents"
      ],
      "pathway": null,
      "professional": {
        "level": "AI 심화 통합과정 S2 강사용 연구노트",
        "focus": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
        "officialStudy": [
          "Anthropic · Effective context engineering에서 추론 시점에 필요한 최소 정보만 큐레이션하는 원칙과 context rot(토큰 증가 시 정확 회수 저하)를 확인하고 수업 언어로 바꿉니다.",
          "Anthropic · Claude Code memory(CLAUDE.md)에서 메모리가 어떤 범위로 적용되고 어떻게 승격되는지 확인합니다.",
          "OpenAI · Codex AGENTS.md에서 Codex가 규칙과 컨텍스트를 어떻게 고정하는지 확인하고 CLAUDE.md와의 대응을 정리합니다.",
          "Anthropic · Building effective agents에서 결정적 워크플로와 에이전틱 판단의 경계를 확인해 메모리 승격 규칙과 연결합니다."
        ],
        "visualSimulation": "컨텍스트·메모리 설계판 장면을 사용합니다. 발표자는 컨텍스트 선별 → context rot → 메모리 3요소 → 크로스툴 동기화 → 정책 확정을 수동으로 넘기며, 각 단계에서 추가되는 정책과 차단되는 위험을 비교합니다.",
        "demoRun": [
          "작업에 필요한 컨텍스트 후보를 나열하고 무엇을 뺄지 먼저 정합니다.",
          "모든 문서를 투입했을 때 정확 회수가 떨어지는 context rot를 보여줍니다.",
          "메모리 항목에 범위·유효기간·근거를 붙여 stale을 차단합니다.",
          "CLAUDE.md와 AGENTS.md가 같은 정책을 가리키도록 동기화합니다.",
          "마지막에 결정적/에이전틱 경계와 메모리 승격 규칙을 수강생이 직접 정하게 합니다."
        ],
        "failureDrill": [
          "범위·유효기간 없는 메모리가 옛 프로젝트 규칙을 현재 작업에 적용하는 실패를 보여줍니다.",
          "Claude와 Codex가 서로 다른 메모리를 참조해 결과가 갈리는 드리프트를 재현합니다.",
          "메모리에 범위·유효기간·근거를 부여하고 두 도구 정책을 동기화해 복구합니다."
        ],
        "exercise": "자신의 작업 1건에 대해 컨텍스트 예산표와 메모리 정책표(범위·유효기간·근거)를 작성하고, 두 도구가 같은 정책을 가리키는지 점검합니다.",
        "misconceptions": [
          [
            "컨텍스트는 많을수록 좋다",
            "context rot 때문에 적게·적시에가 기준입니다."
          ],
          [
            "메모리에 다 적어두면 안전하다",
            "범위·유효기간 없는 메모리는 옛 규칙을 새 작업에 흘립니다."
          ]
        ],
        "expertQuestions": [
          [
            "CLAUDE.md와 AGENTS.md를 둘 다 써야 하나요?",
            "두 도구를 함께 쓰면 둘 다 필요합니다. 핵심은 문법이 아니라 두 파일이 같은 정책을 가리키도록 동기화하는 것입니다."
          ],
          [
            "메모리를 언제 승격하나요?",
            "여러 작업에서 반복 확인된 규칙만, 범위와 유효기간을 붙여 승격합니다. 일회성 맥락은 메모리에 남기지 않습니다."
          ]
        ],
        "studyPath": [
          "Effective context engineering에서 JIT 큐레이션과 context rot 개념 확인",
          "CLAUDE.md memory와 AGENTS.md의 적용 범위 비교",
          "메모리 항목의 범위·유효기간·근거 형식을 한 표로 정리",
          "C2/O2(작성법)와 S2(크로스툴 정책)의 경계를 말로 설명할 수 있게 정리",
          "수업 전 메모리·컨텍스트 관련 공식 용어와 UI 변경 여부 재확인"
        ],
        "slideUpgrade": [
          "표지는 추상 이미지보다 컨텍스트 창과 메모리 블록을 조합한 다큐멘터리 톤으로 유지",
          "핵심 개념은 카드보다 토큰 게이지와 메모리 3요소 배지를 나란히 배치",
          "대표 장면은 수동 5버튼으로 컨텍스트·메모리 정책을 한 단계씩 조립",
          "오해 슬라이드는 컨텍스트 양 경쟁이 아니라 정확 회수 문제로 정리",
          "실습 슬라이드는 예산표와 정책표를 빈 양식으로 보여주고 즉시 작성하게 설계"
        ],
        "motionStoryboard": [
          "Idle: 컨텍스트 창과 메모리 블록은 낮은 opacity로 대기하고 자동 진행하지 않습니다.",
          "Focus: 현재 단계의 블록만 밝아지고 나머지는 배경으로 물러납니다.",
          "Rot: 과다 투입 단계에서 토큰 게이지가 90%를 넘고 amber 경고선이 켜집니다.",
          "Scope: 메모리 단계에서 범위·유효기간·근거 배지가 순서대로 채워집니다.",
          "Sync: 마지막 단계에서 CLAUDE.md와 AGENTS.md를 잇는 teal 동기화 라인이 연결됩니다."
        ],
        "realWorldAssets": [
          "컨텍스트 예산표 샘플",
          "메모리 정책표(범위·유효기간·근거) 샘플",
          "CLAUDE.md와 AGENTS.md 동기화 예시",
          "stale context 발생 로그 캡처",
          "context rot로 정확도가 떨어진 비교 캡처"
        ],
        "rehearsalChecklist": [
          "5버튼 수동 진행으로 각 단계를 멈춰 설명",
          "C2/O2 작성법 재교육으로 흐르지 않는지 확인",
          "각 단계에서 추가되는 정책을 한 문장으로 말하기",
          "1280x720에서 게이지·배지·캡션이 잘리지 않는지 확인",
          "수업 전 공식 문서와 도구 UI 변경 여부 재확인"
        ]
      },
      "revision": "3.0.0-beta.3",
      "status": "review",
      "visualScene": {
        "id": "s-02-context",
        "type": "context-memory",
        "alias": "workflow-02-workflow",
        "title": "컨텍스트·메모리 설계판",
        "layout": "context-memory-board",
        "normalFlow": [
          "컨텍스트 선별",
          "context rot 확인",
          "메모리 3요소 부여",
          "크로스툴 동기화",
          "정책 확정"
        ],
        "failureFlow": [
          "stale context",
          "메모리 드리프트",
          "정책 재정의"
        ],
        "recoveryFlow": [
          "범위·유효기간·근거 부여",
          "두 도구 정책 동기화",
          "작업에 다시 적용"
        ],
        "steps": [
          {
            "label": "INTAKE",
            "title": "필요한 컨텍스트만 선별",
            "detail": "작업에 직접 필요한 정보만 추론 시점에 넣고 나머지는 의도적으로 뺍니다."
          },
          {
            "label": "ROT",
            "title": "과다 투입은 정확 회수를 낮춤",
            "detail": "토큰이 늘수록 context rot로 핵심 정보의 회수 정확도가 떨어집니다."
          },
          {
            "label": "MEMORY",
            "title": "범위·유효기간·근거 부여",
            "detail": "메모리 항목마다 어디까지·언제까지·왜를 적어 옛 규칙이 새지 않게 합니다."
          },
          {
            "label": "SYNC",
            "title": "Claude·Codex 정책 동기화",
            "detail": "CLAUDE.md와 AGENTS.md가 같은 정책을 가리키게 맞춰 드리프트를 막습니다."
          },
          {
            "label": "POLICY",
            "title": "결정적/에이전틱 경계 확정",
            "detail": "반복은 결정적으로, 막히는 곳만 에이전틱으로 두고 메모리 승격 규칙을 남깁니다."
          }
        ]
      },
      "interactions": {
        "controls": [
          "start",
          "previous",
          "next",
          "pause",
          "reset"
        ],
        "predictionPrompt": "다음 단계에서 어떤 정책이 추가되고 어떤 위험이 차단될지 먼저 말한 뒤 진행",
        "decisionCards": 3,
        "manualOnly": true
      },
      "assets": {
        "fallbackImage": "assets/v3/fallbacks/advanced-02.png",
        "sceneId": "s-02-context",
        "keyvisuals": [
          "assets/v3/keyvisuals/s/02/cover.png",
          "assets/v3/keyvisuals/s/02/metaphor.png",
          "assets/v3/keyvisuals/s/02/next.png"
        ],
        "captures": [
          "assets/v3/captures/s/02/context-budget.png",
          "assets/v3/captures/s/02/memory-policy.png",
          "assets/v3/captures/s/02/cross-tool-sync.png"
        ]
      },
      "demoProject": {
        "root": "v3/projects/advanced/02",
        "starter": "v3/projects/advanced/02/starter",
        "broken": "v3/projects/advanced/02/broken",
        "complete": "v3/projects/advanced/02/complete",
        "manifest": "v3/projects/advanced/02/lab.json"
      },
      "fallbackMedia": {
        "image": "assets/v3/fallbacks/advanced-02.png",
        "slide": "v3/deck.html?course=advanced&lesson=2&slide=4&motion=low"
      },
      "studentMaterials": [
        "workbook",
        "commands",
        "examples",
        "errors",
        "assessment",
        "practice"
      ],
      "instructorMaterials": [
        "script",
        "source-study",
        "demo-runbook",
        "deep-dive",
        "qa-bank",
        "fallback",
        "rehearsal"
      ],
      "slides": [
        {
          "slot": "cover",
          "kind": "img",
          "tag": "IMG",
          "title": "무엇을 넣느냐가 품질을 정한다",
          "screenText": "도구가 아니라 컨텍스트와 메모리가 결과를 정합니다.",
          "presenterNote": "표지에서는 길게 설명하지 않고, 오늘은 두 도구가 공유할 컨텍스트·메모리 정책을 만드는 시간이라고만 안내합니다.",
          "asset": "assets/v3/keyvisuals/s/02/cover.png"
        },
        {
          "slot": "metaphor",
          "kind": "img",
          "tag": "IMG",
          "title": "책상에 필요한 서류만 올리듯",
          "screenText": "서류를 다 쌓으면 정작 중요한 한 장을 못 찾습니다.",
          "presenterNote": "컨텍스트는 많이가 아니라 적시에라는 점을 책상 비유로 직관화합니다.",
          "asset": "assets/v3/keyvisuals/s/02/metaphor.png"
        },
        {
          "slot": "concept",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "컨텍스트·메모리 3원칙",
          "screenText": "적시 투입 · context rot · 범위/유효기간/근거",
          "presenterNote": "각 원칙이 Claude와 Codex 양쪽에서 똑같이 적용된다는 점을 강조합니다.",
          "captures": [
            "assets/v3/captures/s/02/context-budget.png",
            "assets/v3/captures/s/02/memory-policy.png",
            "assets/v3/captures/s/02/cross-tool-sync.png"
          ]
        },
        {
          "slot": "representative",
          "kind": "scene",
          "tag": "SCENE",
          "title": "컨텍스트·메모리 설계판",
          "screenText": "같은 작업의 컨텍스트·메모리를 한 단계씩 설계합니다.",
          "presenterNote": "자동 진행 없이 시작과 다음 버튼으로 정책을 하나씩 추가합니다.",
          "sceneId": "s-02-context"
        },
        {
          "slot": "pitfall",
          "kind": "text",
          "tag": "TEXT",
          "title": "오해: 많이 넣을수록 똑똑해진다",
          "screenText": "과다 컨텍스트는 context rot로 오히려 정확도를 낮춥니다.",
          "presenterNote": "수강생이 정보량 경쟁으로 판단하지 않도록 기준을 정확 회수로 되돌립니다."
        },
        {
          "slot": "qa",
          "kind": "text",
          "tag": "TEXT",
          "title": "현장 질문",
          "screenText": "메모리에 다 적어두면 되지 않나요? → 범위·유효기간 없는 메모리는 옛 규칙을 새 작업에 흘립니다.",
          "presenterNote": "질문을 저장량에서 범위·유효기간·근거로 바꿔 대답합니다."
        },
        {
          "slot": "lab",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "예산표·정책표 작성 실습",
          "screenText": "넣을 것·뺄 것 · 범위 · 유효기간 · 근거",
          "presenterNote": "수강생 각자 실제 작업 한 건으로 컨텍스트 예산표와 메모리 정책표를 작성하게 합니다.",
          "captures": [
            "assets/v3/captures/s/02/memory-policy.png"
          ]
        },
        {
          "slot": "summary",
          "kind": "text",
          "tag": "TEXT",
          "title": "오늘의 한 문장",
          "screenText": "적게·적시에 넣고, 메모리엔 범위·유효기간·근거를 남깁니다.",
          "presenterNote": "C2/O2 작성법과 겹치지 않게 크로스툴 정책만 다시 요약합니다."
        },
        {
          "slot": "next",
          "kind": "img",
          "tag": "IMG",
          "title": "다음: Skill·재사용 자산",
          "screenText": "반복 작업을 두 도구에서 재사용 가능한 자산으로 묶습니다.",
          "presenterNote": "S3는 SKILL.md 문법이 아니라 크로스툴 재사용 자산 설계로 이어집니다.",
          "asset": "assets/v3/keyvisuals/s/02/next.png"
        }
      ],
      "scriptSlides": [
        {
          "slide": 1,
          "title": "표지",
          "say": "도구가 아니라 컨텍스트와 메모리가 결과를 정합니다.",
          "do": "표지 히어로만 띄우고 길게 설명하지 않습니다. 오늘의 한 문장만 예고합니다.",
          "ask": "오늘 주제와 관련해 최근 겪은 상황이 있나요?",
          "expected": "본인 경험 1~2개",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "응답이 없으면 구체적인 예시 하나를 제시하고 다시 질문합니다."
        },
        {
          "slide": 2,
          "title": "은유",
          "say": "서류를 다 쌓으면 정작 중요한 한 장을 못 찾습니다.",
          "do": "은유 키비주얼로 직관화하고 도구 우열 논쟁으로 흐르지 않게 합니다.",
          "ask": "이 비유에서 무엇을 기준으로 판단해야 할까요?",
          "expected": "작업 성격·필요 증거 같은 기준",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "비유의 한 지점만 짚고 다음으로 넘어갑니다."
        },
        {
          "slide": 3,
          "title": "핵심 개념",
          "say": "적시 투입 · context rot · 범위/유효기간/근거",
          "do": "개념/캡처 패널을 한 요소씩 공개하고 시선을 한 지점에 고정합니다.",
          "ask": "이 개념이 Claude와 Codex에서 같게 적용되려면 무엇이 필요할까요?",
          "expected": "공유 기준·동기화",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "요소 하나를 실제 화면에 연결해 다시 설명합니다."
        },
        {
          "slide": 4,
          "title": "대표 시연",
          "say": "같은 작업의 컨텍스트·메모리를 한 단계씩 설계합니다.",
          "do": "수동 5버튼으로 한 단계씩 진행하고, 각 단계 전에 결과를 먼저 예측하게 합니다. 자동으로 넘기지 않습니다.",
          "ask": "다음 단계에서 무엇이 달라지고 어떤 증거가 남을까요?",
          "expected": "예측 한 문장",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "애매하면 직전 단계로 돌아가 증거를 다시 짚습니다."
        },
        {
          "slide": 5,
          "title": "자주 오해",
          "say": "과다 컨텍스트는 context rot로 오히려 정확도를 낮춥니다.",
          "do": "오해 → 교정 순으로 보여주고 판단 보드(결정 카드)를 노출합니다.",
          "ask": "이 오해대로 하면 무엇이 부족해질까요?",
          "expected": "부족한 증거·위험",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "실패 사례 한 장을 제시해 차이를 보여줍니다."
        },
        {
          "slide": 6,
          "title": "예상 질문",
          "say": "메모리에 다 적어두면 되지 않나요? → 범위·유효기간 없는 메모리는 옛 규칙을 새 작업에 흘립니다.",
          "do": "수강생 실제 사례 1건을 받아 즉석에서 기준으로 분류합니다.",
          "ask": "지금 진행 중인 작업 한 건을 말해줄 수 있나요?",
          "expected": "실제 사례 1건",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "사례가 없으면 예시 작업으로 대신 분류합니다."
        },
        {
          "slide": 7,
          "title": "실습 브리프",
          "say": "넣을 것·뺄 것 · 범위 · 유효기간 · 근거",
          "do": "빈 양식과 예시 1행을 보여주고 즉시 작성하게 합니다.",
          "ask": "당신 작업의 완료 증거는 무엇인가요?",
          "expected": "완료 증거 1문장",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "예시 양식을 함께 한 줄 채워 시작점을 만듭니다."
        },
        {
          "slide": 8,
          "title": "실패 재현",
          "say": "옛 프로젝트 규칙이 현재 작업에 적용되고 도구마다 결과가 다름",
          "do": "broken 상태를 실행해 로그(stale context selected: memory item lacks scope/expiry; claude/codex memory drift)를 보여주고 증상을 고정합니다.",
          "ask": "이 증상의 원인은 어디일까요?",
          "expected": "원인 가설 1개",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "로그의 첫 오류 줄을 함께 읽고 가설을 좁힙니다."
        },
        {
          "slide": 9,
          "title": "복구 기준",
          "say": "메모리에 범위·유효기간·근거를 부여하고 Claude·Codex 정책을 한 기준으로 동기화",
          "do": "complete 상태로 복구 과정을 보여주고 재현 가능한 기준을 남깁니다.",
          "ask": "무엇을 바꿔야 다시 정상이 될까요?",
          "expected": "복구 한 단계",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "직전 정상 상태와 현재 diff를 비교해 범위를 좁힙니다."
        },
        {
          "slide": 10,
          "title": "공식자료 확인",
          "say": "수업 전 anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 재확인합니다.",
          "do": "🔄 공식 문서의 메뉴명·요금·베타·UI 변경을 확인합니다.",
          "ask": "최근 바뀐 용어나 화면이 있었나요?",
          "expected": "변경 여부 확인",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "확실치 않으면 공식 문서 링크를 함께 엽니다."
        },
        {
          "slide": 11,
          "title": "실습 타이머",
          "say": "실제 작업 1건을 골라 컨텍스트 예산표(넣을 것·뺄 것)와 메모리 정책표(범위·유효기간·근거)를 작성하고, Claude와 Codex가 같은 정책을 가리키도록 맞춥니다.",
          "do": "40분 동안 작은 범위를 끝까지 진행하고 중간에 결과를 저장하게 합니다.",
          "ask": "막힌 사람은 현재 상태와 다음 한 단계를 말해줄 수 있나요?",
          "expected": "현재 상태 + 다음 한 단계",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "결과 추가 대신 완료 기준을 다시 설명하게 합니다."
        },
        {
          "slide": 12,
          "title": "리뷰",
          "say": "산출물: 컨텍스트 예산표 · 메모리 정책표(범위·유효기간·근거) · 크로스툴 동기화 체크 · stale 발생 시 복구 기준",
          "do": "산출물을 직접 실행·확인하고 검증 기록을 남깁니다.",
          "ask": "사람이 판단한 부분과 AI 결과를 검증한 근거는 무엇인가요?",
          "expected": "판단·검증 근거",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "하나의 산출물을 함께 실행해 확인합니다."
        },
        {
          "slide": 13,
          "title": "다음 회차",
          "say": "반복 작업을 두 도구에서 재사용 가능한 자산으로 묶습니다.",
          "do": "다음 회차로 이어지는 한 문장을 예고하고 산출물을 보존하게 합니다.",
          "ask": "다음 수업 전 준비할 한 가지는 무엇인가요?",
          "expected": "준비 행동 1개",
          "deepDive": "S2는 CLAUDE.md와 AGENTS.md의 문법을 가르치지 않습니다. 강사는 같은 작업이라도 무엇을 컨텍스트에 넣고 무엇을 메모리에 남기는지가 결과 품질을 좌우한다는 점을, 그리고 그 정책이 Claude와 Codex 양쪽에서 동일하게 유지돼야 한다는 점을 공식 문서와 실제 도구 화면으로 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-context, claude-memory, codex-agents-md, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "구체적인 준비 예시 하나를 제시합니다."
        }
      ]
    },
    {
      "title": "Skill·재사용 자산 크로스툴",
      "subtitle": "SKILL.md·Codex Skill 문법이 아니라, 반복 작업을 두 도구가 공유하는 자산으로 묶기",
      "module": "S3 · SKILL REUSE",
      "objective": "반복 작업을 트리거·절차·예시로 캡슐화해 Claude SKILL.md와 Codex Skill 양쪽에서 같은 결과로 재사용되는 자산으로 만듭니다.",
      "duration": "120분",
      "flow": [
        "진단 10분",
        "공식 개념·시각화 35분",
        "재사용 자산 시연 20분",
        "캡슐화 실습 40분",
        "복구·리뷰 15분"
      ],
      "concepts": [
        [
          "반복 신호",
          "같은 작업이 반복되는 신호를 먼저 식별해 자산화 대상을 고릅니다."
        ],
        [
          "절차 캡슐화",
          "단계·체크리스트·예시를 하나의 자산으로 묶어 매번 다시 설명하지 않습니다."
        ],
        [
          "점진적 공개",
          "필요할 때만 세부를 펼치는 progressive disclosure로 자산을 가볍게 유지합니다."
        ],
        [
          "크로스툴 이식",
          "SKILL.md와 Codex Skill이 같은 자산을 가리켜 결과가 일치하게 합니다."
        ]
      ],
      "sequence": [
        "반복 작업 후보 식별",
        "절차·체크리스트·예시 캡슐화",
        "트리거 조건 명시",
        "두 도구에서 재사용 검증",
        "버전·근거 기록"
      ],
      "demo": {
        "type": "skill-reuse",
        "sceneId": "s-03-skill",
        "manual": true,
        "title": "반복 작업을 두 도구가 공유하는 자산으로 캡슐화합니다",
        "stages": [
          "반복 신호",
          "절차 캡슐화",
          "트리거",
          "크로스툴 이식",
          "검증"
        ]
      },
      "compare": {
        "bad": [
          "같은 작업을 매번 즉흥 지시로 다시 설명",
          "한 도구에만 절차를 만들고 다른 도구는 따로 운영",
          "검증 없이 자산을 공유해 결과가 갈림"
        ],
        "good": [
          "반복 작업을 트리거·절차·예시로 캡슐화",
          "두 도구가 같은 자산을 가리키게 이식",
          "같은 입력에 같은 결과인지 검증 후 버전 기록"
        ]
      },
      "decisions": [
        [
          "한 번 쓰는 작업도 전부 Skill로 만든다",
          "보류",
          "반복 신호가 있는 작업부터 자산화합니다."
        ],
        [
          "자산에 트리거와 검증 기준을 함께 적는다",
          "좋음",
          "언제 쓰고 무엇으로 통과를 판단할지가 재사용의 핵심입니다."
        ],
        [
          "Claude와 Codex 자산을 같은 기준으로 맞춘다",
          "필수",
          "도구마다 절차가 다르면 결과가 갈립니다."
        ]
      ],
      "error": {
        "symptom": "같은 작업을 매번 다시 설명해 결과가 들쭉날쭉함",
        "trace": "skill drift: ad-hoc instructions, no shared asset; claude/codex steps diverge",
        "cause": "반복 작업을 자산으로 묶지 않고 도구마다 즉흥 지시로 처리함",
        "fix": "트리거·절차·예시를 Skill 자산으로 캡슐화하고 두 도구가 같은 자산을 가리키게 검증"
      },
      "practice": "반복하는 작업 1건을 골라 트리거·절차·체크리스트·예시를 담은 재사용 자산을 만들고, Claude와 Codex에서 같은 결과가 나오는지 검증합니다.",
      "deliverables": [
        "재사용 자산(트리거·절차·예시)",
        "통과 검증 기준",
        "크로스툴 이식 체크",
        "drift 발생 시 복구 기준"
      ],
      "sources": [
        "claude-skills",
        "anthropic-eng-skills",
        "codex-overview",
        "openai-tools"
      ],
      "sourceKeys": [
        "claude-skills",
        "anthropic-eng-skills",
        "codex-overview",
        "openai-tools"
      ],
      "pathway": null,
      "professional": {
        "level": "AI 심화 통합과정 S3 강사용 연구노트",
        "focus": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
        "officialStudy": [
          "Anthropic · Agent Skills에서 SKILL.md와 progressive disclosure의 개념을 확인하고 수업 언어로 바꿉니다.",
          "Anthropic · Engineering Skills에서 재사용 자산이 어떤 구조로 신뢰성을 얻는지 확인합니다.",
          "OpenAI · Codex 개요에서 Codex가 재사용 작업을 어떻게 다루는지 확인하고 SKILL.md와의 대응을 정리합니다.",
          "OpenAI · Tools에서 도구·함수 호출과 Skill 자산의 경계를 정리합니다."
        ],
        "visualSimulation": "Skill 재사용 스튜디오 장면을 사용합니다. 발표자는 반복 신호 → 절차 캡슐화 → 트리거 → 크로스툴 이식 → 검증을 수동으로 넘기며 각 단계에서 자산이 완성되는 과정을 보여줍니다.",
        "demoRun": [
          "반복되는 작업의 신호를 먼저 식별합니다.",
          "단계·체크리스트·예시를 하나의 자산으로 캡슐화합니다.",
          "언제 쓰는지 트리거 조건을 명시합니다.",
          "SKILL.md와 Codex Skill이 같은 자산을 가리키게 이식합니다.",
          "같은 입력에 같은 결과가 나오는지 검증하고 버전을 남깁니다."
        ],
        "failureDrill": [
          "자산 없이 매번 즉흥 지시해 결과가 갈리는 drift를 보여줍니다.",
          "두 도구의 절차가 어긋난 지점을 찾습니다.",
          "트리거·절차·예시를 자산으로 묶고 검증 기준으로 복구합니다."
        ],
        "exercise": "반복 작업 1건을 자산으로 캡슐화하고 두 도구에서 동일 결과를 검증한 뒤 버전과 근거를 남깁니다.",
        "misconceptions": [
          [
            "모든 작업을 Skill로 만들어야 한다",
            "반복 신호가 있는 작업부터 자산화합니다."
          ],
          [
            "Skill을 만들면 자동으로 두 도구에서 같다",
            "같은 자산을 가리키고 검증해야 결과가 일치합니다."
          ]
        ],
        "expertQuestions": [
          [
            "Skill과 단순 프롬프트의 차이는?",
            "Skill은 트리거·절차·예시·검증을 가진 재사용 자산입니다. 일회성 프롬프트와 달리 버전과 통과 기준이 있습니다."
          ],
          [
            "두 도구 자산을 어떻게 동기화하나요?",
            "같은 절차·예시·검증을 단일 출처로 두고 각 도구가 그것을 가리키게 합니다. 도구별로 따로 쓰지 않습니다."
          ]
        ],
        "studyPath": [
          "Agent Skills에서 SKILL.md 구조와 progressive disclosure 확인",
          "재사용 자산의 트리거·검증 기준 형식 정리",
          "Codex의 재사용 작업 방식과 SKILL.md 대응 비교",
          "C3/O3(작성법)와 S3(크로스툴 자산)의 경계를 말로 정리",
          "수업 전 Skill 관련 공식 용어와 UI 변경 여부 재확인"
        ],
        "slideUpgrade": [
          "표지는 추상 이미지보다 재사용 자산이 두 도구로 퍼지는 다큐멘터리 톤으로 유지",
          "핵심 개념은 카드보다 트리거·절차·검증 배지를 나란히 배치",
          "대표 장면은 수동 5버튼으로 자산을 한 단계씩 완성",
          "오해 슬라이드는 자산 남발이 아니라 반복 신호 기준으로 정리",
          "실습 슬라이드는 자산 양식을 빈 칸으로 보여주고 즉시 작성하게 설계"
        ],
        "motionStoryboard": [
          "Idle: 자산 블록은 낮은 opacity로 대기하고 자동 진행하지 않습니다.",
          "Focus: 현재 단계 블록만 밝아지고 나머지는 배경으로 물러납니다.",
          "Capsule: 절차 단계에서 단계·예시 배지가 순서대로 채워집니다.",
          "Share: 이식 단계에서 SKILL.md와 Codex Skill을 잇는 teal 라인이 연결됩니다.",
          "Verify: 마지막 단계에서 통과 체크라인이 연결됩니다."
        ],
        "realWorldAssets": [
          "재사용 자산(SKILL.md) 샘플",
          "Codex Skill 대응 자산 샘플",
          "트리거·검증 기준 표",
          "drift 발생 비교 캡처",
          "크로스툴 동일 결과 검증 캡처"
        ],
        "rehearsalChecklist": [
          "5버튼 수동 진행으로 각 단계를 멈춰 설명",
          "C3/O3 작성법 재교육으로 흐르지 않는지 확인",
          "각 단계에서 완성되는 자산을 한 문장으로 말하기",
          "1280x720에서 배지·캡션이 잘리지 않는지 확인",
          "수업 전 공식 문서와 도구 UI 변경 여부 재확인"
        ]
      },
      "revision": "3.0.0-beta.3",
      "status": "review",
      "visualScene": {
        "id": "s-03-skill",
        "type": "skill-reuse",
        "alias": "claude-03-skill",
        "title": "Skill 재사용 스튜디오",
        "layout": "skill-reuse-studio",
        "normalFlow": [
          "반복 신호 식별",
          "절차 캡슐화",
          "트리거 명시",
          "크로스툴 이식",
          "재사용 검증"
        ],
        "failureFlow": [
          "skill drift",
          "절차 불일치",
          "자산 재정의"
        ],
        "recoveryFlow": [
          "트리거·절차·예시 캡슐화",
          "두 도구 자산 동기화",
          "검증 기준으로 재실행"
        ],
        "steps": [
          {
            "label": "SIGNAL",
            "title": "반복 작업 신호 식별",
            "detail": "같은 작업이 반복되는 신호를 먼저 찾아 자산화 대상을 고릅니다."
          },
          {
            "label": "CAPSULE",
            "title": "절차·예시 캡슐화",
            "detail": "단계·체크리스트·예시를 하나의 재사용 자산으로 묶습니다."
          },
          {
            "label": "TRIGGER",
            "title": "트리거 조건 명시",
            "detail": "언제 이 자산을 쓰는지 트리거를 적어 오용을 막습니다."
          },
          {
            "label": "SHARE",
            "title": "크로스툴 이식",
            "detail": "SKILL.md와 Codex Skill이 같은 자산을 가리키게 맞춥니다."
          },
          {
            "label": "VERIFY",
            "title": "두 도구에서 검증",
            "detail": "같은 입력에 같은 결과가 나오는지 확인하고 버전을 남깁니다."
          }
        ]
      },
      "interactions": {
        "controls": [
          "start",
          "previous",
          "next",
          "pause",
          "reset"
        ],
        "predictionPrompt": "다음 단계에서 자산이 어떻게 완성되고 어떤 위험이 차단될지 먼저 말한 뒤 진행",
        "decisionCards": 3,
        "manualOnly": true
      },
      "assets": {
        "fallbackImage": "assets/v3/fallbacks/advanced-03.png",
        "sceneId": "s-03-skill",
        "keyvisuals": [
          "assets/v3/keyvisuals/s/03/cover.png",
          "assets/v3/keyvisuals/s/03/metaphor.png",
          "assets/v3/keyvisuals/s/03/next.png"
        ],
        "captures": [
          "assets/v3/captures/s/03/skill-asset.png",
          "assets/v3/captures/s/03/trigger.png",
          "assets/v3/captures/s/03/cross-tool.png"
        ]
      },
      "demoProject": {
        "root": "v3/projects/advanced/03",
        "starter": "v3/projects/advanced/03/starter",
        "broken": "v3/projects/advanced/03/broken",
        "complete": "v3/projects/advanced/03/complete",
        "manifest": "v3/projects/advanced/03/lab.json"
      },
      "fallbackMedia": {
        "image": "assets/v3/fallbacks/advanced-03.png",
        "slide": "v3/deck.html?course=advanced&lesson=3&slide=4&motion=low"
      },
      "studentMaterials": [
        "workbook",
        "commands",
        "examples",
        "errors",
        "assessment",
        "practice"
      ],
      "instructorMaterials": [
        "script",
        "source-study",
        "demo-runbook",
        "deep-dive",
        "qa-bank",
        "fallback",
        "rehearsal"
      ],
      "slides": [
        {
          "slot": "cover",
          "kind": "img",
          "tag": "IMG",
          "title": "반복은 자산으로 묶는다",
          "screenText": "매번 다시 설명하지 않고, 한 번 만들어 두 도구에서 재사용합니다.",
          "presenterNote": "오늘은 SKILL 문법이 아니라 재사용 자산을 만드는 판단을 다룬다고 안내합니다.",
          "asset": "assets/v3/keyvisuals/s/03/cover.png"
        },
        {
          "slot": "metaphor",
          "kind": "img",
          "tag": "IMG",
          "title": "레시피 카드처럼",
          "screenText": "한 번 정리한 레시피는 누가 만들어도 같은 맛이 납니다.",
          "presenterNote": "재사용 자산이 결과의 일관성을 만든다는 점을 레시피로 직관화합니다.",
          "asset": "assets/v3/keyvisuals/s/03/metaphor.png"
        },
        {
          "slot": "concept",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "재사용 자산 3요소",
          "screenText": "트리거 · 절차/예시 · 통과 검증",
          "presenterNote": "세 요소가 Claude와 Codex 양쪽에서 같게 작동해야 함을 강조합니다.",
          "captures": [
            "assets/v3/captures/s/03/skill-asset.png",
            "assets/v3/captures/s/03/trigger.png",
            "assets/v3/captures/s/03/cross-tool.png"
          ]
        },
        {
          "slot": "representative",
          "kind": "scene",
          "tag": "SCENE",
          "title": "Skill 재사용 스튜디오",
          "screenText": "반복 작업을 한 단계씩 자산으로 캡슐화합니다.",
          "presenterNote": "자동 진행 없이 시작과 다음 버튼으로 자산을 하나씩 완성합니다.",
          "sceneId": "s-03-skill"
        },
        {
          "slot": "pitfall",
          "kind": "text",
          "tag": "TEXT",
          "title": "오해: 모든 작업을 Skill로",
          "screenText": "반복 신호가 있는 작업부터 자산화합니다.",
          "presenterNote": "자산 남발이 아니라 반복 빈도와 검증 기준으로 판단하게 합니다."
        },
        {
          "slot": "qa",
          "kind": "text",
          "tag": "TEXT",
          "title": "현장 질문",
          "screenText": "Skill을 만들면 두 도구에서 같나요? → 같은 자산을 가리키고 검증해야 같습니다.",
          "presenterNote": "질문을 제작에서 크로스툴 검증으로 바꿔 대답합니다."
        },
        {
          "slot": "lab",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "재사용 자산 캡슐화 실습",
          "screenText": "트리거 · 절차/예시 · 통과 검증 · 크로스툴 이식",
          "presenterNote": "수강생 각자 반복 작업 한 건을 자산으로 만들게 합니다.",
          "captures": [
            "assets/v3/captures/s/03/skill-asset.png"
          ]
        },
        {
          "slot": "summary",
          "kind": "text",
          "tag": "TEXT",
          "title": "오늘의 한 문장",
          "screenText": "반복은 트리거·절차·검증을 가진 자산으로 묶어 두 도구에서 재사용합니다.",
          "presenterNote": "C3/O3 작성법과 겹치지 않게 크로스툴 자산 기준만 요약합니다."
        },
        {
          "slot": "next",
          "kind": "img",
          "tag": "IMG",
          "title": "다음: MCP·커넥터·권한",
          "screenText": "외부 능력을 최소 권한으로 안전하게 연결합니다.",
          "presenterNote": "S4는 MCP 설치법이 아니라 크로스툴 권한·보안 설계로 이어집니다.",
          "asset": "assets/v3/keyvisuals/s/03/next.png"
        }
      ],
      "scriptSlides": [
        {
          "slide": 1,
          "title": "표지",
          "say": "매번 다시 설명하지 않고, 한 번 만들어 두 도구에서 재사용합니다.",
          "do": "표지 히어로만 띄우고 길게 설명하지 않습니다. 오늘의 한 문장만 예고합니다.",
          "ask": "오늘 주제와 관련해 최근 겪은 상황이 있나요?",
          "expected": "본인 경험 1~2개",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "응답이 없으면 구체적인 예시 하나를 제시하고 다시 질문합니다."
        },
        {
          "slide": 2,
          "title": "은유",
          "say": "한 번 정리한 레시피는 누가 만들어도 같은 맛이 납니다.",
          "do": "은유 키비주얼로 직관화하고 도구 우열 논쟁으로 흐르지 않게 합니다.",
          "ask": "이 비유에서 무엇을 기준으로 판단해야 할까요?",
          "expected": "작업 성격·필요 증거 같은 기준",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "비유의 한 지점만 짚고 다음으로 넘어갑니다."
        },
        {
          "slide": 3,
          "title": "핵심 개념",
          "say": "트리거 · 절차/예시 · 통과 검증",
          "do": "개념/캡처 패널을 한 요소씩 공개하고 시선을 한 지점에 고정합니다.",
          "ask": "이 개념이 Claude와 Codex에서 같게 적용되려면 무엇이 필요할까요?",
          "expected": "공유 기준·동기화",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "요소 하나를 실제 화면에 연결해 다시 설명합니다."
        },
        {
          "slide": 4,
          "title": "대표 시연",
          "say": "반복 작업을 한 단계씩 자산으로 캡슐화합니다.",
          "do": "수동 5버튼으로 한 단계씩 진행하고, 각 단계 전에 결과를 먼저 예측하게 합니다. 자동으로 넘기지 않습니다.",
          "ask": "다음 단계에서 무엇이 달라지고 어떤 증거가 남을까요?",
          "expected": "예측 한 문장",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "애매하면 직전 단계로 돌아가 증거를 다시 짚습니다."
        },
        {
          "slide": 5,
          "title": "자주 오해",
          "say": "반복 신호가 있는 작업부터 자산화합니다.",
          "do": "오해 → 교정 순으로 보여주고 판단 보드(결정 카드)를 노출합니다.",
          "ask": "이 오해대로 하면 무엇이 부족해질까요?",
          "expected": "부족한 증거·위험",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "실패 사례 한 장을 제시해 차이를 보여줍니다."
        },
        {
          "slide": 6,
          "title": "예상 질문",
          "say": "Skill을 만들면 두 도구에서 같나요? → 같은 자산을 가리키고 검증해야 같습니다.",
          "do": "수강생 실제 사례 1건을 받아 즉석에서 기준으로 분류합니다.",
          "ask": "지금 진행 중인 작업 한 건을 말해줄 수 있나요?",
          "expected": "실제 사례 1건",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "사례가 없으면 예시 작업으로 대신 분류합니다."
        },
        {
          "slide": 7,
          "title": "실습 브리프",
          "say": "트리거 · 절차/예시 · 통과 검증 · 크로스툴 이식",
          "do": "빈 양식과 예시 1행을 보여주고 즉시 작성하게 합니다.",
          "ask": "당신 작업의 완료 증거는 무엇인가요?",
          "expected": "완료 증거 1문장",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "예시 양식을 함께 한 줄 채워 시작점을 만듭니다."
        },
        {
          "slide": 8,
          "title": "실패 재현",
          "say": "같은 작업을 매번 다시 설명해 결과가 들쭉날쭉함",
          "do": "broken 상태를 실행해 로그(skill drift: ad-hoc instructions, no shared asset; claude/codex steps diverge)를 보여주고 증상을 고정합니다.",
          "ask": "이 증상의 원인은 어디일까요?",
          "expected": "원인 가설 1개",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "로그의 첫 오류 줄을 함께 읽고 가설을 좁힙니다."
        },
        {
          "slide": 9,
          "title": "복구 기준",
          "say": "트리거·절차·예시를 Skill 자산으로 캡슐화하고 두 도구가 같은 자산을 가리키게 검증",
          "do": "complete 상태로 복구 과정을 보여주고 재현 가능한 기준을 남깁니다.",
          "ask": "무엇을 바꿔야 다시 정상이 될까요?",
          "expected": "복구 한 단계",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "직전 정상 상태와 현재 diff를 비교해 범위를 좁힙니다."
        },
        {
          "slide": 10,
          "title": "공식자료 확인",
          "say": "수업 전 claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 재확인합니다.",
          "do": "🔄 공식 문서의 메뉴명·요금·베타·UI 변경을 확인합니다.",
          "ask": "최근 바뀐 용어나 화면이 있었나요?",
          "expected": "변경 여부 확인",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "확실치 않으면 공식 문서 링크를 함께 엽니다."
        },
        {
          "slide": 11,
          "title": "실습 타이머",
          "say": "반복하는 작업 1건을 골라 트리거·절차·체크리스트·예시를 담은 재사용 자산을 만들고, Claude와 Codex에서 같은 결과가 나오는지 검증합니다.",
          "do": "40분 동안 작은 범위를 끝까지 진행하고 중간에 결과를 저장하게 합니다.",
          "ask": "막힌 사람은 현재 상태와 다음 한 단계를 말해줄 수 있나요?",
          "expected": "현재 상태 + 다음 한 단계",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "결과 추가 대신 완료 기준을 다시 설명하게 합니다."
        },
        {
          "slide": 12,
          "title": "리뷰",
          "say": "산출물: 재사용 자산(트리거·절차·예시) · 통과 검증 기준 · 크로스툴 이식 체크 · drift 발생 시 복구 기준",
          "do": "산출물을 직접 실행·확인하고 검증 기록을 남깁니다.",
          "ask": "사람이 판단한 부분과 AI 결과를 검증한 근거는 무엇인가요?",
          "expected": "판단·검증 근거",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "하나의 산출물을 함께 실행해 확인합니다."
        },
        {
          "slide": 13,
          "title": "다음 회차",
          "say": "외부 능력을 최소 권한으로 안전하게 연결합니다.",
          "do": "다음 회차로 이어지는 한 문장을 예고하고 산출물을 보존하게 합니다.",
          "ask": "다음 수업 전 준비할 한 가지는 무엇인가요?",
          "expected": "준비 행동 1개",
          "deepDive": "S3는 SKILL.md나 Codex Skill의 파일 문법을 가르치지 않습니다. 강사는 반복 작업을 자산으로 캡슐화하는 판단(무엇을, 언제, 어떤 검증으로)과 그 자산이 두 도구에서 동일하게 작동하도록 맞추는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "claude-skills, anthropic-eng-skills, codex-overview, openai-tools 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "구체적인 준비 예시 하나를 제시합니다."
        }
      ]
    },
    {
      "title": "MCP·커넥터·권한 크로스툴",
      "subtitle": "MCP 설치법이 아니라, 두 도구의 외부 연결을 최소 권한·승인·감사로 설계",
      "module": "S4 · MCP & GRANTS",
      "objective": "외부 능력을 Claude MCP와 Codex Connectors 양쪽에서 최소 권한·승인·감사로 연결하고, 간접 프롬프트 인젝션을 방어합니다.",
      "duration": "120분",
      "flow": [
        "진단 10분",
        "공식 개념·시각화 35분",
        "권한·연결 시연 20분",
        "권한 설계 실습 40분",
        "복구·리뷰 15분"
      ],
      "concepts": [
        [
          "연결 범위",
          "어떤 서버·기능을 연결할지 최소로 정해 공격 표면을 줄입니다."
        ],
        [
          "최소 권한",
          "읽기/쓰기 범위를 필요한 만큼만 부여합니다."
        ],
        [
          "승인·감사",
          "민감한 작업은 승인 게이트와 감사 로그로 남깁니다."
        ],
        [
          "인젝션 방어",
          "외부 입력을 불신 입력으로 보고 숨은 지시를 차단합니다."
        ]
      ],
      "sequence": [
        "연결할 서버·기능 최소화",
        "읽기/쓰기 권한 범위 지정",
        "승인 게이트·감사 로그 설정",
        "외부 입력 불신 처리",
        "두 도구 권한 정책 동기화"
      ],
      "demo": {
        "type": "mcp-grant",
        "sceneId": "s-04-mcp",
        "manual": true,
        "title": "외부 연결을 두 도구에서 최소 권한으로 설계합니다",
        "stages": [
          "연결 범위",
          "권한",
          "승인·감사",
          "인젝션 방어",
          "정책 동기화"
        ]
      },
      "compare": {
        "bad": [
          "모든 서버·기능을 한 번에 연결",
          "쓰기 권한을 경로 제한 없이 부여",
          "외부 문서의 지시를 그대로 신뢰"
        ],
        "good": [
          "필요한 서버·기능만 최소 연결",
          "읽기/쓰기 범위를 좁게 지정",
          "외부=불신 입력으로 보고 승인·감사 추가"
        ]
      },
      "decisions": [
        [
          "편하니 모든 도구를 연결한다",
          "위험",
          "공격 표면이 커집니다. 필요한 것만 최소 연결합니다."
        ],
        [
          "민감 작업에 승인 게이트를 둔다",
          "좋음",
          "사람이 확인할 지점을 남겨 사고를 막습니다."
        ],
        [
          "외부 페이지 지시는 검증 후에만 따른다",
          "필수",
          "간접 인젝션은 외부 입력을 신뢰할 때 발생합니다."
        ]
      ],
      "error": {
        "symptom": "과도한 권한과 외부 페이지의 숨은 지시로 의도치 않은 쓰기가 발생함",
        "trace": "write scope: /** ; indirect prompt injection from external doc",
        "cause": "필요 이상으로 권한을 부여하고 외부 입력을 신뢰함",
        "fix": "권한 범위를 좁히고 승인 게이트·감사를 추가하며 외부=불신 입력으로 처리"
      },
      "practice": "실제 연결 1건을 골라 서버·기능 범위, 읽기/쓰기 권한, 승인·감사, 인젝션 방어를 권한 설계표로 작성하고 두 도구 정책을 맞춥니다.",
      "deliverables": [
        "권한 설계표(범위·읽기/쓰기)",
        "승인 게이트·감사 설정",
        "인젝션 방어 체크",
        "과권한 발생 시 복구 기준"
      ],
      "sources": [
        "mcp-architecture",
        "mcp-security",
        "claude-mcp",
        "owasp-llm-top10"
      ],
      "sourceKeys": [
        "mcp-architecture",
        "mcp-security",
        "claude-mcp",
        "owasp-llm-top10"
      ],
      "pathway": null,
      "professional": {
        "level": "AI 심화 통합과정 S4 강사용 연구노트",
        "focus": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
        "officialStudy": [
          "MCP · Architecture에서 Host/Client/Server와 권한·전송 구조를 확인하고 수업 언어로 바꿉니다.",
          "MCP · Security Best Practices에서 토큰 전달·동의·공격 표면과 최소 권한 원칙을 확인합니다.",
          "Anthropic · Claude Code MCP에서 제품에서의 연결·권한 구현을 확인하고 Codex Connectors와 대응을 정리합니다.",
          "OWASP · LLM Top 10에서 LLM01(프롬프트 인젝션)·LLM06 등을 점검표로 정리합니다."
        ],
        "visualSimulation": "MCP 권한 그물 장면을 사용합니다. 발표자는 연결 범위 → 권한 → 승인·감사 → 인젝션 방어 → 정책 동기화를 수동으로 넘기며 권한이 좁혀지는 과정을 보여줍니다.",
        "demoRun": [
          "필요한 서버·기능만 최소로 연결합니다.",
          "읽기/쓰기 권한 범위를 좁게 지정합니다.",
          "민감 작업에 승인 게이트와 감사 로그를 설정합니다.",
          "외부 입력을 불신으로 보고 숨은 지시를 차단합니다.",
          "Claude MCP와 Codex Connectors 권한 정책을 한 기준으로 맞춥니다."
        ],
        "failureDrill": [
          "경로 제한 없는 쓰기 권한과 외부 문서의 숨은 지시로 오작동을 보여줍니다.",
          "과권한과 신뢰된 외부 입력을 문제 원인으로 분류합니다.",
          "권한 축소·승인·감사·불신 처리로 복구합니다."
        ],
        "exercise": "연결 1건의 권한 설계표를 작성하고 승인·감사·인젝션 방어를 두 도구에 동일하게 적용합니다.",
        "misconceptions": [
          [
            "도구를 많이 연결할수록 똑똑해진다",
            "연결은 통로일 뿐이며 공격 표면만 커집니다."
          ],
          [
            "외부 문서의 지시는 따라도 된다",
            "외부 입력은 불신 입력입니다. 검증 후에만 따릅니다."
          ]
        ],
        "expertQuestions": [
          [
            "함수 호출과 MCP의 차이는?",
            "MCP는 발견·다중 서버·전송을 표준화한 상위 규격입니다. 핵심은 권한과 신뢰 경계입니다."
          ],
          [
            "두 도구 권한을 어떻게 맞추나요?",
            "최소 권한·승인·감사·불신 처리라는 같은 정책을 단일 기준으로 두고 각 제품에서 동일하게 구현합니다."
          ]
        ],
        "studyPath": [
          "MCP Architecture에서 권한·전송·프리미티브 확인",
          "MCP Security에서 최소 권한·동의·인젝션 확인",
          "Claude MCP와 Codex Connectors의 권한 화면 비교",
          "C4/O4(연결법)와 S4(크로스툴 권한 정책)의 경계 정리",
          "수업 전 MCP·보안 문서의 draft 여부와 UI 변경 재확인"
        ],
        "slideUpgrade": [
          "표지는 추상 이미지보다 권한이 좁혀지는 권한 그물을 다큐멘터리 톤으로 유지",
          "핵심 개념은 카드보다 범위·권한·승인·감사 배지를 나란히 배치",
          "대표 장면은 수동 5버튼으로 권한을 한 단계씩 좁힘",
          "오해 슬라이드는 연결 수 경쟁이 아니라 최소 권한 문제로 정리",
          "실습 슬라이드는 권한 설계표를 빈 양식으로 보여주고 즉시 작성하게 설계"
        ],
        "motionStoryboard": [
          "Idle: 권한 블록은 낮은 opacity로 대기하고 자동 진행하지 않습니다.",
          "Focus: 현재 단계 블록만 밝아지고 나머지는 배경으로 물러납니다.",
          "Scope: 권한 단계에서 읽기/쓰기 범위 배지가 좁혀집니다.",
          "Guard: 인젝션 방어 단계에서 외부 입력에 amber 경고선이 켜집니다.",
          "Sync: 마지막 단계에서 두 도구 권한을 잇는 teal 동기화 라인이 연결됩니다."
        ],
        "realWorldAssets": [
          "권한 설계표 샘플",
          "승인 게이트·감사 로그 캡처",
          "MCP/Connectors 권한 화면 비교",
          "과권한·인젝션 발생 캡처",
          "권한 축소 복구 캡처"
        ],
        "rehearsalChecklist": [
          "5버튼 수동 진행으로 각 단계를 멈춰 설명",
          "C4/O4 연결법 재교육으로 흐르지 않는지 확인",
          "각 단계에서 좁혀지는 권한을 한 문장으로 말하기",
          "1280x720에서 배지·캡션이 잘리지 않는지 확인",
          "수업 전 공식 문서와 도구 UI 변경 여부 재확인"
        ]
      },
      "revision": "3.0.0-beta.3",
      "status": "review",
      "visualScene": {
        "id": "s-04-mcp",
        "type": "mcp-grant",
        "alias": "workflow-03-protocol",
        "title": "MCP 권한 그물",
        "layout": "mcp-grant-mesh",
        "normalFlow": [
          "연결 범위 최소화",
          "권한 범위 지정",
          "승인·감사 설정",
          "인젝션 방어",
          "정책 동기화"
        ],
        "failureFlow": [
          "write scope: /**",
          "indirect injection",
          "권한 재설계"
        ],
        "recoveryFlow": [
          "권한 범위 축소",
          "승인·감사 추가",
          "외부=불신 처리"
        ],
        "steps": [
          {
            "label": "SCOPE",
            "title": "연결 범위 최소화",
            "detail": "필요한 서버·기능만 연결해 공격 표면을 줄입니다."
          },
          {
            "label": "GRANT",
            "title": "최소 권한 부여",
            "detail": "읽기/쓰기 범위를 필요한 만큼만 지정합니다."
          },
          {
            "label": "APPROVE",
            "title": "승인·감사 설정",
            "detail": "민감한 작업은 승인 게이트와 감사 로그로 남깁니다."
          },
          {
            "label": "GUARD",
            "title": "인젝션 방어",
            "detail": "외부 입력을 불신으로 보고 숨은 지시를 차단합니다."
          },
          {
            "label": "SYNC",
            "title": "두 도구 정책 동기화",
            "detail": "Claude MCP와 Codex Connectors 권한을 한 기준으로 맞춥니다."
          }
        ]
      },
      "interactions": {
        "controls": [
          "start",
          "previous",
          "next",
          "pause",
          "reset"
        ],
        "predictionPrompt": "다음 단계에서 권한이 어떻게 좁혀지고 어떤 위험이 차단될지 먼저 말한 뒤 진행",
        "decisionCards": 3,
        "manualOnly": true
      },
      "assets": {
        "fallbackImage": "assets/v3/fallbacks/advanced-04.png",
        "sceneId": "s-04-mcp",
        "keyvisuals": [
          "assets/v3/keyvisuals/s/04/cover.png",
          "assets/v3/keyvisuals/s/04/metaphor.png",
          "assets/v3/keyvisuals/s/04/next.png"
        ],
        "captures": [
          "assets/v3/captures/s/04/grant-table.png",
          "assets/v3/captures/s/04/approval.png",
          "assets/v3/captures/s/04/injection.png"
        ]
      },
      "demoProject": {
        "root": "v3/projects/advanced/04",
        "starter": "v3/projects/advanced/04/starter",
        "broken": "v3/projects/advanced/04/broken",
        "complete": "v3/projects/advanced/04/complete",
        "manifest": "v3/projects/advanced/04/lab.json"
      },
      "fallbackMedia": {
        "image": "assets/v3/fallbacks/advanced-04.png",
        "slide": "v3/deck.html?course=advanced&lesson=4&slide=4&motion=low"
      },
      "studentMaterials": [
        "workbook",
        "commands",
        "examples",
        "errors",
        "assessment",
        "practice"
      ],
      "instructorMaterials": [
        "script",
        "source-study",
        "demo-runbook",
        "deep-dive",
        "qa-bank",
        "fallback",
        "rehearsal"
      ],
      "slides": [
        {
          "slot": "cover",
          "kind": "img",
          "tag": "IMG",
          "title": "연결은 권한으로 설계한다",
          "screenText": "많이 연결하는 게 아니라, 필요한 만큼만 안전하게 연결합니다.",
          "presenterNote": "오늘은 MCP 설치법이 아니라 최소 권한·승인·감사 설계를 다룬다고 안내합니다.",
          "asset": "assets/v3/keyvisuals/s/04/cover.png"
        },
        {
          "slot": "metaphor",
          "kind": "img",
          "tag": "IMG",
          "title": "마스터키 대신 구역 열쇠",
          "screenText": "건물 전체 마스터키보다, 필요한 방의 열쇠만 줍니다.",
          "presenterNote": "최소 권한을 열쇠 비유로 직관화합니다.",
          "asset": "assets/v3/keyvisuals/s/04/metaphor.png"
        },
        {
          "slot": "concept",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "권한 설계 4요소",
          "screenText": "범위 · 읽기/쓰기 · 승인/감사 · 인젝션 방어",
          "presenterNote": "네 요소가 Claude와 Codex에서 같게 적용돼야 함을 강조합니다.",
          "captures": [
            "assets/v3/captures/s/04/grant-table.png",
            "assets/v3/captures/s/04/approval.png",
            "assets/v3/captures/s/04/injection.png"
          ]
        },
        {
          "slot": "representative",
          "kind": "scene",
          "tag": "SCENE",
          "title": "MCP 권한 그물",
          "screenText": "외부 연결의 권한을 한 단계씩 좁혀 설계합니다.",
          "presenterNote": "자동 진행 없이 시작과 다음 버튼으로 권한을 하나씩 좁힙니다.",
          "sceneId": "s-04-mcp"
        },
        {
          "slot": "pitfall",
          "kind": "text",
          "tag": "TEXT",
          "title": "오해: 다 연결하면 편하다",
          "screenText": "연결은 통로일 뿐, 과도한 권한은 공격 표면을 키웁니다.",
          "presenterNote": "편의가 아니라 최소 권한과 신뢰 경계로 판단하게 합니다."
        },
        {
          "slot": "qa",
          "kind": "text",
          "tag": "TEXT",
          "title": "현장 질문",
          "screenText": "외부 문서 지시를 따라도 되나요? → 외부 입력은 불신, 검증 후에만 따릅니다.",
          "presenterNote": "질문을 연결 편의에서 신뢰 경계로 바꿔 대답합니다."
        },
        {
          "slot": "lab",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "권한 설계표 작성 실습",
          "screenText": "범위 · 읽기/쓰기 · 승인/감사 · 인젝션 방어",
          "presenterNote": "수강생 각자 실제 연결 한 건의 권한 설계표를 작성하게 합니다.",
          "captures": [
            "assets/v3/captures/s/04/grant-table.png"
          ]
        },
        {
          "slot": "summary",
          "kind": "text",
          "tag": "TEXT",
          "title": "오늘의 한 문장",
          "screenText": "필요한 만큼만 연결하고, 승인·감사·불신 처리를 두 도구에 똑같이 적용합니다.",
          "presenterNote": "C4/O4 연결법과 겹치지 않게 권한 정책 기준만 요약합니다."
        },
        {
          "slot": "next",
          "kind": "img",
          "tag": "IMG",
          "title": "다음: Agent·SubAgent·Worktree",
          "screenText": "작업을 병렬로 나누되 소유권이 겹치지 않게 합니다.",
          "presenterNote": "S5는 서브에이전트 기능 사용법이 아니라 크로스툴 병렬·소유권 설계로 이어집니다.",
          "asset": "assets/v3/keyvisuals/s/04/next.png"
        }
      ],
      "scriptSlides": [
        {
          "slide": 1,
          "title": "표지",
          "say": "많이 연결하는 게 아니라, 필요한 만큼만 안전하게 연결합니다.",
          "do": "표지 히어로만 띄우고 길게 설명하지 않습니다. 오늘의 한 문장만 예고합니다.",
          "ask": "오늘 주제와 관련해 최근 겪은 상황이 있나요?",
          "expected": "본인 경험 1~2개",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "응답이 없으면 구체적인 예시 하나를 제시하고 다시 질문합니다."
        },
        {
          "slide": 2,
          "title": "은유",
          "say": "건물 전체 마스터키보다, 필요한 방의 열쇠만 줍니다.",
          "do": "은유 키비주얼로 직관화하고 도구 우열 논쟁으로 흐르지 않게 합니다.",
          "ask": "이 비유에서 무엇을 기준으로 판단해야 할까요?",
          "expected": "작업 성격·필요 증거 같은 기준",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "비유의 한 지점만 짚고 다음으로 넘어갑니다."
        },
        {
          "slide": 3,
          "title": "핵심 개념",
          "say": "범위 · 읽기/쓰기 · 승인/감사 · 인젝션 방어",
          "do": "개념/캡처 패널을 한 요소씩 공개하고 시선을 한 지점에 고정합니다.",
          "ask": "이 개념이 Claude와 Codex에서 같게 적용되려면 무엇이 필요할까요?",
          "expected": "공유 기준·동기화",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "요소 하나를 실제 화면에 연결해 다시 설명합니다."
        },
        {
          "slide": 4,
          "title": "대표 시연",
          "say": "외부 연결의 권한을 한 단계씩 좁혀 설계합니다.",
          "do": "수동 5버튼으로 한 단계씩 진행하고, 각 단계 전에 결과를 먼저 예측하게 합니다. 자동으로 넘기지 않습니다.",
          "ask": "다음 단계에서 무엇이 달라지고 어떤 증거가 남을까요?",
          "expected": "예측 한 문장",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "애매하면 직전 단계로 돌아가 증거를 다시 짚습니다."
        },
        {
          "slide": 5,
          "title": "자주 오해",
          "say": "연결은 통로일 뿐, 과도한 권한은 공격 표면을 키웁니다.",
          "do": "오해 → 교정 순으로 보여주고 판단 보드(결정 카드)를 노출합니다.",
          "ask": "이 오해대로 하면 무엇이 부족해질까요?",
          "expected": "부족한 증거·위험",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "실패 사례 한 장을 제시해 차이를 보여줍니다."
        },
        {
          "slide": 6,
          "title": "예상 질문",
          "say": "외부 문서 지시를 따라도 되나요? → 외부 입력은 불신, 검증 후에만 따릅니다.",
          "do": "수강생 실제 사례 1건을 받아 즉석에서 기준으로 분류합니다.",
          "ask": "지금 진행 중인 작업 한 건을 말해줄 수 있나요?",
          "expected": "실제 사례 1건",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "사례가 없으면 예시 작업으로 대신 분류합니다."
        },
        {
          "slide": 7,
          "title": "실습 브리프",
          "say": "범위 · 읽기/쓰기 · 승인/감사 · 인젝션 방어",
          "do": "빈 양식과 예시 1행을 보여주고 즉시 작성하게 합니다.",
          "ask": "당신 작업의 완료 증거는 무엇인가요?",
          "expected": "완료 증거 1문장",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "예시 양식을 함께 한 줄 채워 시작점을 만듭니다."
        },
        {
          "slide": 8,
          "title": "실패 재현",
          "say": "과도한 권한과 외부 페이지의 숨은 지시로 의도치 않은 쓰기가 발생함",
          "do": "broken 상태를 실행해 로그(write scope: /** ; indirect prompt injection from external doc)를 보여주고 증상을 고정합니다.",
          "ask": "이 증상의 원인은 어디일까요?",
          "expected": "원인 가설 1개",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "로그의 첫 오류 줄을 함께 읽고 가설을 좁힙니다."
        },
        {
          "slide": 9,
          "title": "복구 기준",
          "say": "권한 범위를 좁히고 승인 게이트·감사를 추가하며 외부=불신 입력으로 처리",
          "do": "complete 상태로 복구 과정을 보여주고 재현 가능한 기준을 남깁니다.",
          "ask": "무엇을 바꿔야 다시 정상이 될까요?",
          "expected": "복구 한 단계",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "직전 정상 상태와 현재 diff를 비교해 범위를 좁힙니다."
        },
        {
          "slide": 10,
          "title": "공식자료 확인",
          "say": "수업 전 mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 재확인합니다.",
          "do": "🔄 공식 문서의 메뉴명·요금·베타·UI 변경을 확인합니다.",
          "ask": "최근 바뀐 용어나 화면이 있었나요?",
          "expected": "변경 여부 확인",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "확실치 않으면 공식 문서 링크를 함께 엽니다."
        },
        {
          "slide": 11,
          "title": "실습 타이머",
          "say": "실제 연결 1건을 골라 서버·기능 범위, 읽기/쓰기 권한, 승인·감사, 인젝션 방어를 권한 설계표로 작성하고 두 도구 정책을 맞춥니다.",
          "do": "40분 동안 작은 범위를 끝까지 진행하고 중간에 결과를 저장하게 합니다.",
          "ask": "막힌 사람은 현재 상태와 다음 한 단계를 말해줄 수 있나요?",
          "expected": "현재 상태 + 다음 한 단계",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "결과 추가 대신 완료 기준을 다시 설명하게 합니다."
        },
        {
          "slide": 12,
          "title": "리뷰",
          "say": "산출물: 권한 설계표(범위·읽기/쓰기) · 승인 게이트·감사 설정 · 인젝션 방어 체크 · 과권한 발생 시 복구 기준",
          "do": "산출물을 직접 실행·확인하고 검증 기록을 남깁니다.",
          "ask": "사람이 판단한 부분과 AI 결과를 검증한 근거는 무엇인가요?",
          "expected": "판단·검증 근거",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "하나의 산출물을 함께 실행해 확인합니다."
        },
        {
          "slide": 13,
          "title": "다음 회차",
          "say": "작업을 병렬로 나누되 소유권이 겹치지 않게 합니다.",
          "do": "다음 회차로 이어지는 한 문장을 예고하고 산출물을 보존하게 합니다.",
          "ask": "다음 수업 전 준비할 한 가지는 무엇인가요?",
          "expected": "준비 행동 1개",
          "deepDive": "S4는 MCP 설치·연결 절차를 반복하지 않습니다. 강사는 외부 능력을 최소 권한·승인·감사로 연결하는 판단과, 같은 정책을 Claude MCP와 Codex Connectors 양쪽에 적용하는 법, 간접 인젝션 방어를 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "mcp-architecture, mcp-security, claude-mcp, owasp-llm-top10 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "구체적인 준비 예시 하나를 제시합니다."
        }
      ]
    },
    {
      "title": "Agent·SubAgent·Worktree 병렬",
      "subtitle": "서브에이전트 기능 사용법이 아니라, 두 도구의 병렬 작업을 소유권으로 설계",
      "module": "S5 · PARALLEL AGENTS",
      "objective": "작업을 병렬 단위로 분해해 Claude 서브에이전트와 Codex worktree에서 동시에 진행하되, 소유권이 겹치지 않게 하고 리뷰 게이트로만 병합합니다.",
      "duration": "120분",
      "flow": [
        "진단 10분",
        "공식 개념·시각화 35분",
        "병렬 작업 시연 20분",
        "분해·소유권 실습 40분",
        "복구·리뷰 15분"
      ],
      "concepts": [
        [
          "작업 분해",
          "병렬로 진행 가능한 독립 단위로 작업을 나눕니다."
        ],
        [
          "소유권 분리",
          "한 파일·결정에 소유자가 겹치지 않게 합니다."
        ],
        [
          "병렬 실행",
          "Claude 서브에이전트와 Codex worktree로 동시에 진행합니다."
        ],
        [
          "리뷰 게이트",
          "검토된 변경만 병합해 충돌과 중복을 막습니다."
        ]
      ],
      "sequence": [
        "병렬 가능한 단위로 분해",
        "단위별 소유권 지정",
        "서브에이전트·worktree로 병렬 실행",
        "충돌·중복 소유 확인",
        "리뷰 게이트로 병합"
      ],
      "demo": {
        "type": "agent-parallel",
        "sceneId": "s-05-agent",
        "manual": true,
        "title": "작업을 두 도구에서 병렬로 나누되 소유권을 분리합니다",
        "stages": [
          "작업 분해",
          "소유권",
          "병렬 실행",
          "리뷰 게이트",
          "병합"
        ]
      },
      "compare": {
        "bad": [
          "작업을 나누되 소유권을 정하지 않음",
          "여러 작업자가 같은 파일을 동시에 수정",
          "검토 없이 바로 병합"
        ],
        "good": [
          "독립 단위로 분해하고 소유권을 분리",
          "서브에이전트·worktree로 격리 실행",
          "리뷰 게이트로 검토 후 병합"
        ]
      },
      "decisions": [
        [
          "에이전트를 많이 띄울수록 빠르다",
          "아님",
          "비용이 크고 공유 맥락이 필요한 작업엔 부적합합니다."
        ],
        [
          "단위별 소유권을 먼저 분리한다",
          "좋음",
          "소유권이 겹치지 않으면 충돌이 줄어듭니다."
        ],
        [
          "병합 전 리뷰 게이트를 둔다",
          "필수",
          "검증되지 않은 병렬 결과를 바로 합치면 위험합니다."
        ]
      ],
      "error": {
        "symptom": "두 작업자가 같은 파일을 고쳐 머지 충돌과 소유권 중복이 발생함",
        "trace": "merge conflict / owner duplicated",
        "cause": "작업을 분해할 때 소유권을 분리하지 않음",
        "fix": "단위별 소유권을 분리하고 리뷰 게이트로 병합 순서를 고정"
      },
      "practice": "실제 작업 1건을 병렬 단위로 분해해 소유권 맵을 만들고, 서브에이전트·worktree 분담과 리뷰 게이트 병합 순서를 설계합니다.",
      "deliverables": [
        "작업 분해·소유권 맵",
        "병렬 분담 계획",
        "리뷰 게이트·병합 순서",
        "충돌 발생 시 복구 기준"
      ],
      "sources": [
        "anthropic-eng-multiagent",
        "claude-subagents",
        "openai-agents-sdk",
        "anthropic-eng-agents"
      ],
      "sourceKeys": [
        "anthropic-eng-multiagent",
        "claude-subagents",
        "openai-agents-sdk",
        "anthropic-eng-agents"
      ],
      "pathway": null,
      "professional": {
        "level": "AI 심화 통합과정 S5 강사용 연구노트",
        "focus": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
        "officialStudy": [
          "Anthropic · Multi-agent에서 오케스트레이터-워커 구조와 비용·공유 맥락 한계를 확인합니다.",
          "Anthropic · Claude Code Subagents에서 서브에이전트 분담과 리뷰 게이트를 확인합니다.",
          "OpenAI · Agents SDK에서 worktree 병렬과 에이전트 운영을 확인하고 Claude와 대응을 정리합니다.",
          "Anthropic · Building effective agents에서 정지조건과 자율 작업의 안전을 확인합니다."
        ],
        "visualSimulation": "병렬 에이전트 룸 장면을 사용합니다. 발표자는 작업 분해 → 소유권 → 병렬 실행 → 리뷰 게이트 → 병합을 수동으로 넘기며 소유권이 겹치지 않게 정리되는 과정을 보여줍니다.",
        "demoRun": [
          "작업을 병렬 가능한 독립 단위로 분해합니다.",
          "단위별 소유권을 분리해 겹치지 않게 합니다.",
          "Claude 서브에이전트와 Codex worktree로 병렬 실행합니다.",
          "충돌·중복 소유를 확인합니다.",
          "리뷰 게이트를 통과한 변경만 병합합니다."
        ],
        "failureDrill": [
          "소유권 분리 없이 같은 파일을 수정해 머지 충돌을 보여줍니다.",
          "소유권 중복을 문제 원인으로 분류합니다.",
          "소유권 분리와 리뷰 게이트 병합 순서로 복구합니다."
        ],
        "exercise": "작업 1건을 병렬 단위로 분해하고 소유권 맵과 리뷰 게이트 병합 순서를 작성합니다.",
        "misconceptions": [
          [
            "에이전트가 많을수록 빠르다",
            "비용이 크고 공유 맥락 작업엔 부적합합니다."
          ],
          [
            "병렬 결과는 바로 합치면 된다",
            "리뷰 게이트로 검증 후 병합해야 합니다."
          ]
        ],
        "expertQuestions": [
          [
            "언제 병렬 작업이 유리한가요?",
            "넓게 독립적이고 공유 맥락이 적은 작업입니다. 코드처럼 맥락 공유가 큰 작업은 신중해야 합니다."
          ],
          [
            "소유권은 무엇 기준으로 나누나요?",
            "파일·결정·리뷰·마감 단위로 한 소유자만 두어 충돌과 중복을 막습니다."
          ]
        ],
        "studyPath": [
          "Multi-agent에서 오케스트레이터-워커와 비용 확인",
          "Subagents·worktree의 격리·병합 방식 비교",
          "소유권 맵과 리뷰 게이트 형식 정리",
          "C5/O5(기능)와 S5(크로스툴 병렬 설계)의 경계 정리",
          "수업 전 관련 공식 용어와 UI 변경 재확인"
        ],
        "slideUpgrade": [
          "표지는 추상 이미지보다 병렬 작업선이 합쳐지는 다큐멘터리 톤으로 유지",
          "핵심 개념은 카드보다 분해·소유권·병합 배지를 나란히 배치",
          "대표 장면은 수동 5버튼으로 병렬·병합을 한 단계씩",
          "오해 슬라이드는 에이전트 수 경쟁이 아니라 소유권·비용 문제로 정리",
          "실습 슬라이드는 소유권 맵을 빈 양식으로 보여주고 즉시 작성하게 설계"
        ],
        "motionStoryboard": [
          "Idle: 작업 블록은 낮은 opacity로 대기하고 자동 진행하지 않습니다.",
          "Focus: 현재 단계 블록만 밝아지고 나머지는 배경으로 물러납니다.",
          "Owner: 소유권 단계에서 단위별 소유자 배지가 채워집니다.",
          "Conflict: 충돌 시 amber 경고선과 중복 소유 표시가 켜집니다.",
          "Merge: 마지막 단계에서 리뷰 게이트를 지나 teal 병합 라인이 연결됩니다."
        ],
        "realWorldAssets": [
          "작업 분해·소유권 맵 샘플",
          "서브에이전트·worktree 분담 캡처",
          "리뷰 게이트 병합 순서 표",
          "머지 충돌·소유권 중복 캡처",
          "소유권 분리 복구 캡처"
        ],
        "rehearsalChecklist": [
          "5버튼 수동 진행으로 각 단계를 멈춰 설명",
          "C5/O5 기능 재교육으로 흐르지 않는지 확인",
          "각 단계에서 정리되는 소유권을 한 문장으로 말하기",
          "1280x720에서 배지·캡션이 잘리지 않는지 확인",
          "수업 전 공식 문서와 도구 UI 변경 여부 재확인"
        ]
      },
      "revision": "3.0.0-beta.3",
      "status": "review",
      "visualScene": {
        "id": "s-05-agent",
        "type": "agent-parallel",
        "alias": "workflow-04-agent",
        "title": "병렬 에이전트 룸",
        "layout": "parallel-agent-room",
        "normalFlow": [
          "작업 분해",
          "소유권 분리",
          "병렬 실행",
          "리뷰 게이트",
          "병합"
        ],
        "failureFlow": [
          "merge conflict",
          "owner duplicated",
          "소유권 재설계"
        ],
        "recoveryFlow": [
          "단위별 소유권 분리",
          "리뷰 게이트 순서 고정",
          "검증 후 병합"
        ],
        "steps": [
          {
            "label": "SPLIT",
            "title": "병렬 가능한 단위로 분해",
            "detail": "독립적으로 진행 가능한 단위로 작업을 나눕니다."
          },
          {
            "label": "OWNER",
            "title": "단위별 소유권 지정",
            "detail": "한 파일·결정에 소유자가 겹치지 않게 합니다."
          },
          {
            "label": "PARALLEL",
            "title": "서브에이전트·worktree 병렬",
            "detail": "Claude 서브에이전트와 Codex worktree로 격리 실행합니다."
          },
          {
            "label": "GATE",
            "title": "리뷰 게이트 통과",
            "detail": "검토되지 않은 변경은 병합하지 않습니다."
          },
          {
            "label": "MERGE",
            "title": "검증된 변경 병합",
            "detail": "충돌·중복 소유를 정리한 뒤 순서대로 병합합니다."
          }
        ]
      },
      "interactions": {
        "controls": [
          "start",
          "previous",
          "next",
          "pause",
          "reset"
        ],
        "predictionPrompt": "다음 단계에서 소유권이 어떻게 정리되고 어떤 충돌이 차단될지 먼저 말한 뒤 진행",
        "decisionCards": 3,
        "manualOnly": true
      },
      "assets": {
        "fallbackImage": "assets/v3/fallbacks/advanced-05.png",
        "sceneId": "s-05-agent",
        "keyvisuals": [
          "assets/v3/keyvisuals/s/05/cover.png",
          "assets/v3/keyvisuals/s/05/metaphor.png",
          "assets/v3/keyvisuals/s/05/next.png"
        ],
        "captures": [
          "assets/v3/captures/s/05/owner-map.png",
          "assets/v3/captures/s/05/parallel.png",
          "assets/v3/captures/s/05/review-gate.png"
        ]
      },
      "demoProject": {
        "root": "v3/projects/advanced/05",
        "starter": "v3/projects/advanced/05/starter",
        "broken": "v3/projects/advanced/05/broken",
        "complete": "v3/projects/advanced/05/complete",
        "manifest": "v3/projects/advanced/05/lab.json"
      },
      "fallbackMedia": {
        "image": "assets/v3/fallbacks/advanced-05.png",
        "slide": "v3/deck.html?course=advanced&lesson=5&slide=4&motion=low"
      },
      "studentMaterials": [
        "workbook",
        "commands",
        "examples",
        "errors",
        "assessment",
        "practice"
      ],
      "instructorMaterials": [
        "script",
        "source-study",
        "demo-runbook",
        "deep-dive",
        "qa-bank",
        "fallback",
        "rehearsal"
      ],
      "slides": [
        {
          "slot": "cover",
          "kind": "img",
          "tag": "IMG",
          "title": "병렬은 소유권으로 설계한다",
          "screenText": "동시에 진행하되, 누가 무엇을 소유하는지 먼저 나눕니다.",
          "presenterNote": "오늘은 서브에이전트 기능이 아니라 분해·소유권·병합 판단을 다룬다고 안내합니다.",
          "asset": "assets/v3/keyvisuals/s/05/cover.png"
        },
        {
          "slot": "metaphor",
          "kind": "img",
          "tag": "IMG",
          "title": "주방 스테이션처럼",
          "screenText": "한 요리를 여럿이 만들 때 각자 맡은 스테이션이 겹치면 안 됩니다.",
          "presenterNote": "소유권 분리를 주방 분업으로 직관화합니다.",
          "asset": "assets/v3/keyvisuals/s/05/metaphor.png"
        },
        {
          "slot": "concept",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "병렬 작업 4요소",
          "screenText": "분해 · 소유권 · 병렬 실행 · 리뷰 게이트",
          "presenterNote": "네 요소가 Claude와 Codex에서 같게 적용돼야 함을 강조합니다.",
          "captures": [
            "assets/v3/captures/s/05/owner-map.png",
            "assets/v3/captures/s/05/parallel.png",
            "assets/v3/captures/s/05/review-gate.png"
          ]
        },
        {
          "slot": "representative",
          "kind": "scene",
          "tag": "SCENE",
          "title": "병렬 에이전트 룸",
          "screenText": "작업을 한 단계씩 병렬로 나누고 병합합니다.",
          "presenterNote": "자동 진행 없이 시작과 다음 버튼으로 소유권과 병합을 정리합니다.",
          "sceneId": "s-05-agent"
        },
        {
          "slot": "pitfall",
          "kind": "text",
          "tag": "TEXT",
          "title": "오해: 에이전트가 많을수록 빠르다",
          "screenText": "비용이 크고, 공유 맥락이 필요한 작업엔 부적합합니다.",
          "presenterNote": "수강생이 병렬 수가 아니라 소유권·비용으로 판단하게 합니다."
        },
        {
          "slot": "qa",
          "kind": "text",
          "tag": "TEXT",
          "title": "현장 질문",
          "screenText": "병렬 결과는 바로 합치나요? → 리뷰 게이트로 검증 후 순서대로 병합합니다.",
          "presenterNote": "질문을 속도에서 소유권·검증으로 바꿔 대답합니다."
        },
        {
          "slot": "lab",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "소유권 맵 작성 실습",
          "screenText": "분해 단위 · 소유자 · 병렬 도구 · 병합 순서",
          "presenterNote": "수강생 각자 실제 작업 한 건의 소유권 맵을 작성하게 합니다.",
          "captures": [
            "assets/v3/captures/s/05/owner-map.png"
          ]
        },
        {
          "slot": "summary",
          "kind": "text",
          "tag": "TEXT",
          "title": "오늘의 한 문장",
          "screenText": "소유권을 먼저 나누고, 리뷰 게이트를 통과한 변경만 병합합니다.",
          "presenterNote": "C5/O5 기능과 겹치지 않게 병렬 설계 기준만 요약합니다."
        },
        {
          "slot": "next",
          "kind": "img",
          "tag": "IMG",
          "title": "다음: 오케스트레이션 실전",
          "screenText": "결정적 뼈대에 에이전틱을 더해 하나의 흐름으로 굴립니다.",
          "presenterNote": "S6는 자동화 기능이 아니라 크로스툴 오케스트레이션 흐름 설계로 이어집니다.",
          "asset": "assets/v3/keyvisuals/s/05/next.png"
        }
      ],
      "scriptSlides": [
        {
          "slide": 1,
          "title": "표지",
          "say": "동시에 진행하되, 누가 무엇을 소유하는지 먼저 나눕니다.",
          "do": "표지 히어로만 띄우고 길게 설명하지 않습니다. 오늘의 한 문장만 예고합니다.",
          "ask": "오늘 주제와 관련해 최근 겪은 상황이 있나요?",
          "expected": "본인 경험 1~2개",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "응답이 없으면 구체적인 예시 하나를 제시하고 다시 질문합니다."
        },
        {
          "slide": 2,
          "title": "은유",
          "say": "한 요리를 여럿이 만들 때 각자 맡은 스테이션이 겹치면 안 됩니다.",
          "do": "은유 키비주얼로 직관화하고 도구 우열 논쟁으로 흐르지 않게 합니다.",
          "ask": "이 비유에서 무엇을 기준으로 판단해야 할까요?",
          "expected": "작업 성격·필요 증거 같은 기준",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "비유의 한 지점만 짚고 다음으로 넘어갑니다."
        },
        {
          "slide": 3,
          "title": "핵심 개념",
          "say": "분해 · 소유권 · 병렬 실행 · 리뷰 게이트",
          "do": "개념/캡처 패널을 한 요소씩 공개하고 시선을 한 지점에 고정합니다.",
          "ask": "이 개념이 Claude와 Codex에서 같게 적용되려면 무엇이 필요할까요?",
          "expected": "공유 기준·동기화",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "요소 하나를 실제 화면에 연결해 다시 설명합니다."
        },
        {
          "slide": 4,
          "title": "대표 시연",
          "say": "작업을 한 단계씩 병렬로 나누고 병합합니다.",
          "do": "수동 5버튼으로 한 단계씩 진행하고, 각 단계 전에 결과를 먼저 예측하게 합니다. 자동으로 넘기지 않습니다.",
          "ask": "다음 단계에서 무엇이 달라지고 어떤 증거가 남을까요?",
          "expected": "예측 한 문장",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "애매하면 직전 단계로 돌아가 증거를 다시 짚습니다."
        },
        {
          "slide": 5,
          "title": "자주 오해",
          "say": "비용이 크고, 공유 맥락이 필요한 작업엔 부적합합니다.",
          "do": "오해 → 교정 순으로 보여주고 판단 보드(결정 카드)를 노출합니다.",
          "ask": "이 오해대로 하면 무엇이 부족해질까요?",
          "expected": "부족한 증거·위험",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "실패 사례 한 장을 제시해 차이를 보여줍니다."
        },
        {
          "slide": 6,
          "title": "예상 질문",
          "say": "병렬 결과는 바로 합치나요? → 리뷰 게이트로 검증 후 순서대로 병합합니다.",
          "do": "수강생 실제 사례 1건을 받아 즉석에서 기준으로 분류합니다.",
          "ask": "지금 진행 중인 작업 한 건을 말해줄 수 있나요?",
          "expected": "실제 사례 1건",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "사례가 없으면 예시 작업으로 대신 분류합니다."
        },
        {
          "slide": 7,
          "title": "실습 브리프",
          "say": "분해 단위 · 소유자 · 병렬 도구 · 병합 순서",
          "do": "빈 양식과 예시 1행을 보여주고 즉시 작성하게 합니다.",
          "ask": "당신 작업의 완료 증거는 무엇인가요?",
          "expected": "완료 증거 1문장",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "예시 양식을 함께 한 줄 채워 시작점을 만듭니다."
        },
        {
          "slide": 8,
          "title": "실패 재현",
          "say": "두 작업자가 같은 파일을 고쳐 머지 충돌과 소유권 중복이 발생함",
          "do": "broken 상태를 실행해 로그(merge conflict / owner duplicated)를 보여주고 증상을 고정합니다.",
          "ask": "이 증상의 원인은 어디일까요?",
          "expected": "원인 가설 1개",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "로그의 첫 오류 줄을 함께 읽고 가설을 좁힙니다."
        },
        {
          "slide": 9,
          "title": "복구 기준",
          "say": "단위별 소유권을 분리하고 리뷰 게이트로 병합 순서를 고정",
          "do": "complete 상태로 복구 과정을 보여주고 재현 가능한 기준을 남깁니다.",
          "ask": "무엇을 바꿔야 다시 정상이 될까요?",
          "expected": "복구 한 단계",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "직전 정상 상태와 현재 diff를 비교해 범위를 좁힙니다."
        },
        {
          "slide": 10,
          "title": "공식자료 확인",
          "say": "수업 전 anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 재확인합니다.",
          "do": "🔄 공식 문서의 메뉴명·요금·베타·UI 변경을 확인합니다.",
          "ask": "최근 바뀐 용어나 화면이 있었나요?",
          "expected": "변경 여부 확인",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "확실치 않으면 공식 문서 링크를 함께 엽니다."
        },
        {
          "slide": 11,
          "title": "실습 타이머",
          "say": "실제 작업 1건을 병렬 단위로 분해해 소유권 맵을 만들고, 서브에이전트·worktree 분담과 리뷰 게이트 병합 순서를 설계합니다.",
          "do": "40분 동안 작은 범위를 끝까지 진행하고 중간에 결과를 저장하게 합니다.",
          "ask": "막힌 사람은 현재 상태와 다음 한 단계를 말해줄 수 있나요?",
          "expected": "현재 상태 + 다음 한 단계",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "결과 추가 대신 완료 기준을 다시 설명하게 합니다."
        },
        {
          "slide": 12,
          "title": "리뷰",
          "say": "산출물: 작업 분해·소유권 맵 · 병렬 분담 계획 · 리뷰 게이트·병합 순서 · 충돌 발생 시 복구 기준",
          "do": "산출물을 직접 실행·확인하고 검증 기록을 남깁니다.",
          "ask": "사람이 판단한 부분과 AI 결과를 검증한 근거는 무엇인가요?",
          "expected": "판단·검증 근거",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "하나의 산출물을 함께 실행해 확인합니다."
        },
        {
          "slide": 13,
          "title": "다음 회차",
          "say": "결정적 뼈대에 에이전틱을 더해 하나의 흐름으로 굴립니다.",
          "do": "다음 회차로 이어지는 한 문장을 예고하고 산출물을 보존하게 합니다.",
          "ask": "다음 수업 전 준비할 한 가지는 무엇인가요?",
          "expected": "준비 행동 1개",
          "deepDive": "S5는 서브에이전트·worktree 기능 사용법을 반복하지 않습니다. 강사는 작업을 병렬 단위로 분해하고 소유권을 분리하는 판단, 비용 의식, 리뷰 게이트 병합을 두 도구에 동일하게 적용하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, claude-subagents, openai-agents-sdk, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "구체적인 준비 예시 하나를 제시합니다."
        }
      ]
    },
    {
      "title": "오케스트레이션 실전",
      "subtitle": "자동화 기능 사용법이 아니라, 결정적 뼈대 + 에이전틱을 하나의 흐름으로",
      "module": "S6 · ORCHESTRATION",
      "objective": "결정적 워크플로 뼈대에 에이전틱 보강을 더해 Claude·Codex 작업을 하나의 흐름으로 굴리고, 도구 간 핸드오프와 정지조건·복구를 설계합니다.",
      "duration": "120분",
      "flow": [
        "진단 10분",
        "공식 개념·시각화 35분",
        "파이프라인 시연 20분",
        "흐름 설계 실습 40분",
        "복구·리뷰 15분"
      ],
      "concepts": [
        [
          "트리거",
          "이벤트·일정으로 파이프라인을 시작합니다."
        ],
        [
          "결정적 단계",
          "계획→빌드→검증을 결정적 뼈대로 고정합니다."
        ],
        [
          "핸드오프",
          "도구 간 컨텍스트·산출물을 명확히 인수인계합니다."
        ],
        [
          "정지·복구",
          "정지조건과 복구 경로를 함께 설계합니다."
        ]
      ],
      "sequence": [
        "트리거·범위 정의",
        "결정적 단계 뼈대 구성",
        "막히는 곳만 에이전틱 보강",
        "도구 간 핸드오프 설계",
        "정지조건·복구 경로 확정"
      ],
      "demo": {
        "type": "orchestration",
        "sceneId": "s-06-orchestration",
        "manual": true,
        "title": "두 도구 작업을 하나의 오케스트레이션 흐름으로 설계합니다",
        "stages": [
          "트리거",
          "결정적 단계",
          "핸드오프",
          "정지·복구",
          "흐름 통합"
        ]
      },
      "compare": {
        "bad": [
          "전부 에이전틱으로 두고 정지조건 없음",
          "도구 간 핸드오프를 말로만 전달",
          "실패가 전체로 번지게 방치"
        ],
        "good": [
          "결정적 뼈대 + 막히는 곳만 에이전틱",
          "핸드오프 산출물·형식을 명시",
          "정지조건과 복구 경로를 함께 설계"
        ]
      },
      "decisions": [
        [
          "최신이니 전부 에이전트로 만든다",
          "아님",
          "대부분은 결정적 워크플로가 싸고 안정적입니다."
        ],
        [
          "정지조건과 예산을 먼저 정한다",
          "좋음",
          "무한 반복과 비용 폭주를 막습니다."
        ],
        [
          "핸드오프 산출물 형식을 고정한다",
          "필수",
          "도구 간 인수인계가 불명확하면 중복·누락이 생깁니다."
        ]
      ],
      "error": {
        "symptom": "한 단계 실패가 전체로 번지고 무한 반복·중복 작업이 발생함",
        "trace": "no stop condition; runaway loop / duplicated work across tools",
        "cause": "정지조건 없이 에이전틱을 남용하고 핸드오프가 불명확함",
        "fix": "결정적 뼈대로 단계를 고정하고 정지조건·핸드오프·복구를 명시"
      },
      "practice": "실제 반복 업무 1건을 골라 트리거·결정적 단계·핸드오프·정지조건·복구를 흐름도로 설계하고 결정적/에이전틱 경계를 표시합니다.",
      "deliverables": [
        "오케스트레이션 흐름도",
        "결정적/에이전틱 경계 표시",
        "핸드오프 산출물 형식",
        "정지조건·복구 경로"
      ],
      "sources": [
        "anthropic-eng-multiagent",
        "anthropic-eng-agents",
        "github-actions",
        "openai-agents-sdk"
      ],
      "sourceKeys": [
        "anthropic-eng-multiagent",
        "anthropic-eng-agents",
        "github-actions",
        "openai-agents-sdk"
      ],
      "pathway": null,
      "professional": {
        "level": "AI 심화 통합과정 S6 강사용 연구노트",
        "focus": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
        "officialStudy": [
          "Anthropic · Multi-agent에서 오케스트레이터-워커와 신뢰성·비용을 확인합니다.",
          "Anthropic · Building effective agents에서 워크플로 vs 에이전트와 정지조건을 확인합니다.",
          "GitHub · GitHub Actions에서 이벤트 트리거와 결정적 단계 검증을 확인합니다.",
          "OpenAI · Agents SDK에서 에이전트 운영과 복구 패턴을 확인합니다."
        ],
        "visualSimulation": "오케스트레이션 컨트롤 장면을 사용합니다. 발표자는 트리거 → 결정적 단계 → 핸드오프 → 정지·복구 → 흐름 통합을 수동으로 넘기며 하나의 흐름이 완성되는 과정을 보여줍니다.",
        "demoRun": [
          "트리거와 범위를 먼저 정의합니다.",
          "계획→빌드→검증을 결정적 단계로 고정합니다.",
          "막히는 곳만 에이전틱으로 보강합니다.",
          "도구 간 핸드오프 산출물과 형식을 명시합니다.",
          "정지조건과 복구 경로로 흐름을 마감합니다."
        ],
        "failureDrill": [
          "정지조건 없는 에이전틱으로 무한 반복·중복 작업을 보여줍니다.",
          "정지조건 부재와 불명확한 핸드오프를 원인으로 분류합니다.",
          "결정적 뼈대·정지조건·핸드오프로 복구합니다."
        ],
        "exercise": "반복 업무 1건의 오케스트레이션 흐름도를 작성하고 결정적/에이전틱 경계와 정지조건을 표시합니다.",
        "misconceptions": [
          [
            "전부 에이전트가 더 똑똑하다",
            "대부분은 결정적 워크플로가 싸고 안정적입니다."
          ],
          [
            "핸드오프는 말로 전달하면 된다",
            "산출물과 형식을 고정해야 중복·누락이 없습니다."
          ]
        ],
        "expertQuestions": [
          [
            "어디까지 결정적으로 두나요?",
            "잘 정의된 반복은 결정적으로, 예측이 어려운 지점만 에이전틱으로 둡니다."
          ],
          [
            "끝없이 도는 작업은?",
            "반복·시간·토큰 한도 같은 정지조건과 복구 경로를 먼저 설계합니다."
          ]
        ],
        "studyPath": [
          "Building effective agents에서 워크플로/에이전트 경계 확인",
          "Multi-agent에서 신뢰성·비용·복구 확인",
          "Actions의 트리거·검증으로 결정적 뼈대 이해",
          "C6/O6(기능)와 S6(크로스툴 흐름 설계)의 경계 정리",
          "수업 전 관련 공식 용어와 UI 변경 재확인"
        ],
        "slideUpgrade": [
          "표지는 추상 이미지보다 결정적 뼈대 위에 에이전틱이 얹힌 다큐멘터리 톤으로 유지",
          "핵심 개념은 카드보다 트리거·단계·핸드오프·정지 배지를 나란히 배치",
          "대표 장면은 수동 5버튼으로 흐름을 한 단계씩",
          "오해 슬라이드는 에이전트 만능이 아니라 결정적/에이전틱 경계로 정리",
          "실습 슬라이드는 흐름도를 빈 양식으로 보여주고 즉시 작성하게 설계"
        ],
        "motionStoryboard": [
          "Idle: 흐름 블록은 낮은 opacity로 대기하고 자동 진행하지 않습니다.",
          "Focus: 현재 단계 블록만 밝아지고 나머지는 배경으로 물러납니다.",
          "Stage: 결정적 단계에서 계획·빌드·검증 배지가 순서대로 채워집니다.",
          "Stop: 정지·복구 단계에서 정지조건 배지와 복구 경로가 켜집니다.",
          "Flow: 마지막 단계에서 두 도구 파이프라인을 잇는 teal 흐름 라인이 연결됩니다."
        ],
        "realWorldAssets": [
          "오케스트레이션 흐름도 샘플",
          "결정적/에이전틱 경계 표",
          "핸드오프 산출물 형식 샘플",
          "무한 반복·중복 작업 캡처",
          "정지조건·복구 적용 캡처"
        ],
        "rehearsalChecklist": [
          "5버튼 수동 진행으로 각 단계를 멈춰 설명",
          "C6/O6 기능 재교육으로 흐르지 않는지 확인",
          "각 단계에서 완성되는 흐름을 한 문장으로 말하기",
          "1280x720에서 배지·캡션이 잘리지 않는지 확인",
          "수업 전 공식 문서와 도구 UI 변경 여부 재확인"
        ]
      },
      "revision": "3.0.0-beta.3",
      "status": "review",
      "visualScene": {
        "id": "s-06-orchestration",
        "type": "orchestration",
        "alias": "workflow-04-agent",
        "title": "오케스트레이션 컨트롤",
        "layout": "orchestration-control",
        "normalFlow": [
          "트리거 정의",
          "결정적 단계",
          "핸드오프",
          "정지·복구",
          "흐름 통합"
        ],
        "failureFlow": [
          "no stop condition",
          "runaway loop",
          "흐름 재설계"
        ],
        "recoveryFlow": [
          "결정적 단계 고정",
          "정지조건 명시",
          "핸드오프·복구 정의"
        ],
        "steps": [
          {
            "label": "TRIGGER",
            "title": "트리거·범위 정의",
            "detail": "이벤트·일정으로 시작하고 범위를 먼저 정합니다."
          },
          {
            "label": "STAGES",
            "title": "결정적 단계 뼈대",
            "detail": "계획→빌드→검증을 결정적 단계로 고정합니다."
          },
          {
            "label": "HANDOFF",
            "title": "도구 간 핸드오프",
            "detail": "컨텍스트·산출물 형식을 명시해 인수인계합니다."
          },
          {
            "label": "STOP",
            "title": "정지조건·복구",
            "detail": "반복·시간·토큰 한도와 복구 경로를 설계합니다."
          },
          {
            "label": "SYNC",
            "title": "두 도구 흐름 통합",
            "detail": "Claude·Codex 파이프라인을 하나의 흐름으로 맞춥니다."
          }
        ]
      },
      "interactions": {
        "controls": [
          "start",
          "previous",
          "next",
          "pause",
          "reset"
        ],
        "predictionPrompt": "다음 단계에서 흐름이 어떻게 이어지고 어떤 폭주가 차단될지 먼저 말한 뒤 진행",
        "decisionCards": 3,
        "manualOnly": true
      },
      "assets": {
        "fallbackImage": "assets/v3/fallbacks/advanced-06.png",
        "sceneId": "s-06-orchestration",
        "keyvisuals": [
          "assets/v3/keyvisuals/s/06/cover.png",
          "assets/v3/keyvisuals/s/06/metaphor.png",
          "assets/v3/keyvisuals/s/06/next.png"
        ],
        "captures": [
          "assets/v3/captures/s/06/flow.png",
          "assets/v3/captures/s/06/handoff.png",
          "assets/v3/captures/s/06/stop.png"
        ]
      },
      "demoProject": {
        "root": "v3/projects/advanced/06",
        "starter": "v3/projects/advanced/06/starter",
        "broken": "v3/projects/advanced/06/broken",
        "complete": "v3/projects/advanced/06/complete",
        "manifest": "v3/projects/advanced/06/lab.json"
      },
      "fallbackMedia": {
        "image": "assets/v3/fallbacks/advanced-06.png",
        "slide": "v3/deck.html?course=advanced&lesson=6&slide=4&motion=low"
      },
      "studentMaterials": [
        "workbook",
        "commands",
        "examples",
        "errors",
        "assessment",
        "practice"
      ],
      "instructorMaterials": [
        "script",
        "source-study",
        "demo-runbook",
        "deep-dive",
        "qa-bank",
        "fallback",
        "rehearsal"
      ],
      "slides": [
        {
          "slot": "cover",
          "kind": "img",
          "tag": "IMG",
          "title": "흐름은 뼈대 위에 얹는다",
          "screenText": "전부 자동이 아니라, 결정적 뼈대에 에이전틱을 더합니다.",
          "presenterNote": "오늘은 자동화 기능이 아니라 흐름 설계 판단을 다룬다고 안내합니다.",
          "asset": "assets/v3/keyvisuals/s/06/cover.png"
        },
        {
          "slot": "metaphor",
          "kind": "img",
          "tag": "IMG",
          "title": "조립 라인과 검수원",
          "screenText": "컨베이어(결정적)에 필요한 곳만 사람이 판단(에이전틱)합니다.",
          "presenterNote": "결정적/에이전틱 경계를 조립 라인으로 직관화합니다.",
          "asset": "assets/v3/keyvisuals/s/06/metaphor.png"
        },
        {
          "slot": "concept",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "오케스트레이션 4요소",
          "screenText": "트리거 · 결정적 단계 · 핸드오프 · 정지/복구",
          "presenterNote": "네 요소가 Claude와 Codex에서 하나의 흐름으로 묶임을 강조합니다.",
          "captures": [
            "assets/v3/captures/s/06/flow.png",
            "assets/v3/captures/s/06/handoff.png",
            "assets/v3/captures/s/06/stop.png"
          ]
        },
        {
          "slot": "representative",
          "kind": "scene",
          "tag": "SCENE",
          "title": "오케스트레이션 컨트롤",
          "screenText": "두 도구 작업을 한 단계씩 하나의 흐름으로 묶습니다.",
          "presenterNote": "자동 진행 없이 시작과 다음 버튼으로 흐름을 완성합니다.",
          "sceneId": "s-06-orchestration"
        },
        {
          "slot": "pitfall",
          "kind": "text",
          "tag": "TEXT",
          "title": "오해: 전부 에이전트가 낫다",
          "screenText": "대부분은 결정적 워크플로가 싸고 안정적입니다.",
          "presenterNote": "유행이 아니라 결정적/에이전틱 경계로 판단하게 합니다."
        },
        {
          "slot": "qa",
          "kind": "text",
          "tag": "TEXT",
          "title": "현장 질문",
          "screenText": "끝없이 도는데요? → 반복·시간·토큰 한도 같은 정지조건을 먼저 둡니다.",
          "presenterNote": "질문을 기능에서 정지조건·복구로 바꿔 대답합니다."
        },
        {
          "slot": "lab",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "흐름도 작성 실습",
          "screenText": "트리거 · 결정적 단계 · 핸드오프 · 정지/복구",
          "presenterNote": "수강생 각자 반복 업무 한 건의 흐름도를 작성하게 합니다.",
          "captures": [
            "assets/v3/captures/s/06/flow.png"
          ]
        },
        {
          "slot": "summary",
          "kind": "text",
          "tag": "TEXT",
          "title": "오늘의 한 문장",
          "screenText": "결정적 뼈대에 에이전틱을 더하고, 정지조건·핸드오프·복구를 명시합니다.",
          "presenterNote": "C6/O6 기능과 겹치지 않게 흐름 설계 기준만 요약합니다."
        },
        {
          "slot": "next",
          "kind": "img",
          "tag": "IMG",
          "title": "다음: 평가·신뢰성·운영",
          "screenText": "흐름이 신뢰할 만한지 측정하고 비용을 관리합니다.",
          "presenterNote": "S7은 종이 운영안이 아니라 측정 가능한 신뢰성 설계로 이어집니다.",
          "asset": "assets/v3/keyvisuals/s/06/next.png"
        }
      ],
      "scriptSlides": [
        {
          "slide": 1,
          "title": "표지",
          "say": "전부 자동이 아니라, 결정적 뼈대에 에이전틱을 더합니다.",
          "do": "표지 히어로만 띄우고 길게 설명하지 않습니다. 오늘의 한 문장만 예고합니다.",
          "ask": "오늘 주제와 관련해 최근 겪은 상황이 있나요?",
          "expected": "본인 경험 1~2개",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "응답이 없으면 구체적인 예시 하나를 제시하고 다시 질문합니다."
        },
        {
          "slide": 2,
          "title": "은유",
          "say": "컨베이어(결정적)에 필요한 곳만 사람이 판단(에이전틱)합니다.",
          "do": "은유 키비주얼로 직관화하고 도구 우열 논쟁으로 흐르지 않게 합니다.",
          "ask": "이 비유에서 무엇을 기준으로 판단해야 할까요?",
          "expected": "작업 성격·필요 증거 같은 기준",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "비유의 한 지점만 짚고 다음으로 넘어갑니다."
        },
        {
          "slide": 3,
          "title": "핵심 개념",
          "say": "트리거 · 결정적 단계 · 핸드오프 · 정지/복구",
          "do": "개념/캡처 패널을 한 요소씩 공개하고 시선을 한 지점에 고정합니다.",
          "ask": "이 개념이 Claude와 Codex에서 같게 적용되려면 무엇이 필요할까요?",
          "expected": "공유 기준·동기화",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "요소 하나를 실제 화면에 연결해 다시 설명합니다."
        },
        {
          "slide": 4,
          "title": "대표 시연",
          "say": "두 도구 작업을 한 단계씩 하나의 흐름으로 묶습니다.",
          "do": "수동 5버튼으로 한 단계씩 진행하고, 각 단계 전에 결과를 먼저 예측하게 합니다. 자동으로 넘기지 않습니다.",
          "ask": "다음 단계에서 무엇이 달라지고 어떤 증거가 남을까요?",
          "expected": "예측 한 문장",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "애매하면 직전 단계로 돌아가 증거를 다시 짚습니다."
        },
        {
          "slide": 5,
          "title": "자주 오해",
          "say": "대부분은 결정적 워크플로가 싸고 안정적입니다.",
          "do": "오해 → 교정 순으로 보여주고 판단 보드(결정 카드)를 노출합니다.",
          "ask": "이 오해대로 하면 무엇이 부족해질까요?",
          "expected": "부족한 증거·위험",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "실패 사례 한 장을 제시해 차이를 보여줍니다."
        },
        {
          "slide": 6,
          "title": "예상 질문",
          "say": "끝없이 도는데요? → 반복·시간·토큰 한도 같은 정지조건을 먼저 둡니다.",
          "do": "수강생 실제 사례 1건을 받아 즉석에서 기준으로 분류합니다.",
          "ask": "지금 진행 중인 작업 한 건을 말해줄 수 있나요?",
          "expected": "실제 사례 1건",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "사례가 없으면 예시 작업으로 대신 분류합니다."
        },
        {
          "slide": 7,
          "title": "실습 브리프",
          "say": "트리거 · 결정적 단계 · 핸드오프 · 정지/복구",
          "do": "빈 양식과 예시 1행을 보여주고 즉시 작성하게 합니다.",
          "ask": "당신 작업의 완료 증거는 무엇인가요?",
          "expected": "완료 증거 1문장",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "예시 양식을 함께 한 줄 채워 시작점을 만듭니다."
        },
        {
          "slide": 8,
          "title": "실패 재현",
          "say": "한 단계 실패가 전체로 번지고 무한 반복·중복 작업이 발생함",
          "do": "broken 상태를 실행해 로그(no stop condition; runaway loop / duplicated work across tools)를 보여주고 증상을 고정합니다.",
          "ask": "이 증상의 원인은 어디일까요?",
          "expected": "원인 가설 1개",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "로그의 첫 오류 줄을 함께 읽고 가설을 좁힙니다."
        },
        {
          "slide": 9,
          "title": "복구 기준",
          "say": "결정적 뼈대로 단계를 고정하고 정지조건·핸드오프·복구를 명시",
          "do": "complete 상태로 복구 과정을 보여주고 재현 가능한 기준을 남깁니다.",
          "ask": "무엇을 바꿔야 다시 정상이 될까요?",
          "expected": "복구 한 단계",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "직전 정상 상태와 현재 diff를 비교해 범위를 좁힙니다."
        },
        {
          "slide": 10,
          "title": "공식자료 확인",
          "say": "수업 전 anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 재확인합니다.",
          "do": "🔄 공식 문서의 메뉴명·요금·베타·UI 변경을 확인합니다.",
          "ask": "최근 바뀐 용어나 화면이 있었나요?",
          "expected": "변경 여부 확인",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "확실치 않으면 공식 문서 링크를 함께 엽니다."
        },
        {
          "slide": 11,
          "title": "실습 타이머",
          "say": "실제 반복 업무 1건을 골라 트리거·결정적 단계·핸드오프·정지조건·복구를 흐름도로 설계하고 결정적/에이전틱 경계를 표시합니다.",
          "do": "40분 동안 작은 범위를 끝까지 진행하고 중간에 결과를 저장하게 합니다.",
          "ask": "막힌 사람은 현재 상태와 다음 한 단계를 말해줄 수 있나요?",
          "expected": "현재 상태 + 다음 한 단계",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "결과 추가 대신 완료 기준을 다시 설명하게 합니다."
        },
        {
          "slide": 12,
          "title": "리뷰",
          "say": "산출물: 오케스트레이션 흐름도 · 결정적/에이전틱 경계 표시 · 핸드오프 산출물 형식 · 정지조건·복구 경로",
          "do": "산출물을 직접 실행·확인하고 검증 기록을 남깁니다.",
          "ask": "사람이 판단한 부분과 AI 결과를 검증한 근거는 무엇인가요?",
          "expected": "판단·검증 근거",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "하나의 산출물을 함께 실행해 확인합니다."
        },
        {
          "slide": 13,
          "title": "다음 회차",
          "say": "흐름이 신뢰할 만한지 측정하고 비용을 관리합니다.",
          "do": "다음 회차로 이어지는 한 문장을 예고하고 산출물을 보존하게 합니다.",
          "ask": "다음 수업 전 준비할 한 가지는 무엇인가요?",
          "expected": "준비 행동 1개",
          "deepDive": "S6는 자동화 기능의 설정 절차를 반복하지 않습니다. 강사는 결정적 뼈대에 에이전틱을 더하는 판단, 도구 간 핸드오프, 정지조건·복구를 하나의 흐름으로 설계하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-agents, github-actions, openai-agents-sdk 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "구체적인 준비 예시 하나를 제시합니다."
        }
      ]
    },
    {
      "title": "평가·신뢰성·관측성·비용",
      "subtitle": "종이 운영안이 아니라, 측정 가능한 신뢰성으로 두 도구를 운영",
      "module": "S7 · EVAL & RELIABILITY",
      "objective": "멀티에이전트 작업을 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 측정해, Claude·Codex 결과를 같은 스코어카드로 신뢰성 있게 운영합니다.",
      "duration": "120분",
      "flow": [
        "진단 10분",
        "공식 개념·시각화 35분",
        "평가·관측 시연 20분",
        "신뢰성 설계 실습 40분",
        "복구·리뷰 15분"
      ],
      "concepts": [
        [
          "평가 하니스",
          "출력을 정해진 기준으로 채점해 품질을 수치화합니다."
        ],
        [
          "회귀 테스트",
          "프롬프트·에이전트 변경의 조용한 품질 저하를 잡습니다."
        ],
        [
          "관측성",
          "트레이스·지표로 실행을 추적합니다."
        ],
        [
          "비용 거버넌스",
          "토큰·시간 예산과 가드를 둡니다."
        ]
      ],
      "sequence": [
        "평가 기준·하니스 정의",
        "프롬프트·에이전트 회귀 테스트",
        "트레이스·지표 수집",
        "토큰·시간 비용 가드",
        "두 도구 스코어카드 통합"
      ],
      "demo": {
        "type": "reliability",
        "sceneId": "s-07-reliability",
        "manual": true,
        "title": "두 도구 작업을 같은 스코어카드로 측정·운영합니다",
        "stages": [
          "평가 하니스",
          "회귀 테스트",
          "관측성",
          "비용 가드",
          "스코어카드"
        ]
      },
      "compare": {
        "bad": [
          "느낌으로 품질을 판단",
          "변경 전후 비교 없이 배포",
          "비용·실패를 사후에야 발견"
        ],
        "good": [
          "평가 하니스로 채점",
          "회귀 베이스라인과 비교",
          "트레이스·지표·비용 가드로 사전 관리"
        ]
      },
      "decisions": [
        [
          "품질은 결과를 보면 느낌으로 안다",
          "위험",
          "정량 평가 없이는 조용한 회귀를 놓칩니다."
        ],
        [
          "변경 전후를 같은 기준으로 비교한다",
          "좋음",
          "회귀와 개선을 객관적으로 구분합니다."
        ],
        [
          "토큰·시간 예산 가드를 둔다",
          "필수",
          "비용 폭주는 사전 가드로만 막힙니다."
        ]
      ],
      "error": {
        "symptom": "프롬프트를 바꾸자 일부 작업 품질이 조용히 저하되고 비용이 급증함",
        "trace": "silent regression; no eval baseline; token cost spike unbounded",
        "cause": "평가 기준·관측성·비용 가드 없이 변경함",
        "fix": "평가 하니스·회귀 베이스라인·트레이스·비용 가드를 두고 변경 전후를 비교"
      },
      "practice": "실제 작업 1건의 평가 기준을 정해 하니스로 채점하고, 변경 전후 회귀 비교와 토큰·시간 비용 가드를 설계합니다.",
      "deliverables": [
        "평가 기준·하니스",
        "회귀 비교 결과",
        "트레이스·지표 목록",
        "토큰·시간 비용 가드"
      ],
      "sources": [
        "anthropic-eng-multiagent",
        "anthropic-eng-context",
        "owasp-llm-top10",
        "github-actions"
      ],
      "sourceKeys": [
        "anthropic-eng-multiagent",
        "anthropic-eng-context",
        "owasp-llm-top10",
        "github-actions"
      ],
      "pathway": null,
      "professional": {
        "level": "AI 심화 통합과정 S7 강사용 연구노트",
        "focus": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
        "officialStudy": [
          "Anthropic · Multi-agent에서 평가·비용·복구의 운영 신뢰성을 확인합니다.",
          "Anthropic · Context engineering에서 변경이 품질에 미치는 영향과 측정을 확인합니다.",
          "OWASP · LLM Top 10에서 안정성·오남용 관련 점검 항목을 확인합니다.",
          "GitHub · GitHub Actions에서 회귀 테스트 자동화와 게이트를 확인합니다."
        ],
        "visualSimulation": "신뢰성 랩 장면을 사용합니다. 발표자는 평가 하니스 → 회귀 테스트 → 관측성 → 비용 가드 → 스코어카드를 수동으로 넘기며 측정 체계가 완성되는 과정을 보여줍니다.",
        "demoRun": [
          "평가 기준을 정하고 하니스로 출력을 채점합니다.",
          "프롬프트·에이전트 변경을 베이스라인과 회귀 비교합니다.",
          "트레이스·지표로 실행을 관측합니다.",
          "토큰·시간 비용 가드를 설정합니다.",
          "Claude·Codex 결과를 같은 스코어카드로 통합합니다."
        ],
        "failureDrill": [
          "평가 없이 변경해 조용한 회귀와 비용 급증을 보여줍니다.",
          "측정·가드 부재를 원인으로 분류합니다.",
          "평가 하니스·회귀 비교·비용 가드로 복구합니다."
        ],
        "exercise": "작업 1건의 평가 기준과 하니스를 만들고 회귀 비교·비용 가드를 설계합니다.",
        "misconceptions": [
          [
            "결과를 보면 품질을 안다",
            "정량 평가 없이는 조용한 회귀를 놓칩니다."
          ],
          [
            "비용은 끝나고 보면 된다",
            "예산 가드는 사전에 둬야 폭주를 막습니다."
          ]
        ],
        "expertQuestions": [
          [
            "평가는 어떻게 시작하나요?",
            "작은 골든셋과 채점 기준부터 만들고 변경마다 같은 기준으로 비교합니다."
          ],
          [
            "관측성은 무엇을 보나요?",
            "단계별 트레이스, 실패 지점, 토큰·시간 지표를 봅니다."
          ]
        ],
        "studyPath": [
          "Multi-agent에서 평가·비용·복구 확인",
          "Context engineering에서 변경 영향 측정 확인",
          "Actions로 회귀 테스트 자동화 이해",
          "W4·C6·O6와 S7(측정 가능한 신뢰성)의 경계 정리",
          "수업 전 관련 공식 용어와 UI 변경 재확인"
        ],
        "slideUpgrade": [
          "표지는 추상 이미지보다 스코어카드·트레이스를 조합한 다큐멘터리 톤으로 유지",
          "핵심 개념은 카드보다 평가·회귀·관측·비용 배지를 나란히 배치",
          "대표 장면은 수동 5버튼으로 측정 체계를 한 단계씩",
          "오해 슬라이드는 느낌 판단이 아니라 정량 평가 문제로 정리",
          "실습 슬라이드는 평가표를 빈 양식으로 보여주고 즉시 작성하게 설계"
        ],
        "motionStoryboard": [
          "Idle: 측정 블록은 낮은 opacity로 대기하고 자동 진행하지 않습니다.",
          "Focus: 현재 단계 블록만 밝아지고 나머지는 배경으로 물러납니다.",
          "Score: 평가 단계에서 채점 배지가 채워집니다.",
          "Spike: 비용 단계에서 예산 초과 시 amber 경고선이 켜집니다.",
          "Card: 마지막 단계에서 두 도구 결과를 잇는 teal 스코어카드 라인이 연결됩니다."
        ],
        "realWorldAssets": [
          "평가 하니스·골든셋 샘플",
          "회귀 비교 결과 캡처",
          "트레이스·지표 대시보드 캡처",
          "조용한 회귀·비용 급증 캡처",
          "비용 가드 적용 캡처"
        ],
        "rehearsalChecklist": [
          "5버튼 수동 진행으로 각 단계를 멈춰 설명",
          "수치는 내부·특정 시점이라는 고지 유지",
          "각 단계에서 완성되는 측정 체계를 한 문장으로 말하기",
          "1280x720에서 배지·캡션이 잘리지 않는지 확인",
          "수업 전 공식 문서와 도구 UI 변경 여부 재확인"
        ]
      },
      "revision": "3.0.0-beta.3",
      "status": "review",
      "visualScene": {
        "id": "s-07-reliability",
        "type": "reliability",
        "alias": "workflow-04-agent",
        "title": "신뢰성 랩",
        "layout": "reliability-lab",
        "normalFlow": [
          "평가 하니스",
          "회귀 테스트",
          "관측성",
          "비용 가드",
          "스코어카드"
        ],
        "failureFlow": [
          "silent regression",
          "cost spike",
          "측정 재설계"
        ],
        "recoveryFlow": [
          "평가 베이스라인 수립",
          "트레이스·지표 추가",
          "비용 가드 적용"
        ],
        "steps": [
          {
            "label": "EVAL",
            "title": "평가 기준·하니스 정의",
            "detail": "출력을 정해진 기준으로 채점하는 하니스를 만듭니다."
          },
          {
            "label": "REGRESS",
            "title": "회귀 테스트",
            "detail": "프롬프트·에이전트 변경을 베이스라인과 비교합니다."
          },
          {
            "label": "OBSERVE",
            "title": "트레이스·지표",
            "detail": "단계별 트레이스와 토큰·시간 지표로 실행을 추적합니다."
          },
          {
            "label": "COST",
            "title": "비용 가드",
            "detail": "토큰·시간 예산과 초과 가드를 설정합니다."
          },
          {
            "label": "SCORE",
            "title": "스코어카드 통합",
            "detail": "Claude·Codex 결과를 같은 스코어카드로 비교합니다."
          }
        ]
      },
      "interactions": {
        "controls": [
          "start",
          "previous",
          "next",
          "pause",
          "reset"
        ],
        "predictionPrompt": "다음 단계에서 무엇이 측정되고 어떤 회귀·비용이 차단될지 먼저 말한 뒤 진행",
        "decisionCards": 3,
        "manualOnly": true
      },
      "assets": {
        "fallbackImage": "assets/v3/fallbacks/advanced-07.png",
        "sceneId": "s-07-reliability",
        "keyvisuals": [
          "assets/v3/keyvisuals/s/07/cover.png",
          "assets/v3/keyvisuals/s/07/metaphor.png",
          "assets/v3/keyvisuals/s/07/next.png"
        ],
        "captures": [
          "assets/v3/captures/s/07/scorecard.png",
          "assets/v3/captures/s/07/trace.png",
          "assets/v3/captures/s/07/cost.png"
        ]
      },
      "demoProject": {
        "root": "v3/projects/advanced/07",
        "starter": "v3/projects/advanced/07/starter",
        "broken": "v3/projects/advanced/07/broken",
        "complete": "v3/projects/advanced/07/complete",
        "manifest": "v3/projects/advanced/07/lab.json"
      },
      "fallbackMedia": {
        "image": "assets/v3/fallbacks/advanced-07.png",
        "slide": "v3/deck.html?course=advanced&lesson=7&slide=4&motion=low"
      },
      "studentMaterials": [
        "workbook",
        "commands",
        "examples",
        "errors",
        "assessment",
        "practice"
      ],
      "instructorMaterials": [
        "script",
        "source-study",
        "demo-runbook",
        "deep-dive",
        "qa-bank",
        "fallback",
        "rehearsal"
      ],
      "slides": [
        {
          "slot": "cover",
          "kind": "img",
          "tag": "IMG",
          "title": "신뢰성은 측정한다",
          "screenText": "느낌이 아니라, 채점·추적·비용으로 신뢰성을 만듭니다.",
          "presenterNote": "오늘은 종이 운영안이 아니라 측정 체계를 만드는 시간이라고 안내합니다.",
          "asset": "assets/v3/keyvisuals/s/07/cover.png"
        },
        {
          "slot": "metaphor",
          "kind": "img",
          "tag": "IMG",
          "title": "건강검진 수치처럼",
          "screenText": "괜찮아 보여도, 수치를 재야 이상을 일찍 잡습니다.",
          "presenterNote": "정량 평가를 건강검진으로 직관화합니다.",
          "asset": "assets/v3/keyvisuals/s/07/metaphor.png"
        },
        {
          "slot": "concept",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "신뢰성 4요소",
          "screenText": "평가 하니스 · 회귀 · 관측성 · 비용 가드",
          "presenterNote": "네 요소로 두 도구를 같은 스코어카드로 비교함을 강조합니다.",
          "captures": [
            "assets/v3/captures/s/07/scorecard.png",
            "assets/v3/captures/s/07/trace.png",
            "assets/v3/captures/s/07/cost.png"
          ]
        },
        {
          "slot": "representative",
          "kind": "scene",
          "tag": "SCENE",
          "title": "신뢰성 랩",
          "screenText": "측정 체계를 한 단계씩 세웁니다.",
          "presenterNote": "자동 진행 없이 시작과 다음 버튼으로 측정을 완성합니다.",
          "sceneId": "s-07-reliability"
        },
        {
          "slot": "pitfall",
          "kind": "text",
          "tag": "TEXT",
          "title": "오해: 결과 보면 품질을 안다",
          "screenText": "정량 평가 없이는 조용한 회귀를 놓칩니다.",
          "presenterNote": "느낌이 아니라 채점·베이스라인으로 판단하게 합니다."
        },
        {
          "slot": "qa",
          "kind": "text",
          "tag": "TEXT",
          "title": "현장 질문",
          "screenText": "평가는 어떻게 시작하나요? → 작은 골든셋과 채점 기준부터 만듭니다.",
          "presenterNote": "질문을 도구에서 평가 기준 설계로 바꿔 대답합니다."
        },
        {
          "slot": "lab",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "평가·비용 가드 실습",
          "screenText": "채점 기준 · 회귀 비교 · 트레이스 · 비용 가드",
          "presenterNote": "수강생 각자 작업 한 건의 평가 기준과 비용 가드를 설계하게 합니다.",
          "captures": [
            "assets/v3/captures/s/07/scorecard.png"
          ]
        },
        {
          "slot": "summary",
          "kind": "text",
          "tag": "TEXT",
          "title": "오늘의 한 문장",
          "screenText": "채점하고, 변경 전후를 비교하고, 추적하고, 비용을 가드합니다.",
          "presenterNote": "W4·C6·O6와 겹치지 않게 측정 가능한 신뢰성 기준만 요약합니다."
        },
        {
          "slot": "next",
          "kind": "img",
          "tag": "IMG",
          "title": "다음: 통합 캡스톤",
          "screenText": "하나의 실제 제품을 두 도구로 끝까지 만듭니다.",
          "presenterNote": "S8은 새 개념이 아니라 S1~S7을 하나의 프로젝트로 통합하는 캡스톤입니다.",
          "asset": "assets/v3/keyvisuals/s/07/next.png"
        }
      ],
      "scriptSlides": [
        {
          "slide": 1,
          "title": "표지",
          "say": "느낌이 아니라, 채점·추적·비용으로 신뢰성을 만듭니다.",
          "do": "표지 히어로만 띄우고 길게 설명하지 않습니다. 오늘의 한 문장만 예고합니다.",
          "ask": "오늘 주제와 관련해 최근 겪은 상황이 있나요?",
          "expected": "본인 경험 1~2개",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "응답이 없으면 구체적인 예시 하나를 제시하고 다시 질문합니다."
        },
        {
          "slide": 2,
          "title": "은유",
          "say": "괜찮아 보여도, 수치를 재야 이상을 일찍 잡습니다.",
          "do": "은유 키비주얼로 직관화하고 도구 우열 논쟁으로 흐르지 않게 합니다.",
          "ask": "이 비유에서 무엇을 기준으로 판단해야 할까요?",
          "expected": "작업 성격·필요 증거 같은 기준",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "비유의 한 지점만 짚고 다음으로 넘어갑니다."
        },
        {
          "slide": 3,
          "title": "핵심 개념",
          "say": "평가 하니스 · 회귀 · 관측성 · 비용 가드",
          "do": "개념/캡처 패널을 한 요소씩 공개하고 시선을 한 지점에 고정합니다.",
          "ask": "이 개념이 Claude와 Codex에서 같게 적용되려면 무엇이 필요할까요?",
          "expected": "공유 기준·동기화",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "요소 하나를 실제 화면에 연결해 다시 설명합니다."
        },
        {
          "slide": 4,
          "title": "대표 시연",
          "say": "측정 체계를 한 단계씩 세웁니다.",
          "do": "수동 5버튼으로 한 단계씩 진행하고, 각 단계 전에 결과를 먼저 예측하게 합니다. 자동으로 넘기지 않습니다.",
          "ask": "다음 단계에서 무엇이 달라지고 어떤 증거가 남을까요?",
          "expected": "예측 한 문장",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "애매하면 직전 단계로 돌아가 증거를 다시 짚습니다."
        },
        {
          "slide": 5,
          "title": "자주 오해",
          "say": "정량 평가 없이는 조용한 회귀를 놓칩니다.",
          "do": "오해 → 교정 순으로 보여주고 판단 보드(결정 카드)를 노출합니다.",
          "ask": "이 오해대로 하면 무엇이 부족해질까요?",
          "expected": "부족한 증거·위험",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "실패 사례 한 장을 제시해 차이를 보여줍니다."
        },
        {
          "slide": 6,
          "title": "예상 질문",
          "say": "평가는 어떻게 시작하나요? → 작은 골든셋과 채점 기준부터 만듭니다.",
          "do": "수강생 실제 사례 1건을 받아 즉석에서 기준으로 분류합니다.",
          "ask": "지금 진행 중인 작업 한 건을 말해줄 수 있나요?",
          "expected": "실제 사례 1건",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "사례가 없으면 예시 작업으로 대신 분류합니다."
        },
        {
          "slide": 7,
          "title": "실습 브리프",
          "say": "채점 기준 · 회귀 비교 · 트레이스 · 비용 가드",
          "do": "빈 양식과 예시 1행을 보여주고 즉시 작성하게 합니다.",
          "ask": "당신 작업의 완료 증거는 무엇인가요?",
          "expected": "완료 증거 1문장",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "예시 양식을 함께 한 줄 채워 시작점을 만듭니다."
        },
        {
          "slide": 8,
          "title": "실패 재현",
          "say": "프롬프트를 바꾸자 일부 작업 품질이 조용히 저하되고 비용이 급증함",
          "do": "broken 상태를 실행해 로그(silent regression; no eval baseline; token cost spike unbounded)를 보여주고 증상을 고정합니다.",
          "ask": "이 증상의 원인은 어디일까요?",
          "expected": "원인 가설 1개",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "로그의 첫 오류 줄을 함께 읽고 가설을 좁힙니다."
        },
        {
          "slide": 9,
          "title": "복구 기준",
          "say": "평가 하니스·회귀 베이스라인·트레이스·비용 가드를 두고 변경 전후를 비교",
          "do": "complete 상태로 복구 과정을 보여주고 재현 가능한 기준을 남깁니다.",
          "ask": "무엇을 바꿔야 다시 정상이 될까요?",
          "expected": "복구 한 단계",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "직전 정상 상태와 현재 diff를 비교해 범위를 좁힙니다."
        },
        {
          "slide": 10,
          "title": "공식자료 확인",
          "say": "수업 전 anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 재확인합니다.",
          "do": "🔄 공식 문서의 메뉴명·요금·베타·UI 변경을 확인합니다.",
          "ask": "최근 바뀐 용어나 화면이 있었나요?",
          "expected": "변경 여부 확인",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "확실치 않으면 공식 문서 링크를 함께 엽니다."
        },
        {
          "slide": 11,
          "title": "실습 타이머",
          "say": "실제 작업 1건의 평가 기준을 정해 하니스로 채점하고, 변경 전후 회귀 비교와 토큰·시간 비용 가드를 설계합니다.",
          "do": "40분 동안 작은 범위를 끝까지 진행하고 중간에 결과를 저장하게 합니다.",
          "ask": "막힌 사람은 현재 상태와 다음 한 단계를 말해줄 수 있나요?",
          "expected": "현재 상태 + 다음 한 단계",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "결과 추가 대신 완료 기준을 다시 설명하게 합니다."
        },
        {
          "slide": 12,
          "title": "리뷰",
          "say": "산출물: 평가 기준·하니스 · 회귀 비교 결과 · 트레이스·지표 목록 · 토큰·시간 비용 가드",
          "do": "산출물을 직접 실행·확인하고 검증 기록을 남깁니다.",
          "ask": "사람이 판단한 부분과 AI 결과를 검증한 근거는 무엇인가요?",
          "expected": "판단·검증 근거",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "하나의 산출물을 함께 실행해 확인합니다."
        },
        {
          "slide": 13,
          "title": "다음 회차",
          "say": "하나의 실제 제품을 두 도구로 끝까지 만듭니다.",
          "do": "다음 회차로 이어지는 한 문장을 예고하고 산출물을 보존하게 합니다.",
          "ask": "다음 수업 전 준비할 한 가지는 무엇인가요?",
          "expected": "준비 행동 1개",
          "deepDive": "S7은 종이 운영안 작성을 넘어, 평가 하니스·회귀 테스트·관측성·비용 거버넌스로 신뢰성을 측정 가능하게 만드는 법을 다룹니다. 강사는 두 도구 결과를 같은 스코어카드로 비교하는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "anthropic-eng-multiagent, anthropic-eng-context, owasp-llm-top10, github-actions 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "구체적인 준비 예시 하나를 제시합니다."
        }
      ]
    },
    {
      "title": "통합 캡스톤",
      "subtitle": "새 개념이 아니라, S1~S7을 하나의 실제 제품으로 두 도구로 끝까지",
      "module": "S8 · INTEGRATION CAPSTONE",
      "objective": "작업별 도구 선택(S1), 공유 정책·자산·권한(S2~S4), 병렬·오케스트레이션(S5~S6), 신뢰성 측정(S7)을 하나의 실제 제품에 통합해 재현 가능한 릴리즈까지 완성합니다.",
      "duration": "120분",
      "flow": [
        "진단 10분",
        "통합 설계 35분",
        "크로스툴 빌드 시연 20분",
        "캡스톤 실습 40분",
        "릴리즈·리뷰 15분"
      ],
      "concepts": [
        [
          "도구 선택",
          "작업마다 표면·도구를 고릅니다(S1)."
        ],
        [
          "크로스툴 빌드",
          "Claude·Codex로 정책·자산·권한을 공유해 만듭니다(S2~S4)."
        ],
        [
          "병렬·오케스트",
          "소유권과 흐름으로 병렬·조율합니다(S5~S6)."
        ],
        [
          "검증·릴리즈",
          "신뢰성을 측정한 뒤 증거와 함께 릴리즈합니다(S7)."
        ]
      ],
      "sequence": [
        "실제 제품 범위 정의",
        "작업별 도구·표면 선택",
        "크로스툴로 병렬 빌드",
        "평가·리뷰 게이트",
        "릴리즈·증거 정리"
      ],
      "demo": {
        "type": "capstone",
        "sceneId": "s-08-capstone",
        "manual": true,
        "title": "S1~S7을 하나의 제품으로 두 도구로 통합합니다",
        "stages": [
          "도구 선택",
          "크로스툴 빌드",
          "검증·리뷰",
          "릴리즈",
          "통합"
        ]
      },
      "compare": {
        "bad": [
          "도구·정책이 작업마다 제각각",
          "소유권·신뢰성 기준 없이 통합",
          "릴리즈 증거가 재현 불가"
        ],
        "good": [
          "작업별 선택과 공유 정책 일관 적용",
          "소유권·오케스트레이션·신뢰성 연결",
          "재현 가능한 릴리즈 증거 정리"
        ]
      },
      "decisions": [
        [
          "캡스톤은 새 기능을 더 배우는 시간이다",
          "아님",
          "S1~S7 기준을 하나의 제품에 통합하는 시간입니다."
        ],
        [
          "작업별로 S1~S7 기준을 일관 적용한다",
          "좋음",
          "통합 단계의 어긋남을 줄입니다."
        ],
        [
          "릴리즈에 재현 가능한 증거를 남긴다",
          "필수",
          "다음 작업자가 같은 판단을 재현할 수 있어야 합니다."
        ]
      ],
      "error": {
        "symptom": "통합 단계에서 도구·정책·소유권이 어긋나 릴리즈 증거가 불일치함",
        "trace": "integration drift: tool/policy/owner mismatch at release",
        "cause": "S1~S7 기준을 한 프로젝트에 일관되게 적용하지 않음",
        "fix": "작업별 선택·공유 정책·소유권·신뢰성 기준을 한 흐름으로 통합해 재현 가능한 릴리즈로 마감"
      },
      "practice": "실제 제품 1건을 골라 S1~S7 기준을 적용한 통합 계획을 세우고, 크로스툴 빌드·검증·릴리즈까지 한 흐름으로 완성합니다.",
      "deliverables": [
        "통합 계획(S1~S7 적용)",
        "크로스툴 빌드·검증 기록",
        "재현 가능한 릴리즈 증거",
        "통합 실패 시 복구 기준"
      ],
      "sources": [
        "github-releases",
        "vercel-deploy",
        "github-pull-requests",
        "anthropic-eng-agents"
      ],
      "sourceKeys": [
        "github-releases",
        "vercel-deploy",
        "github-pull-requests",
        "anthropic-eng-agents"
      ],
      "pathway": null,
      "professional": {
        "level": "AI 심화 통합과정 S8 강사용 연구노트",
        "focus": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
        "officialStudy": [
          "GitHub · 릴리즈 관리에서 버전·태그·자산·체크섬을 하나의 배포 단위로 확인합니다.",
          "Vercel · 배포에서 빌드·환경변수·공개 URL과 재현 가능한 배포를 확인합니다.",
          "GitHub · Pull requests에서 리뷰 게이트와 변경 증거를 확인합니다.",
          "Anthropic · Building effective agents에서 통합 운영의 정지조건·복구를 확인합니다."
        ],
        "visualSimulation": "통합 캡스톤 장면을 사용합니다. 발표자는 도구 선택 → 크로스툴 빌드 → 검증·리뷰 → 릴리즈 → 통합을 수동으로 넘기며 S1~S7이 하나의 제품으로 합쳐지는 과정을 보여줍니다.",
        "demoRun": [
          "실제 제품 범위를 정의합니다.",
          "작업별로 표면·도구를 선택합니다(S1).",
          "공유 정책·자산·권한·소유권으로 병렬 빌드합니다(S2~S5).",
          "오케스트레이션과 신뢰성으로 검증합니다(S6~S7).",
          "재현 가능한 증거와 함께 릴리즈합니다."
        ],
        "failureDrill": [
          "작업마다 기준이 달라 통합 단계에서 증거가 불일치하는 drift를 보여줍니다.",
          "일관성 부재를 원인으로 분류합니다.",
          "S1~S7 기준을 한 흐름으로 통합해 복구합니다."
        ],
        "exercise": "제품 1건에 S1~S7 기준을 적용한 통합 계획과 릴리즈 증거를 작성합니다.",
        "misconceptions": [
          [
            "캡스톤은 새 기능 학습이다",
            "S1~S7을 하나의 제품으로 통합하는 시간입니다."
          ],
          [
            "릴리즈는 배포 성공이면 끝이다",
            "재현 가능한 증거가 있어야 운영 가능한 릴리즈입니다."
          ]
        ],
        "expertQuestions": [
          [
            "무엇을 캡스톤 제품으로 고르나요?",
            "두 도구의 강점을 모두 쓰는 적당한 규모의 실제 작업을 고릅니다."
          ],
          [
            "통합에서 가장 자주 깨지는 곳은?",
            "작업별 도구·정책·소유권이 달라지는 지점입니다. S1~S4 기준을 일관 적용하면 줄어듭니다."
          ]
        ],
        "studyPath": [
          "릴리즈·배포·PR에서 재현 가능한 증거 형식 확인",
          "S1~S7 산출물을 하나의 통합 계획으로 연결",
          "통합 단계의 어긋남 지점 점검표 작성",
          "캡스톤 평가 기준(완성도·증거·재현성) 정리",
          "수업 전 릴리즈·배포 관련 공식 용어와 UI 변경 재확인"
        ],
        "slideUpgrade": [
          "표지는 추상 이미지보다 S1~S7이 하나로 합쳐지는 다큐멘터리 톤으로 유지",
          "핵심 개념은 카드보다 선택·빌드·검증·릴리즈 배지를 나란히 배치",
          "대표 장면은 수동 5버튼으로 통합을 한 단계씩",
          "오해 슬라이드는 새 기능 학습이 아니라 통합·재현성 문제로 정리",
          "실습 슬라이드는 통합 계획표를 빈 양식으로 보여주고 즉시 작성하게 설계"
        ],
        "motionStoryboard": [
          "Idle: 통합 블록은 낮은 opacity로 대기하고 자동 진행하지 않습니다.",
          "Focus: 현재 단계 블록만 밝아지고 나머지는 배경으로 물러납니다.",
          "Build: 빌드 단계에서 Claude·Codex 산출물 배지가 채워집니다.",
          "Verify: 검증 단계에서 리뷰 게이트와 스코어카드가 켜집니다.",
          "Release: 마지막 단계에서 재현 가능한 릴리즈를 잇는 teal 라인이 연결됩니다."
        ],
        "realWorldAssets": [
          "통합 계획표(S1~S7) 샘플",
          "크로스툴 빌드·검증 기록",
          "릴리즈 증거(태그·체크섬·PR) 캡처",
          "통합 drift 발생 캡처",
          "일관성 복구 캡처"
        ],
        "rehearsalChecklist": [
          "5버튼 수동 진행으로 각 단계를 멈춰 설명",
          "새 기능 강의로 흐르지 않는지 확인",
          "각 단계에서 통합되는 기준을 한 문장으로 말하기",
          "1280x720에서 배지·캡션이 잘리지 않는지 확인",
          "수업 전 공식 문서와 도구 UI 변경 여부 재확인"
        ]
      },
      "revision": "3.0.0-beta.3",
      "status": "review",
      "visualScene": {
        "id": "s-08-capstone",
        "type": "capstone",
        "alias": "codex-06-release",
        "title": "통합 캡스톤",
        "layout": "integration-capstone",
        "normalFlow": [
          "제품 범위 정의",
          "작업별 도구 선택",
          "크로스툴 빌드",
          "검증·리뷰",
          "릴리즈·증거"
        ],
        "failureFlow": [
          "integration drift",
          "evidence mismatch",
          "통합 재설계"
        ],
        "recoveryFlow": [
          "기준 일관 적용",
          "소유권·신뢰성 연결",
          "재현 가능한 릴리즈"
        ],
        "steps": [
          {
            "label": "SCOPE",
            "title": "실제 제품 범위 정의",
            "detail": "두 도구의 강점을 모두 쓰는 적당한 규모의 작업을 고릅니다."
          },
          {
            "label": "SELECT",
            "title": "작업별 도구·표면 선택",
            "detail": "S1 기준으로 작업마다 표면과 도구를 고릅니다."
          },
          {
            "label": "BUILD",
            "title": "크로스툴 병렬 빌드",
            "detail": "S2~S5 정책·자산·권한·소유권을 공유해 병렬로 만듭니다."
          },
          {
            "label": "VERIFY",
            "title": "평가·리뷰 게이트",
            "detail": "S6~S7 오케스트레이션과 신뢰성으로 검증합니다."
          },
          {
            "label": "RELEASE",
            "title": "릴리즈·증거 정리",
            "detail": "버전·태그·체크섬·PR로 재현 가능한 릴리즈를 남깁니다."
          }
        ]
      },
      "interactions": {
        "controls": [
          "start",
          "previous",
          "next",
          "pause",
          "reset"
        ],
        "predictionPrompt": "다음 단계에서 어떤 기준이 통합되고 어떤 어긋남이 차단될지 먼저 말한 뒤 진행",
        "decisionCards": 3,
        "manualOnly": true
      },
      "assets": {
        "fallbackImage": "assets/v3/fallbacks/advanced-08.png",
        "sceneId": "s-08-capstone",
        "keyvisuals": [
          "assets/v3/keyvisuals/s/08/cover.png",
          "assets/v3/keyvisuals/s/08/metaphor.png",
          "assets/v3/keyvisuals/s/08/next.png"
        ],
        "captures": [
          "assets/v3/captures/s/08/integration-plan.png",
          "assets/v3/captures/s/08/build.png",
          "assets/v3/captures/s/08/release.png"
        ]
      },
      "demoProject": {
        "root": "v3/projects/advanced/08",
        "starter": "v3/projects/advanced/08/starter",
        "broken": "v3/projects/advanced/08/broken",
        "complete": "v3/projects/advanced/08/complete",
        "manifest": "v3/projects/advanced/08/lab.json"
      },
      "fallbackMedia": {
        "image": "assets/v3/fallbacks/advanced-08.png",
        "slide": "v3/deck.html?course=advanced&lesson=8&slide=4&motion=low"
      },
      "studentMaterials": [
        "workbook",
        "commands",
        "examples",
        "errors",
        "assessment",
        "practice"
      ],
      "instructorMaterials": [
        "script",
        "source-study",
        "demo-runbook",
        "deep-dive",
        "qa-bank",
        "fallback",
        "rehearsal"
      ],
      "slides": [
        {
          "slot": "cover",
          "kind": "img",
          "tag": "IMG",
          "title": "두 도구를 하나의 제품으로",
          "screenText": "새 기능이 아니라, 지금까지의 기준을 하나로 통합합니다.",
          "presenterNote": "오늘은 S1~S7을 한 제품에 적용하는 통합의 시간이라고 안내합니다.",
          "asset": "assets/v3/keyvisuals/s/08/cover.png"
        },
        {
          "slot": "metaphor",
          "kind": "img",
          "tag": "IMG",
          "title": "오케스트라 합주처럼",
          "screenText": "각 파트가 따로 연습한 뒤, 하나의 곡으로 합칩니다.",
          "presenterNote": "통합을 합주로 직관화합니다.",
          "asset": "assets/v3/keyvisuals/s/08/metaphor.png"
        },
        {
          "slot": "concept",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "통합 4단계",
          "screenText": "선택(S1) · 빌드(S2~S5) · 검증(S6~S7) · 릴리즈",
          "presenterNote": "각 단계가 앞 회차 기준을 그대로 끌어옴을 강조합니다.",
          "captures": [
            "assets/v3/captures/s/08/integration-plan.png",
            "assets/v3/captures/s/08/build.png",
            "assets/v3/captures/s/08/release.png"
          ]
        },
        {
          "slot": "representative",
          "kind": "scene",
          "tag": "SCENE",
          "title": "통합 캡스톤",
          "screenText": "S1~S7을 한 단계씩 하나의 제품으로 묶습니다.",
          "presenterNote": "자동 진행 없이 시작과 다음 버튼으로 통합을 완성합니다.",
          "sceneId": "s-08-capstone"
        },
        {
          "slot": "pitfall",
          "kind": "text",
          "tag": "TEXT",
          "title": "오해: 캡스톤은 새 기능 학습",
          "screenText": "S1~S7 기준을 하나의 제품으로 통합하는 시간입니다.",
          "presenterNote": "새 도구가 아니라 일관성·재현성으로 판단하게 합니다."
        },
        {
          "slot": "qa",
          "kind": "text",
          "tag": "TEXT",
          "title": "현장 질문",
          "screenText": "통합에서 가장 자주 깨지는 곳은? → 작업별 도구·정책·소유권이 달라지는 지점입니다.",
          "presenterNote": "질문을 기능에서 일관성·증거로 바꿔 대답합니다."
        },
        {
          "slot": "lab",
          "kind": "cap",
          "tag": "CAP+TEXT",
          "title": "통합 계획·릴리즈 실습",
          "screenText": "S1~S7 적용 · 빌드/검증 기록 · 재현 가능한 릴리즈",
          "presenterNote": "수강생 각자 제품 한 건의 통합 계획과 릴리즈 증거를 작성하게 합니다.",
          "captures": [
            "assets/v3/captures/s/08/integration-plan.png"
          ]
        },
        {
          "slot": "summary",
          "kind": "text",
          "tag": "TEXT",
          "title": "오늘의 한 문장",
          "screenText": "작업별로 고르고, 정책·소유권·신뢰성을 잇고, 재현 가능한 증거로 릴리즈합니다.",
          "presenterNote": "심화 통합과정의 결론으로 S1~S7을 한 문장으로 묶어 요약합니다."
        },
        {
          "slot": "next",
          "kind": "img",
          "tag": "IMG",
          "title": "수료: 두 도구를 하나로",
          "screenText": "이제 같은 기준을 자신의 실제 프로젝트에 적용합니다.",
          "presenterNote": "심화 통합과정을 마치며 본인 프로젝트 적용 한 가지를 약속하게 합니다.",
          "asset": "assets/v3/keyvisuals/s/08/next.png"
        }
      ],
      "scriptSlides": [
        {
          "slide": 1,
          "title": "표지",
          "say": "새 기능이 아니라, 지금까지의 기준을 하나로 통합합니다.",
          "do": "표지 히어로만 띄우고 길게 설명하지 않습니다. 오늘의 한 문장만 예고합니다.",
          "ask": "오늘 주제와 관련해 최근 겪은 상황이 있나요?",
          "expected": "본인 경험 1~2개",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "응답이 없으면 구체적인 예시 하나를 제시하고 다시 질문합니다."
        },
        {
          "slide": 2,
          "title": "은유",
          "say": "각 파트가 따로 연습한 뒤, 하나의 곡으로 합칩니다.",
          "do": "은유 키비주얼로 직관화하고 도구 우열 논쟁으로 흐르지 않게 합니다.",
          "ask": "이 비유에서 무엇을 기준으로 판단해야 할까요?",
          "expected": "작업 성격·필요 증거 같은 기준",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "비유의 한 지점만 짚고 다음으로 넘어갑니다."
        },
        {
          "slide": 3,
          "title": "핵심 개념",
          "say": "선택(S1) · 빌드(S2~S5) · 검증(S6~S7) · 릴리즈",
          "do": "개념/캡처 패널을 한 요소씩 공개하고 시선을 한 지점에 고정합니다.",
          "ask": "이 개념이 Claude와 Codex에서 같게 적용되려면 무엇이 필요할까요?",
          "expected": "공유 기준·동기화",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "요소 하나를 실제 화면에 연결해 다시 설명합니다."
        },
        {
          "slide": 4,
          "title": "대표 시연",
          "say": "S1~S7을 한 단계씩 하나의 제품으로 묶습니다.",
          "do": "수동 5버튼으로 한 단계씩 진행하고, 각 단계 전에 결과를 먼저 예측하게 합니다. 자동으로 넘기지 않습니다.",
          "ask": "다음 단계에서 무엇이 달라지고 어떤 증거가 남을까요?",
          "expected": "예측 한 문장",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "애매하면 직전 단계로 돌아가 증거를 다시 짚습니다."
        },
        {
          "slide": 5,
          "title": "자주 오해",
          "say": "S1~S7 기준을 하나의 제품으로 통합하는 시간입니다.",
          "do": "오해 → 교정 순으로 보여주고 판단 보드(결정 카드)를 노출합니다.",
          "ask": "이 오해대로 하면 무엇이 부족해질까요?",
          "expected": "부족한 증거·위험",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "실패 사례 한 장을 제시해 차이를 보여줍니다."
        },
        {
          "slide": 6,
          "title": "예상 질문",
          "say": "통합에서 가장 자주 깨지는 곳은? → 작업별 도구·정책·소유권이 달라지는 지점입니다.",
          "do": "수강생 실제 사례 1건을 받아 즉석에서 기준으로 분류합니다.",
          "ask": "지금 진행 중인 작업 한 건을 말해줄 수 있나요?",
          "expected": "실제 사례 1건",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "사례가 없으면 예시 작업으로 대신 분류합니다."
        },
        {
          "slide": 7,
          "title": "실습 브리프",
          "say": "S1~S7 적용 · 빌드/검증 기록 · 재현 가능한 릴리즈",
          "do": "빈 양식과 예시 1행을 보여주고 즉시 작성하게 합니다.",
          "ask": "당신 작업의 완료 증거는 무엇인가요?",
          "expected": "완료 증거 1문장",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "예시 양식을 함께 한 줄 채워 시작점을 만듭니다."
        },
        {
          "slide": 8,
          "title": "실패 재현",
          "say": "통합 단계에서 도구·정책·소유권이 어긋나 릴리즈 증거가 불일치함",
          "do": "broken 상태를 실행해 로그(integration drift: tool/policy/owner mismatch at release)를 보여주고 증상을 고정합니다.",
          "ask": "이 증상의 원인은 어디일까요?",
          "expected": "원인 가설 1개",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "로그의 첫 오류 줄을 함께 읽고 가설을 좁힙니다."
        },
        {
          "slide": 9,
          "title": "복구 기준",
          "say": "작업별 선택·공유 정책·소유권·신뢰성 기준을 한 흐름으로 통합해 재현 가능한 릴리즈로 마감",
          "do": "complete 상태로 복구 과정을 보여주고 재현 가능한 기준을 남깁니다.",
          "ask": "무엇을 바꿔야 다시 정상이 될까요?",
          "expected": "복구 한 단계",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "직전 정상 상태와 현재 diff를 비교해 범위를 좁힙니다."
        },
        {
          "slide": 10,
          "title": "공식자료 확인",
          "say": "수업 전 github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 재확인합니다.",
          "do": "🔄 공식 문서의 메뉴명·요금·베타·UI 변경을 확인합니다.",
          "ask": "최근 바뀐 용어나 화면이 있었나요?",
          "expected": "변경 여부 확인",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "확실치 않으면 공식 문서 링크를 함께 엽니다."
        },
        {
          "slide": 11,
          "title": "실습 타이머",
          "say": "실제 제품 1건을 골라 S1~S7 기준을 적용한 통합 계획을 세우고, 크로스툴 빌드·검증·릴리즈까지 한 흐름으로 완성합니다.",
          "do": "40분 동안 작은 범위를 끝까지 진행하고 중간에 결과를 저장하게 합니다.",
          "ask": "막힌 사람은 현재 상태와 다음 한 단계를 말해줄 수 있나요?",
          "expected": "현재 상태 + 다음 한 단계",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "결과 추가 대신 완료 기준을 다시 설명하게 합니다."
        },
        {
          "slide": 12,
          "title": "리뷰",
          "say": "산출물: 통합 계획(S1~S7 적용) · 크로스툴 빌드·검증 기록 · 재현 가능한 릴리즈 증거 · 통합 실패 시 복구 기준",
          "do": "산출물을 직접 실행·확인하고 검증 기록을 남깁니다.",
          "ask": "사람이 판단한 부분과 AI 결과를 검증한 근거는 무엇인가요?",
          "expected": "판단·검증 근거",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "하나의 산출물을 함께 실행해 확인합니다."
        },
        {
          "slide": 13,
          "title": "다음 회차",
          "say": "이제 같은 기준을 자신의 실제 프로젝트에 적용합니다.",
          "do": "다음 회차로 이어지는 한 문장을 예고하고 산출물을 보존하게 합니다.",
          "ask": "다음 수업 전 준비할 한 가지는 무엇인가요?",
          "expected": "준비 행동 1개",
          "deepDive": "S8은 새 도구 기능을 가르치지 않습니다. 강사는 S1~S7의 판단 기준을 하나의 실제 제품에 일관되게 적용해 두 도구로 끝까지 완성하고, 재현 가능한 릴리즈 증거를 남기는 법을 설명합니다.",
          "motionCue": "현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.",
          "sourceCue": "github-releases, vercel-deploy, github-pull-requests, anthropic-eng-agents 를 판단 기준으로만 짧게 연결합니다.",
          "recovery": "구체적인 준비 예시 하나를 제시합니다."
        }
      ]
    }
  ]
};
