"use client"

import { type InteractiveStep, StepPlayer } from "@/features/atlas/interactive/StepPlayer"

const DEMOS: Readonly<
  Record<string, { readonly title: string; readonly steps: readonly InteractiveStep[] }>
> = {
  ai: {
    title: "규칙 기반 vs 학습 기반",
    steps: [
      {
        id: "1",
        title: "규칙 기반",
        body: "사람이 ‘만약 스팸 단어가 있으면 차단’ 같은 규칙을 직접 적습니다.",
      },
      {
        id: "2",
        title: "예외 발생",
        body: "새로운 표현·오탈자가 나타나면 규칙을 계속 추가해야 합니다.",
      },
      {
        id: "3",
        title: "학습 기반",
        body: "많은 예시(스팸/정상)를 주고, 모델이 패턴을 학습하게 합니다.",
      },
      {
        id: "4",
        title: "검증",
        body: "새 메일로 시험해 보고, 틀린 경우를 데이터·평가로 개선합니다.",
      },
    ],
  },
  "machine-learning": {
    title: "예시 → 학습 → 예측",
    steps: [
      { id: "1", title: "예시 데이터", body: "입력과 정답 라벨이 붙은 표를 준비합니다." },
      { id: "2", title: "학습", body: "모델이 오류를 줄이도록 내부 파라미터를 조정합니다." },
      { id: "3", title: "새 입력", body: "본 적 없는 입력을 넣습니다." },
      {
        id: "4",
        title: "예측",
        body: "학습한 패턴으로 라벨·점수를 출력합니다. 틀릴 수 있어 평가가 필요합니다.",
      },
    ],
  },
  "deep-learning": {
    title: "계층적 표현",
    steps: [
      { id: "1", title: "입력", body: "픽셀·파형·토큰 같은 원시 입력이 들어옵니다." },
      { id: "2", title: "얕은 층", body: "간단한 패턴(경계, 짧은 조각)을 잡습니다." },
      {
        id: "3",
        title: "깊은 층",
        body: "더 추상적인 조합 표현을 만듭니다. 뇌와 동일하지 않습니다.",
      },
      { id: "4", title: "결과", body: "분류·탐지 등 목표 출력을 냅니다." },
    ],
  },
  "generative-ai": {
    title: "분류 vs 생성",
    steps: [
      { id: "1", title: "분류 과제", body: "입력 → 라벨(스팸/정상, 고양이/강아지)." },
      { id: "2", title: "생성 과제", body: "조건 → 새로운 문장·이미지 샘플." },
      { id: "3", title: "공통점", body: "둘 다 데이터에서 패턴을 학습할 수 있습니다." },
      {
        id: "4",
        title: "주의",
        body: "생성 결과는 그럴듯해도 사실이 아닐 수 있어 검증이 필요합니다.",
      },
    ],
  },
  llm: {
    title: "토큰과 다음 예측",
    steps: [
      { id: "1", title: "텍스트", body: "사람이 읽는 문장이 입력됩니다." },
      { id: "2", title: "토큰", body: "모델이 다루기 쉬운 조각으로 나눕니다(교육용 단순화)." },
      { id: "3", title: "컨텍스트", body: "최근 토큰들이 문맥 창에 들어갑니다." },
      {
        id: "4",
        title: "다음 토큰",
        body: "다음에 올 조각을 예측하며 출력을 이어 갑니다. 진실 보장은 아닙니다.",
      },
    ],
  },
}

export function FoundationMiniDemo({ conceptId }: { readonly conceptId: string }) {
  const demo = DEMOS[conceptId]
  if (!demo) {
    return null
  }
  return <StepPlayer steps={demo.steps} title={demo.title} />
}
