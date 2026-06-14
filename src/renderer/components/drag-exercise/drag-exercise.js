const EXERCISES = {
  'dev-terms': {
    title: '프론트엔드 / 백엔드 / 도구를 분류해보세요.',
    zones: [
      ['frontend', '프론트엔드'],
      ['backend', '백엔드'],
      ['tooling', '개발 도구'],
    ],
    items: [
      ['button', '버튼 UI', 'frontend'],
      ['card', '화면 카드', 'frontend'],
      ['api', 'API 라우트', 'backend'],
      ['db', '데이터베이스', 'backend'],
      ['npm', 'npm install', 'tooling'],
      ['deploy', 'deploy', 'tooling'],
    ],
  },
  'program-spaces': {
    title: '프로그램 안의 위치를 가게에 빗대어 분류해보세요.',
    zones: [
      ['frontend', '손님 공간'],
      ['backend', '직원 공간'],
      ['storage', '창고'],
      ['delivery', '전달자'],
    ],
    items: [
      ['search', '검색창', 'frontend'],
      ['order', '주문 버튼', 'frontend'],
      ['login', '로그인 확인', 'backend'],
      ['calculate', '결제 금액 계산', 'backend'],
      ['members', '회원정보 보관', 'storage'],
      ['orders', '주문내역 보관', 'storage'],
      ['gpt', 'GPT에 질문 전달', 'delivery'],
      ['weather', '날씨 정보 요청', 'delivery'],
    ],
  },
  'env-safety': {
    title: '공개해도 되는 값과 숨겨야 하는 값을 나눠보세요.',
    zones: [
      ['public', '공개 가능'],
      ['secret', '숨기기'],
    ],
    items: [
      ['title', 'NEXT_PUBLIC_SITE_TITLE', 'public'],
      ['color', 'THEME_COLOR', 'public'],
      ['openai', 'OPENAI_API_KEY', 'secret'],
      ['db', 'DATABASE_URL', 'secret'],
      ['password', 'ADMIN_PASSWORD', 'secret'],
    ],
  },
  'vibe-tools': {
    title: '바이브코딩 흐름에서 각 작업을 어디에 맡길지 나눠보세요.',
    zones: [
      ['chat', '설계 AI'],
      ['ide', 'AI IDE'],
      ['terminal', '터미널'],
      ['browser', '브라우저'],
    ],
    items: [
      ['brief', '아이디어 정리', 'chat'],
      ['prompt', 'IDE용 프롬프트 만들기', 'chat'],
      ['code', '파일 생성·수정', 'ide'],
      ['fix', '에러 수정 요청', 'ide'],
      ['install', 'npm install', 'terminal'],
      ['dev', 'npm run dev', 'terminal'],
      ['preview', '화면 확인', 'browser'],
      ['mobile', '모바일 화면 확인', 'browser'],
    ],
  },
};

const ZONE_META = {
  chat: { icon: '설', hint: '질문 · 정리 · 변환' },
  ide: { icon: '코', hint: '파일 생성 · 코드 수정' },
  terminal: { icon: '$', hint: '설치 · 실행 명령' },
  browser: { icon: '눈', hint: '화면 · 반응 확인' },
  frontend: { icon: 'UI', hint: '사용자가 보는 화면' },
  backend: { icon: 'DB', hint: '뒤에서 처리하는 로직' },
  tooling: { icon: '툴', hint: '실행과 관리 도구' },
  storage: { icon: 'DB', hint: '데이터를 오래 보관' },
  delivery: { icon: 'API', hint: '요청과 결과를 전달' },
  public: { icon: '공', hint: '보여도 되는 값' },
  secret: { icon: '잠', hint: '절대 숨길 값' },
};

const ITEM_ICONS = {
  brief: '아이디어',
  prompt: '프롬프트',
  code: '파일',
  fix: '수정',
  install: '설치',
  dev: '실행',
  preview: '화면',
  mobile: '모바일',
  search: '화면',
  order: '버튼',
  login: '확인',
  calculate: '계산',
  members: '회원',
  orders: '주문',
  gpt: 'AI',
  weather: '날씨',
};

export class DragExercise {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.exercise = EXERCISES[host.dataset.exercise] || EXERCISES['dev-terms'];
    this.score = 0;
    this.total = this.exercise.items.length;
    this.dragging = null;
    this.render();
  }

  static mount(host, context) {
    return new DragExercise(host, context);
  }

  render() {
    this.host.classList.add('edu-sim', 'drag-exercise');
    this.host.innerHTML = `
      <div class="edu-panel drag-panel">
        <div class="drag-head">
          <div>
            <div class="drag-kicker">DRAG EXERCISE</div>
            <div class="drag-title">${this.exercise.title}</div>
          </div>
          <div class="drag-score" data-score>0 / ${this.total}</div>
        </div>
        <div class="drag-layout">
          <div class="drag-items">
            <div class="drag-column-label">작업 카드</div>
            ${this.exercise.items.map(([id, label, answer]) => `
              <button class="drag-item" draggable="true" data-item="${id}" data-answer="${answer}">
                <span class="drag-item-icon">${ITEM_ICONS[id] || '작업'}</span>
                <span class="drag-item-label">${label}</span>
              </button>
            `).join('')}
          </div>
          <div class="drag-zones">
            ${this.exercise.zones.map(([id, label]) => {
              const meta = ZONE_META[id] || { icon: label.slice(0, 2), hint: '알맞은 작업을 놓기' };
              return `
              <div class="drop-zone" data-zone="${id}">
                <div class="drop-zone-head">
                  <span class="drop-zone-icon">${meta.icon}</span>
                  <span>
                    <strong>${label}</strong>
                    <small>${meta.hint}</small>
                  </span>
                </div>
                <div class="drop-bin"></div>
              </div>
            `}).join('')}
          </div>
        </div>
        <div class="edu-status" data-status>카드를 끌어 정확한 칸에 놓아보세요.</div>
      </div>
    `;

    this.status = this.host.querySelector('[data-status]');
    this.scoreEl = this.host.querySelector('[data-score]');
    this.bind();
  }

  bind() {
    this.host.querySelectorAll('.drag-item').forEach((item) => {
      item.addEventListener('dragstart', (event) => {
        this.dragging = item;
        item.classList.add('is-dragging');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', item.dataset.item);
      });
      item.addEventListener('dragend', () => item.classList.remove('is-dragging'));
    });

    this.host.querySelectorAll('.drop-zone').forEach((zone) => {
      zone.addEventListener('dragover', (event) => {
        event.preventDefault();
        zone.classList.add('is-over');
      });
      zone.addEventListener('dragleave', () => zone.classList.remove('is-over'));
      zone.addEventListener('drop', (event) => {
        event.preventDefault();
        zone.classList.remove('is-over');
        this.drop(zone);
      });
    });
  }

  async drop(zone) {
    const item = this.dragging;
    if (!item || item.disabled) return;

    if (item.dataset.answer === zone.dataset.zone) {
      item.disabled = true;
      item.draggable = false;
      item.classList.add('is-correct');
      zone.querySelector('.drop-bin').appendChild(item);
      this.score += 1;
      this.scoreEl.textContent = `${this.score} / ${this.total}`;
      this.status.textContent = '정답입니다. 실제 프로젝트에서도 이렇게 위치를 나눠 생각하면 됩니다.';
      this.status.dataset.state = 'success';
      await this.animation.pulse(zone, 'is-correct-pulse', 520);

      if (this.score === this.total) {
        this.host.classList.add('is-complete');
        this.status.textContent = '완료: 모든 개념이 제 위치에 들어갔습니다.';
      }
    } else {
      item.classList.add('is-wrong');
      this.status.textContent = '아직 아닙니다. 화면에 보이는지, 뒤에서 처리하는지 다시 생각해보세요.';
      this.status.dataset.state = 'fail';
      await this.animation.wait(520);
      item.classList.remove('is-wrong');
    }
  }
}
