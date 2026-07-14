export type FoundationQuizOption = {
  readonly id: string
  readonly label: string
  readonly correct: boolean
  readonly explain: string
}

export type FoundationQuiz = {
  readonly conceptId: string
  readonly checkpoints: readonly {
    readonly id: string
    readonly prompt: string
    readonly options: readonly FoundationQuizOption[]
  }[]
  readonly teachBack: string
}

export const FOUNDATION_QUIZZES: readonly FoundationQuiz[] = [
  {
    conceptId: "ai",
    teachBack:
      "AI와 ‘고정 규칙 자동화’의 가장 중요한 차이를 비개발자에게 두 문장으로 설명해보세요.",
    checkpoints: [
      {
        id: "ai-1",
        prompt: "AI를 가장 잘 설명한 것은?",
        options: [
          {
            id: "a",
            label: "기계가 지능적 과제를 수행하게 하려는 넓은 목표·기술 묶음",
            correct: true,
            explain: "특정 챗봇 제품 하나를 뜻하지 않습니다.",
          },
          {
            id: "b",
            label: "항상 사실을 보장하는 시스템",
            correct: false,
            explain: "환각·오류 가능성이 있습니다.",
          },
          {
            id: "c",
            label: "모든 자동화 스크립트와 동일한 것",
            correct: false,
            explain: "규칙만으로 동작하는 자동화와 구분해야 합니다.",
          },
        ],
      },
      {
        id: "ai-2",
        prompt: "규칙 기반 소프트웨어의 한계로 가장 적절한 것은?",
        options: [
          {
            id: "a",
            label: "예외가 많은 인식·언어 문제에서 규칙 유지보수가 폭발한다",
            correct: true,
            explain: "그래서 학습 기반 접근이 동기 부여됩니다.",
          },
          {
            id: "b",
            label: "컴퓨터가 전기가 필요하다는 점",
            correct: false,
            explain: "핵심 한계가 아닙니다.",
          },
        ],
      },
    ],
  },
  {
    conceptId: "machine-learning",
    teachBack: "Machine Learning과 일반 프로그램의 가장 중요한 차이를 자신의 말로 설명해보세요.",
    checkpoints: [
      {
        id: "ml-1",
        prompt: "ML의 핵심 아이디어는?",
        options: [
          {
            id: "a",
            label: "예시 데이터에서 패턴을 학습해 새 입력을 예측한다",
            correct: true,
            explain: "모든 규칙을 손으로 적지 않습니다.",
          },
          {
            id: "b",
            label: "항상 딥러닝 신경망만 사용한다",
            correct: false,
            explain: "딥러닝은 ML의 한 방법입니다.",
          },
        ],
      },
      {
        id: "ml-2",
        prompt: "ML의 한계로 맞는 것은?",
        options: [
          {
            id: "a",
            label: "데이터가 편향되면 결과도 편향될 수 있다",
            correct: true,
            explain: "데이터 품질이 핵심입니다.",
          },
          {
            id: "b",
            label: "절대 틀리지 않는다",
            correct: false,
            explain: "분포 밖 입력에서 실패할 수 있습니다.",
          },
        ],
      },
    ],
  },
  {
    conceptId: "deep-learning",
    teachBack:
      "Deep Learning이 Machine Learning과 어떻게 다른지, 뇌 비유의 한계를 포함해 설명해보세요.",
    checkpoints: [
      {
        id: "dl-1",
        prompt: "Deep Learning을 가장 잘 설명한 것은?",
        options: [
          {
            id: "a",
            label: "여러 층으로 표현을 학습하는 머신러닝 방법",
            correct: true,
            explain: "ML의 하위 접근입니다.",
          },
          {
            id: "b",
            label: "인간 뇌와 동일한 구조",
            correct: false,
            explain: "비유일 뿐 동일하지 않습니다.",
          },
        ],
      },
      {
        id: "dl-2",
        prompt: "딥러닝이 필요해진 이유로 적절한 것은?",
        options: [
          {
            id: "a",
            label: "사람이 모든 중간 특징을 손으로 정하기 어려운 복잡한 입력",
            correct: true,
            explain: "이미지·언어 등이 대표 예입니다.",
          },
          {
            id: "b",
            label: "규칙 기반이 항상 더 정확해서",
            correct: false,
            explain: "반대 동기에 가깝습니다.",
          },
        ],
      },
    ],
  },
  {
    conceptId: "generative-ai",
    teachBack: "분류 모델과 생성 모델의 출력 차이를 일상 예시로 설명해보세요.",
    checkpoints: [
      {
        id: "gen-1",
        prompt: "Generative AI의 특징으로 맞는 것은?",
        options: [
          {
            id: "a",
            label: "조건에 맞는 새로운 샘플(텍스트·이미지 등)을 만들어 낸다",
            correct: true,
            explain: "분류(라벨)와 대비됩니다.",
          },
          {
            id: "b",
            label: "오직 LLM만을 의미한다",
            correct: false,
            explain: "이미지·음성 등 다른 생성 모델도 있습니다.",
          },
        ],
      },
      {
        id: "gen-2",
        prompt: "생성 결과를 다룰 때 올바른 태도는?",
        options: [
          {
            id: "a",
            label: "초안으로 보고 사람 검증·테스트를 거친다",
            correct: true,
            explain: "환각·오류 가능성이 있습니다.",
          },
          {
            id: "b",
            label: "항상 사실이므로 바로 배포한다",
            correct: false,
            explain: "위험한 오해입니다.",
          },
        ],
      },
    ],
  },
  {
    conceptId: "llm",
    teachBack:
      "LLM이 ‘다음 토큰 예측’을 한다는 말을 비개발자에게 설명해보세요. 사실 보장 여부와 함께.",
    checkpoints: [
      {
        id: "llm-1",
        prompt: "LLM의 동작 설명으로 가장 적절한 것은?",
        options: [
          {
            id: "a",
            label: "문맥을 바탕으로 다음 토큰을 예측하며 텍스트를 이어 쓴다",
            correct: true,
            explain: "교육용 핵심 모델입니다.",
          },
          {
            id: "b",
            label: "항상 검색 엔진처럼 최신 사실을 보장한다",
            correct: false,
            explain: "도구·RAG 없이는 한계가 있습니다.",
          },
        ],
      },
      {
        id: "llm-2",
        prompt: "틀린 설명은?",
        options: [
          {
            id: "a",
            label: "모든 AI는 LLM이다",
            correct: true,
            explain: "틀린 설명입니다. 비전·표 데이터 ML 등 LLM이 아닌 AI가 많습니다.",
          },
          {
            id: "b",
            label: "LLM은 생성 AI의 한 갈래일 수 있다",
            correct: false,
            explain: "이 문장은 타당합니다. 정답(틀린 설명)이 아닙니다.",
          },
        ],
      },
    ],
  },
]

export function getFoundationQuiz(conceptId: string): FoundationQuiz | undefined {
  return FOUNDATION_QUIZZES.find((q) => q.conceptId === conceptId)
}
