import type { CheckpointOutcome, CheckpointQuestion } from "../core/NodeCheckpoint"

export const D1_QUESTIONS: readonly CheckpointQuestion[] = [
  {
    id: "d1-q1",
    question: "Token을 가장 정확하게 설명한 것은?",
    choices: [
      "모델이 알고 있는 사실 하나",
      "모델이 텍스트 입력과 출력을 다루는 단위",
      "의미가 비슷한 문서를 저장하는 데이터베이스",
      "사람의 생각을 복제한 내부 문장",
    ],
    answer: 1,
    whyCorrect:
      "토큰은 모델 입력과 출력에서 사용되는 단위이며, 항상 한 글자나 한 단어와 일치하지는 않는다.",
    whyWrong:
      "사실 저장 단위가 아니라 텍스트 처리 단위다. 문서 저장은 vector store 같은 별도 구성요소다. 토큰을 사람의 생각으로 해석할 근거가 없다.",
  },
  {
    id: "d1-q2",
    question: "Embedding 검색 결과의 유사도가 높으면 답이 사실이라고 결론 내릴 수 있을까?",
    choices: [
      "그렇다. 숫자 거리가 가까우면 사실이다.",
      "그렇다. Embedding은 출처를 자동 검증한다.",
      "아니다. 관련 가능성을 보여 주는 신호이며 사실성은 근거로 별도 확인해야 한다.",
      "아니다. Embedding은 텍스트와 관계가 없다.",
    ],
    answer: 2,
    whyCorrect: "의미 유사도와 주장에 대한 근거 확인은 서로 다른 단계다.",
    whyWrong:
      "벡터 거리는 관련성을 비교하는 데 쓰이지 사실성을 증명하지 않는다. Embedding 자체에는 출처 검증 절차가 없다. Embedding은 텍스트를 숫자 벡터로 표현해 의미 유사도 비교에 사용할 수 있다.",
  },
  {
    id: "d1-q3",
    question: "같은 요청에서 다른 표현의 답이 나올 수 있다는 관찰이 보여 주는 것은?",
    choices: [
      "모델은 언제나 무작위로만 답한다.",
      "모델의 자연스러운 문장은 항상 틀리다.",
      "생성 결과는 달라질 수 있으므로 요구 조건과 사실 근거를 따로 확인해야 한다.",
      "한 번 답을 받으면 더 이상 검토할 필요가 없다.",
    ],
    answer: 2,
    whyCorrect: "결과 형식과 내용의 정확성을 관찰 가능한 기준으로 검토해야 한다.",
    whyWrong:
      "출력 차이가 곧 아무 패턴도 없다는 뜻은 아니다. 자연스러움이 사실성을 보장하지 않는다는 말이지, 모든 자연스러운 문장이 틀렸다는 뜻은 아니다. 첫 출력은 검토와 개선의 시작점이다.",
  },
]

export const D1_OUTCOMES: readonly CheckpointOutcome[] = [
  {
    id: "O-D1-1",
    label: "한 문장이 Token → Embedding → Transformer → LLM 흐름을 거치는 사례를 관찰했다",
    level: "Observed",
  },
  {
    id: "O-D1-2",
    label: "LLM·Transformer·Token·Embedding을 올바른 위치에 놓을 수 있다",
    level: "Assisted",
  },
  {
    id: "O-D1-3",
    label: "새로운 AI 요청에 대해 네 개념의 흐름을 도움 없이 설명할 수 있다",
    level: "Independent",
  },
  {
    id: "O-D1-4",
    label:
      "자연스러운 답과 사실인 답이 같은 뜻이 아닌 이유를 네 개념 중 둘 이상과 연결해 설명할 수 있다",
    level: "Explainable",
  },
]

export const D1_TEACH_BACK_PROMPT =
  "내가 AI에게 한 문장을 보낸 뒤 답이 나오기까지 LLM, Transformer, Token, Embedding은 각각 어떤 역할을 하며, 왜 그 답을 그대로 사실이라고 믿으면 안 되는가?"
