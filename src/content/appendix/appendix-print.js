(function () {
  const guide = {
    'curriculum-one-page.html': {
      session: '1회차 AI 이해',
      timing: '첫 수업 시작 또는 커리큘럼 소개 시점',
      action: '6주 동안 무엇을 배우고 무엇을 만들지 전체 흐름을 확인합니다.',
      download: '한 장으로 출력해 첫 수업 책상 위에 두거나, 1회차 종료 시 숙제 자료와 함께 배포합니다.',
    },
    'ai-types-specialized-catalog.html': {
      session: '1회차 AI 이해',
      timing: 'AI 종류와 분야별 특화 도구를 설명할 때',
      action: '내가 만들고 싶은 결과물에 맞는 AI 도구를 표시합니다.',
      download: '직접 링크보다 서비스명 검색으로 공식 사이트를 찾아 접속합니다.',
    },
    'handout-session1.html': {
      session: '1회차 AI 이해',
      timing: '수업 중 핵심 개념을 요약해 나눠줄 때',
      action: '커리큘럼, 주요 AI 도구, 프롬프트 기본 구조를 한 장에서 확인합니다.',
      download: '프린트해서 1회차 핵심 요약 자료로 배포합니다.',
    },
    'handout-session2-prep.html': {
      session: '1회차 숙제 / 2회차 바이브코딩 준비',
      timing: '1회차 마지막 안내와 2회차 시작 전 점검',
      action: 'Windows 또는 Mac 환경에 맞게 Node.js, VS Code, AI 코딩 도구를 설치하고 명령어로 확인합니다.',
      download: 'Node.js LTS, Visual Studio Code, Cursor, Kiro, Antigravity, Windsurf를 서비스명으로 검색해 공식 사이트에서 다운로드합니다.',
    },
    'session-handout-map.html': {
      session: '1~6회차 전체',
      timing: '강의 시작 전 또는 자료 배포 전',
      action: '오늘 회차에서 어떤 별첨을 꺼내야 하는지 확인합니다.',
      download: '프린트해서 강사용 목차 또는 수강생 자료 묶음 맨 앞에 둡니다.',
    },
    'script-session1.html': {
      session: '1회차 AI 이해',
      timing: '1강 준비 또는 리허설 시점',
      action: 'AI를 도구로 설명하고, 다양한 AI 예시를 보여준 뒤 2회차 준비 숙제로 자연스럽게 연결합니다.',
      download: '강사용으로 출력해 발표자 노트처럼 사용합니다. 수강생 배포용이 아니라 강사 리허설용입니다.',
    },
    'script-session2.html': {
      session: '2회차 바이브코딩',
      timing: '2강 준비 또는 실습 운영 전',
      action: 'AI 설계 → AI IDE 구현 → 결과 공유 흐름을 슬라이드별로 준비합니다.',
      download: '강사용으로 출력해 발표자 노트처럼 사용합니다. 수강생 배포용이 아니라 강사 리허설용입니다.',
    },
    'script-session3.html': {
      session: '3회차 개발 용어 이해',
      timing: '3강 준비 또는 리허설 시점',
      action: '건축 시뮬레이션, 프론트/백엔드/DB/API 흐름, 파일 위치 감각을 슬라이드별로 준비합니다.',
      download: '강사용으로 출력해 발표자 노트처럼 사용합니다. 수강생 배포용이 아니라 강사 리허설용입니다.',
    },
    'script-session4.html': {
      session: '4회차 파일 구조 이해',
      timing: '4강 준비 또는 실습 운영 전',
      action: '프로젝트 루트와 src를 설명하고, 파일 선택 → 코드 확인 → 브라우저 변화 시연을 단계별로 진행합니다.',
      download: '강사용으로 출력해 발표자 노트처럼 사용합니다. 수강생 배포용이 아니라 강사 리허설용입니다.',
    },
    'study-session4.html': {
      session: '4회차 파일 구조 이해',
      timing: '4강 수업 전 파일 구조와 예상 질문을 공부할 때',
      action: '프로젝트 구조의 변형, 파일 확장자, package 파일과 수강생 예상 질문의 답변 기준을 확인합니다.',
      download: '강사용으로 출력하거나 휴대폰 PDF로 저장해 수업 전 공부자료로 사용합니다.',
    },
    'handout-session4.html': {
      session: '4회차 파일 구조 이해 · 실습',
      timing: '파일 구조 설명 직후와 30분 실습 시간',
      action: '1페이지에서 파일 역할을 확인하고, 2페이지에 내 프로젝트의 화면 → 검색 → 파일 → 수정 → 검증 경로를 기록합니다.',
      download: 'A4 양면 또는 2장으로 출력해 수강생에게 배포합니다.',
    },
    'script-session5.html': {
      session: '5회차 배포와 보안 그리고 데이터',
      timing: '5강 준비 또는 배포 실습 전',
      action: '배포 흐름, 환경변수, 데이터 저장, API 성공/실패 상태를 강의 흐름에 맞게 설명합니다.',
      download: '강사용으로 출력해 발표자 노트처럼 사용합니다. 수강생 배포용이 아니라 강사 리허설용입니다.',
    },
    'script-session6.html': {
      session: '6회차 쇼케이스 및 Q&A',
      timing: '6강 발표 운영 전',
      action: '발표 순서, 피드백 기준, Q&A 분류, 다음 단계 안내를 준비합니다.',
      download: '강사용으로 출력해 발표자 노트처럼 사용합니다. 수강생 배포용이 아니라 강사 리허설용입니다.',
    },
    'instructor-study-guide.html': {
      session: '1~6회차 전체',
      timing: '각 회차 수업 전 예습 또는 질문 대응 전',
      action: '강사가 어디까지 설명하고 어디서 멈출지 기준을 확인합니다.',
      download: '강사용으로 출력해 발표자 노트처럼 사용합니다. 수강생 배포용이 아니라 강사 리허설용입니다.',
    },
    'download-install-locations.html': {
      session: '1회차 숙제 / 2회차 시작 전',
      timing: 'Node, Git, VS Code, AI IDE 설치 전',
      action: '검색어와 설치 후 확인 명령어를 따라 준비합니다.',
      download: '검색창에 프로그램명 + download를 입력하고 공식 사이트에서 설치합니다.',
    },
    'practice-log.html': {
      session: '2~6회차 실습 공통',
      timing: '각 회차 실습 시작과 마무리',
      action: '오늘 만든 것, 막힌 에러, AI에게 물어본 내용을 기록합니다.',
      download: '매 회차 한 장씩 출력해서 수강생 개인 기록지로 사용합니다.',
    },
    'preclass-setup.html': {
      session: '1회차 마지막 숙제 / 2회차 바이브코딩 준비',
      timing: '1회차 종료 직전 배포, 2회차 시작 전 점검',
      action: 'Node.js, Git, VS Code 또는 AI IDE 설치 후 체크박스를 확인합니다.',
      download: 'Node.js LTS, Git, Visual Studio Code, Cursor/Kiro/Antigravity/Windsurf 중 하나를 공식 다운로드 페이지에서 설치합니다.',
    },
    'ai-tools.html': {
      session: '1회차 AI 이해',
      timing: '다양한 AI 도구를 소개할 때',
      action: 'AI 도구가 분야별로 다르다는 것을 확인하고 본인에게 필요한 도구를 표시합니다.',
      download: '설치형 도구는 공식 사이트에서 다운로드, 웹 도구는 브라우저에서 서비스명으로 검색해 접속합니다.',
    },
    'vscode-ai-guide.html': {
      session: '1회차 숙제 / 2회차 실습 환경',
      timing: 'AI 코딩환경 설치를 안내할 때',
      action: 'VS Code와 AI IDE 중 하나를 준비하고 터미널 열기까지 확인합니다.',
      download: 'Visual Studio Code, Cursor, Kiro, Antigravity, Windsurf를 각각 공식 다운로드 페이지에서 설치합니다.',
    },
    'command-cheatsheet.html': {
      session: '2~5회차 실습 공통',
      timing: '터미널 명령어를 입력하기 전',
      action: '명령어를 외우지 말고 필요한 줄을 찾아 그대로 입력합니다.',
      download: '새 프로젝트 폴더에서 `npm install`, `npm run dev`, `npm run build`, `git status`를 확인합니다.',
    },
    'ai-instruction-templates.html': {
      session: '2회차 바이브코딩 / 3~5회차 실습 반복',
      timing: 'AI에게 설계, 구현, 수정 요청을 보낼 때',
      action: '빈칸만 바꿔 GPT/Gemini/Claude 또는 AI IDE에 붙여넣습니다.',
      download: '별도 다운로드 없이 출력해서 책상 위에 두고, 필요한 문장을 직접 타이핑하거나 복사합니다.',
    },
    'error-guide.html': {
      session: '2~5회차 실습 공통',
      timing: 'npm, 실행, 화면 오류가 발생했을 때',
      action: '에러 전체를 복사하고, 자료의 해결 루프 순서대로 AI에게 질문합니다.',
      download: '터미널에서 에러가 보이면 먼저 `Ctrl + C`로 멈춘 뒤 에러 문장을 복사합니다.',
    },
    'glossary.html': {
      session: '3회차 개발 용어 이해',
      timing: '프론트엔드, 백엔드, API, DB 같은 용어 설명 중',
      action: '헷갈리는 단어를 찾아 쉬운 설명과 실제 예시를 확인합니다.',
      download: '프린트해서 3회차 이후 계속 책상 옆 용어 사전으로 사용합니다.',
    },
    'session-03-ui-ux-terms.html': {
      session: '3회차 개발 용어 이해',
      timing: 'UI/UX 슬라이드 직후 또는 수업 종료 전 요약 시점',
      action: '서비스별 화면, UI/UX 상황, 애니메이션 10종을 찾아 AI에게 원하는 화면과 행동을 설명할 때 참고합니다.',
      download: '이미지와 외부 링크 없이 텍스트 설명과 요청 예시만 있는 프린트물로 배포합니다.',
    },
    'session-03-feature-review-workbook.html': {
      session: '3회차 개발 용어 이해 · 실습',
      timing: '이론 종료 후 각자 프로젝트의 핵심 기능을 점검할 때',
      action: '기능 하나를 골라 사용자 행동, 화면 상태 6가지, 실패 복구, 애니메이션 목적과 AI 요청문을 직접 작성합니다.',
      download: 'A4 양면 또는 2장으로 인쇄해 실습 기록지와 함께 사용합니다.',
    },
    'diagrams.html': {
      session: '3회차 프로그램 구조 / 5회차 데이터 흐름',
      timing: 'API와 DB가 움직이는 그림을 설명할 때',
      action: '그림을 보며 프론트, API, 서버, DB, 응답 위치를 손으로 짚어봅니다.',
      download: '링크보다 그림 자체를 프린트해 흐름 설명 자료로 사용합니다.',
    },
    'mvp-worksheet.html': {
      session: '2회차 첫 실습 / 6회차 발표 준비',
      timing: '각자 만들 작은 프로젝트를 정리할 때',
      action: '기능을 줄이고 6주 안에 보여줄 최소 버전을 적습니다.',
      download: '프린트해서 아이디어를 손으로 적고, 이후 AI에게 설계 요청할 때 참고합니다.',
    },
    'project-structure.html': {
      session: '4회차 파일 구조 이해',
      timing: 'AI가 만든 프로젝트 폴더를 열어볼 때',
      action: 'src, 페이지, 컴포넌트, 파일 확장자, package 파일의 역할을 확인하고 안전한 수정 순서를 따라갑니다.',
      download: '프로젝트 폴더를 열고 같은 이름의 파일/폴더를 직접 찾아봅니다.',
    },
    'databases.html': {
      session: '5회차 데이터 이해',
      timing: '데이터베이스와 저장 구조를 설명할 때',
      action: 'Firebase, Supabase, SQL/NoSQL이 어떤 역할인지 비교합니다.',
      download: '실습에서는 Supabase 또는 Firebase를 서비스명으로 검색해 공식 콘솔에서 프로젝트를 만듭니다.',
    },
    'deployment-checklist.html': {
      session: '5회차 배포와 보안',
      timing: '배포 직전 마지막 확인',
      action: '빌드, 모바일 화면, API 키, 환경변수, 공개 링크를 순서대로 확인합니다.',
      download: 'Vercel, Netlify, Railway 중 사용할 서비스를 검색해 공식 대시보드에서 배포합니다.',
    },
    'presentation-template.html': {
      session: '6회차 쇼케이스 발표',
      timing: '발표 자료를 준비할 때',
      action: '무엇을 만들었는지, 누구를 위한 것인지, 다음 개선점을 채웁니다.',
      download: '프린트해서 발표 전 5분 리허설용 큐시트로 사용합니다.',
    },
    'features-ideas.html': {
      session: '6회차 이후 / 응용반 예고',
      timing: '기초반 이후 고도화 방향을 이야기할 때',
      action: '인증, 결제, 알림, 관리자 기능 중 다음에 붙일 기능을 고릅니다.',
      download: '기초반에서는 참고만 하고, 응용반에서 실제 구현 주제로 사용합니다.',
    },
    'instructor-agent-mcp-skill-research.html': {
      session: '심화과정 / AI Workflow Architect',
      timing: 'Agent, MCP, Skill, SubAgent, Plugin을 강의하기 전',
      action: '공식자료 읽는 순서, 개념 경계, 시각 슬라이드 장면, 별도 심화과정 분리 기준을 확인합니다.',
      download: '강사용 연구자료입니다. 수강생에게 배포하지 않고 강사자료실에서 PDF로 저장해 수업 전 공부자료로 사용합니다.',
    },
  };

  const filename = decodeURIComponent(location.pathname.split('/').pop() || '');
  const data = guide[filename];
  if (!data) return;

  document.querySelectorAll('.appendix-use-card').forEach((card) => card.remove());
  if (document.querySelector('.appendix-guide-fab')) return;

  const html = `
    <button class="appendix-guide-fab" type="button" aria-expanded="false" aria-controls="appendix-guide-panel">강사용 안내</button>
    <div class="appendix-guide-backdrop" data-guide-close></div>
    <aside class="appendix-guide-panel" id="appendix-guide-panel" aria-label="강사용 자료 안내">
      <div class="appendix-guide-head">
        <div>
          <div class="appendix-guide-kicker">TEACHER MEMO</div>
          <div class="appendix-guide-title">자료 사용 안내</div>
        </div>
        <button class="appendix-guide-close" type="button" aria-label="닫기" data-guide-close>×</button>
      </div>
      <div class="appendix-guide-body">
        <div class="appendix-guide-item">
          <div class="appendix-guide-label">사용 회차</div>
          <div class="appendix-guide-text"><strong>${data.session}</strong></div>
        </div>
        <div class="appendix-guide-item">
          <div class="appendix-guide-label">수업 중 사용 시점</div>
          <div class="appendix-guide-text">${data.timing}</div>
        </div>
        <div class="appendix-guide-item">
          <div class="appendix-guide-label">수강생이 할 일</div>
          <div class="appendix-guide-text">${data.action}</div>
        </div>
        <div class="appendix-guide-item">
          <div class="appendix-guide-label">다운로드/명령어 안내</div>
          <div class="appendix-guide-text">${data.download}</div>
        </div>
        <div class="appendix-guide-note">이 강사용 안내는 화면에서만 보이고, 인쇄/PDF 저장 시 제외됩니다.</div>
      </div>
    </aside>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  const button = document.querySelector('.appendix-guide-fab');
  const panel = document.querySelector('.appendix-guide-panel');
  const backdrop = document.querySelector('.appendix-guide-backdrop');
  const closeEls = document.querySelectorAll('[data-guide-close]');

  function setOpen(open) {
    panel.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
  }

  button.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  closeEls.forEach((el) => el.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
})();

