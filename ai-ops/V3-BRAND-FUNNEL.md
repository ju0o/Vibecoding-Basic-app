# V3 Brand Funnel — 3단계 퍼널·브랜드 분리 설계서

> 작성: 2026-07-18, PM(Hermes 학습 모드)
> 상위: `E:\hermes\projects\aivibe_v3_2_plan.md` (V3.2 PM 기획서)
> 역할: 본 파일은 교육 사이트 · AX 도구 · 구독 서비스 3개 브랜드와 퍼널 연결 규칙을 정의한다.
> 승인: V3.2-W7(홈 개편) 착수 전 운영자 승인 필수. V5(V14 강의)는 AX 도구 정식 출시 후.

---

## 1. 3단계 퍼널

```
┌─────────────────────────────────────────┐
│  Stage 1 — EDUCATION (무료 교육 사이트) │
│  - 비개발자 대상                         │
│  - 자연 트래픽 유입 (SEO·공유·커뮤니티)  │
│  - 한국어 콘텐츠 21강 + Atlas 부재료     │
└────────────────┬────────────────────────┘
                 │ 모든 강의 하단 AXPromoCard
                 ▼
┌─────────────────────────────────────────┐
│  Stage 2 — AX TOOL (무료 배포 프로그램)  │
│  - 학생이 다운로드 · 직접 사용            │
│  - 버그 리포트 → 운영자 검증·안정화       │
│  - V14 강의로 자연 소개                  │
└────────────────┬────────────────────────┘
                 │ 안정화 후 (KPI 도달 시)
                 ▼
┌─────────────────────────────────────────┐
│  Stage 3 — SUBSCRIPTION (구독 서비스)   │
│  - 무료체험 14일 → Pro → Team → Enterprise│
│  - 수익화                                 │
└─────────────────────────────────────────┘
```

---

## 2. 브랜드 분리 (3개 별도 rebrand 대상)

### 2.1 교육 사이트 (Stage 1)

| 항목 | 현재 | 후보 (논의용) |
|---|---|---|
| 이름 | AI Vibe Coding Master | 바이브 코딩 교실 / AI 코딩 안내서 / AI 코딩 라이브 / Vibe Coding Guide / 에이아이랑 |
| 도메인 | https://ju0o-ec967.web.app (Firebase 서브) | 커스텀 도메인 검토: vibe-coding.dev · aiclass.kr · vibe-coding.kr |
| 톤 | "quiet study desk" (DESIGN.md) | 유지 — 애플 미니멀 + paper-white + graphite + clear blue |
| 정체성(1줄) | 미명확 | **"AI와 함께 코딩하는 방법을 배우는 곳"** (가칭, W7에서 확정) |

**후보 평가 (논의용 메모):**
- **바이브 코딩 교실** — 익숙·직관, 그러나 다소 평범
- **AI 코딩 안내서** — guide 톤, 정체성 일치
- **AI 코딩 라이브** — 역동적, 그러나 "라이브"가 강의 방송 오해 가능
- **Vibe Coding Guide** — 영문 간결, 그러나 한국어 사용자에겐 거리감
- **에이아이랑** — "AI랑 (같이)" 이중 의미, 친근 + 애플 톤은 희석

### 2.2 AX 도구 (Stage 2)

| 항목 | 현재 | 후보 (논의용) |
|---|---|---|
| 내부 코드명 | Ju0AXSymphony | (공개 안 함) |
| 공개명 | 미정 — rebrand 전까지 강의 본문은 "AX Orchestra" 일반명 | **오케스트라 / AX Studio / 에이보 / VibePilot / Conductor / VibePie** |
| 톤 | Symphony 보드의 5열 칸반 + 애플 미니멀 | 유지 — 공개명이 바뀌어도 디자인은 동일 |
| 출처 표기명 | (W5-V14 스크린샷 하단 캡션) | **"Ju0Symphony"** (줄임명) — rebrand 후 새 공개명으로 교체 |

**후보 평가 (논의용 메모):**
- **Orchestra** — 기능 직관, 그러나 일반 명사라 트레이드마크 약세
- **AX Studio** — Apple-like, 보드·스튜디오 톤 일치
- **Aivo (에이보)** — AI+vo, 짧고 친근, "아이보" 발음 겹침(Ibo)
- **VibePilot** — 조종·지휘 의미, 길이 보통, 긍정적
- **Conductor** — 지휘자 원어, "Orchestra" 후보와 한 쌍 가능
- **VibePie** — 친근·유쾌, 그러나 사용자 "촌스러움/유치 강혐" 주의

### 2.3 구독 서비스 (Stage 3) — 향후 설계

| 항목 | 상태 |
|---|---|
| 이름 | 미정 (가칭 AX Pro / Orchestra Plus / VibePilot Team) |
| 가격대 | 초기 검토: Pro ₩9,900/월 · Team ₩29,900/월 (5인) · Enterprise 별도 협의 |
| 무료체험 | 14일 Pro 체험 |
| 전환 타이밍 | AX 도구 다운로드 5K · DAU 500 · 버그 리포트 월 10개 이하 · 평점 4.0+ |

→ Stage 3 상세 설계는 AX 도구 안정화 후 별도 PM 기획서. 본 파일엔 방향만 기록.

### 2.4 공통 감성
- **3개 브랜드 모두 동일 톤**: 애플 미니멀 + 글라스/시네마틱 + 깔끔·편의성 최우선
- 촌스럽고·유치·너저분 강혐 — 그라데이션·과장 표현·다채 색 금지
- 한국어 우선 (본문·CTA), 영문은 보조
- 디자인 시스템은 교육 사이트의 DESIGN.md를 소스로, AX 도구·구독도 동일 팔레트 확장

---

## 3. 강의 본문 명칭 사용 규칙

| 사용 위치 | 명칭 | 비고 |
|---|---|---|
| 메인 라인 21강 본문 (P01-V15) | **AX Orchestra** | rebrand 후 새 공개명으로 일괄 교체 |
| 스크린샷/로그 캡션 (W5-V14 한정) | **"Ju0Symphony"** | 작은 출처 표기용 줄임명, rebrand 후 공개명으로 교체 |
| AXPromoCard (모든 강의 하단) | "AX Orchestra (출시 예정)" → "다운로드 (무료)" → "Pro로 업그레이드" | 출시 단계별 자동 전환 |
| 푸터 "비영리 선언" | "본 사이트 운영자가 만든 AX 프로그램 AX Orchestra..." | 겸손한 어조 |
| 강의 URL slug | `ax-orchestra` (rebrand 후 변경 시 301 redirect) | SEO 안정성 |

---

## 4. 스크린샷·로그 출처 표기 템플릿 (W5-V14)

### 4.1 캡션 형식

```
출처: 본 사이트 개발자가 만든 AX 프로그램 "Ju0Symphony" 실 운영 로그
```

- 스타일: `--text-tertiary` 색상, 12px Caption, center 정렬
- 위치: 스크린샷/로그 인용 블록 하단 (이미지 바로 아래)
- 강의 흐름 방해 금지 — 본문과 분리된 caption 영역

### 4.2 인용 자료 출처

- `E:\hermes\learning\logs\` — Claude/Grok/Codex CLI 운영 로그
- `D:\Ju0AXSymphony\` — 실제 소스/스크린샷
- 운영자 승인 된 자료만 사용 (민감 정보 마스킹)

### 4.3 금지
- "Ju0AXSymphony" 전체명 강의 본문 노출 금지 (운영자 공개 민망)
- 가명 Project Alpha · Session Beta 등 과도한 마스킹 금지 — 실명/실명령어/실에러 사용 (신뢰성)
- 타 AX 도구(OpenAI Symphony 등)와의 혼동 유발 표현 금지

---

## 5. AXPromoCard 컴포넌트 상태별 전환

| 상태 | 트리거 | 카드 내용 | CTA |
|---|---|---|---|
| `coming_soon` | AX 도구 출시 전 (V3.2 사이트 첫 공개 ~ 출시) | "AX Orchestra — 출시 예정. 이론을 넘어 실전으로" | "알림 받기" (이메일 등록) |
| `live` | AX 도구 정식 무료 배포 | "AI와 함께 프로젝트를 운영해보세요. 무료" | "다운로드 (무료)" + "GitHub" |
| `pro_upgrade` | 구독 서비스 전환 후 | "더 많은 기능이 필요하면 Pro" | "Pro로 업그레이드" (부드러운 배지) |

- 카드는 localStorage로 닫기 처리 — 같은 강의에선 재표시 안 함
- 강제 팝업 금지, 본문 흐름 방해 금지
- V3.2 사이트 첫 공개 = `coming_soon` 상태 고정

---

## 6. 홈 개편 — 정체성 1줄 (W7)

### 6.1 Hero 형식 (가안, 최종은 Grok + Codex + 운영자 합의)

```
[작은 상단 바]  사이트명 (rebrand 전 "AI Vibe Coding Master")

[Hero H1, 큰 글씌]
AI와 함께 코딩하는 방법을 배우는 곳

[Hero 부제]
비개발자도 AI를 쓰면 만들 수 있다. 21강으로 첫 성공부터 AX 오케스트레이션까지.

[CTA] 처음부터 시작 →  [보조] AX Orchestra 출시 알림 받기
```

### 6.2 Hero 아래
- 메인 라인 진행도 (21강 중 현재 N) - mini-bar
- "처음부터 시작" 버튼 → `/learn/main/p01`
- 모바일: Hero 세로 간격, CTA가 접히지 않도록 고정

### 6.3 홈 하단
- AX Orchestra 소개 섹션 (coming_soon 톤)
- 푸터: "비영리 선언" 1문 + 운영자 인스타 링크

---

## 7. SEO·공유 전략 (Stage 1 트래픽)

### 7.1 기술 SEO
- `NEXT_PUBLIC_SITE_URL` 명시 → canonical/OG 통일
- 강의마다 meta description (한국어 키워드: 바이브 코딩, AI 코딩, 초보자)
- sitemap 자동 (npm run verify에 포함)
- 커스텀 도메인 검토 (Firebase 서브도메인은 SEO 약세)

### 7.2 자연 공유 채널
- 인스타그램 @ju0o___ (README에 명시) — 단편 카드 콘텐츠
- 한국 개발 커뮤니티 — 비개발자 질문에서 자연 링크
- 한국어 블로그/미디엄 — "AI 코딩 비개발자도 가능" 외부 포스팅
- 코드에이아이 (code.ai) 등 관련 커뮤니티

### 7.3 KPI (3개월 목표)
- 월간 순 방문자 (UV): 1K
- 평균 체류 시간: 강의 3분 이상
- AX Orchestra 다운로드 클릭률: 강의 하단 CTA 5%+
- 이메일 알림 등록률: 2% (이후 전환 풀)

---

## 8. Stage 2 → Stage 3 전환 기준 (KPI)

Stage 2에서 Stage 3으로 넘어가는 안정화 KPI (달성 시 구독 설계 시작):

- AX 도구 다운로드 수 > 5,000
- DAU > 500
- 버그 리포트 월 10개 이하
- 사용자 평균 평점 4.0+/5
- 운영자 사전 사용 4주+ 피드백 양호

→ 달성 후 별도 PM 기획서에서 Pro/Team/Enterprise 설계.

---

## 9. rebrand 절차 (브랜드 정식 결정 시)

### 9.1 결정 순서
1. 운영자가 후보 중 1차 선호 지정
2. Grok이 도메인 가용성·SNS 계정 가용성·한국어 인지도 조사
3. Codex가 한국어 발음/연상 검토 (촌스러움/유치 필터)
4. 운영자 최종 승인
5. V3-BRAND-FUNNEL.md에 최종 브랜드 기록
6. 강의 본문 일괄 find-replace (AX Orchestra → 새 공개명)
7. 도메인·SNS 계정 확보
8. AXPromoCard coming_soon/live 상태로 전환

### 9.2 rebrand 시 영향 범위
- 교육 사이트명: README, Hero, 푸터, meta 태그, sitemap, OG 이미지
- AX 도구명: V14 캡션, AXPromoCard, 다운로드 링크, GitHub 리포명
- 강의 URL slug: 301 redirect 필수
- 커스텀 도메인: DNS, SSL, Firebase Hosting 연결

---

## 10. 즉시 해야 할 일 (W0-C 산출물로서)

- [x] 본 V3-BRAND-FUNNEL.md 작성
- [ ] 운영자: 교육 사이트명 후보(2.1) 중 선호 1개 또는 추가 후보
- [ ] 운영자: AX 도구명 후보(2.2) 중 선호 1개 또는 추가 후보
- [ ] 운영자: Hero 1줄 정체성(6.1) "AI와 함께 코딩하는 방법을 배우는 곳" 승인 여부
- [ ] 운영자: V14 "Ju0Symphony" 출처 표기(§4) 승인 (이전 대화에서 이미 승인됨 — 문서화만)
- [ ] W7(홈 개편) 착수 전 rebrand 최종 승인

---

## 11. 관련 문서

- 상위 기획: `E:\hermes\projects\aivibe_v3_2_plan.md`
- 운영계약: `D:\Ai_vibe_coding_master\AGENTS.md` + `ai-ops/V3-APPENDIX.md`
- 작업 흐름: `ai-ops/V3-WORKFLOW.md`
- SubAgent 매핑: `ai-ops/V3-AGENT-MAP.md`
- 위임 템플릿: `ai-ops/V3-CONTEXT-PACKAGE.md`
- 메인 라인 인덱스: `ai-ops/V3-MASTER-TOC.md` (W1에서 작성)

Last updated: 2026-07-18
