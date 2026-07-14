# Assessment — Day 1 첫 성공

```yaml
lesson_id: d1-first-success
type: assessment
outcomes: [O1,O2,O3,O4,O5,O6,O7,O8,O9,O10,O11,O12,O13]
site_wired: false
```

---

## 1. 개념 Checkpoint (선택형 · 상황형)

**Q1.** 교육용 바이브코딩에서 사람의 역할로 **가장 가까운** 것은?  
A. 코드를 절대 보지 않는다  
B. 목표를 정하고 결과를 확인·수정·설명한다  
C. Node 버전 숫자를 외운다  
D. 유료 AI만 사용한다  

**정답:** B  

**Q2.** `npm run dev` 가 실패하는 흔한 이유는?  
A. 인터넷이 너무 빨라서  
B. 해당 프로젝트 `package.json`에 `dev` 스크립트가 없을 수 있어서  
C. HTML 파일 이름이 길어서  
D. 브라우저가 Chrome이 아니라서  

**정답:** B  

**Q3.** Path A에서 HTML을 브라우저로 연 것은 무엇을 보여 주나?  
A. 회사 배포 완료  
B. 요청한 결과물이 **실행 환경(브라우저)** 에서 보임  
C. Node가 반드시 설치됨  
D. Git push 성공  

**정답:** B  

**합격 가이드:** 3문제 중 2 이상 (Quiz 신호). Quiz 만점으로 Outcome 대체 **불가**.

---

## 2. 실제 수행 체크리스트

| ID | 수행 | Path | 자가 체크 |
|---|---|---|---|
| O2 | AI에게 작은 결과물 요청 | A | [ ] |
| O3 | 수정 요청 ≥1 | A | [ ] |
| O11 | 브라우저에서 결과 확인 | A/B | [ ] |
| O5 | VS Code(또는 대안) 설치 여부 확인 | B | [ ] |
| O6–O8 | Node 확인 · 터미널 · node/npm -v | B | [ ] |
| O9–O10 | 폴더 열기 · 서버 시도 | B | [ ] |
| O13 | 오류 메시지 복사 전달 (실·모의) | A/B | [ ] |

---

## 3. 오류 대응 시나리오

**시나리오 S1:** 터미널에 `npm : 용어 'npm'이 cmdlet…` / `command not found: npm`

학생 행동 기대:

1. 당황 문구 대신 메시지 전체 복사  
2. Node 설치·터미널 재시작 여부 확인  
3. AI/강사에게 OS + 명령 + 오류 전달  

평가: O13 Assisted 이상.

**시나리오 S2:** `Missing script: "dev"`

기대: package.json scripts를 열어 존재하는 이름 확인 (O12 연결).

---

## 4. Teach-back

구두 또는 한 줄 제출:

1. “바이브코딩과 전통 코딩의 차이를 한 문장으로.” (O1)  
2. “IDE는 한 줄로 무엇인가요?” (O4)  
3. “package.json은 왜 있나요?” (O12)  

| 수준 | 예시 신호 |
|---|---|
| Observed | 자료를 읽어 줌 |
| Assisted | 힌트 후 완성 |
| Explainable | 힌트 없이 이유 포함 |

---

## 5. Independent 수행 평가 (권장)

타이머 15분, 체크리스트 가림:

1. 새 주제 문구로 HTML 다시 받기 → 저장 → 열기  
2. `node -v` 실행  
3. (가능 시) 프로젝트에서 install/run 재시도  

Independent = 힌트 카드 없이 완료.

---

## 6. 최소 완료 조건 (Day 1 Complete — Minimum)

모두 충족:

1. Path A: O2, O3, O11 = **Independent**  
2. O1, O4 = **Assisted** 이상 (teach-back 또는 체크)  
3. Path B: O5, O7, O8 = **Assisted** 이상  
4. O6 = 설치 시도 또는 “권한 없음” **문서화**  
5. O13 = **Assisted** (모의 오류 OK)  
6. Quiz ≥ 2/3 **또는** teach-back 2/3 항목 Assisted+  

O9–O10, O12 full Explainable **불필요** (권장 쪽).

### Partial Complete — Path A only

설치 불가 시:

- Minimum에서 Path B 항목 대신 `path_b_deferred=true` + 재시도 계획  
- 코스 전체 진행에서 Path B 플래그 유지 (Complete 위장 금지)

---

## 7. 권장 완료 조건 (Recommended)

Minimum + 

- O9, O10 Independent  
- O12 Assisted+  
- 실제 로컬 localhost 성공 증거  
- O1/O4/O12 중 2개 Explainable  

---

## 8. 재학습 조건

다음 중 하나면 재학습 루프:

- Path A 수정 후에도 화면 변화를 설명 못함  
- 오류를 숨기거나 삭제함 (O13 거부)  
- `npm run dev`를 모든 프로젝트 만능 주문처럼 암기만 함 (Q2 오답 + 실습 오해)  

재학습 경로: 실습 가이드 Path A → 오류 시나리오 → Outcome 재체크.

---

## 9. Studio 신호 (나중 구현)

| learn | practice | quiz | outcome |
|---|---|---|---|
| 본문 섹션 체크 | Path A/B 증거 | Q1–3 | O1–O13 레벨 |

Complete 공식: STAGE_COMPLETION_SPEC — **Outcome 게이트**.

---

## 10. 채점 기록 예시

```text
student: (name)
path_a: pass
path_b: deferred (no admin)
O2/O3/O11: Independent
O1/O4: Assisted
O5/O7/O8: Assisted
O13: Assisted (simulated)
quiz: 3/3
verdict: MINIMUM_COMPLETE_WITH_PATH_B_DEFERRED
```
