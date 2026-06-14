const FILES = {
  'package.json': {
    role: '프로젝트 실행 명령어와 설치된 패키지를 확인하는 조종판입니다.',
    preview: 'npm run dev, npm run build 같은 명령어가 여기에서 나옵니다.',
  },
  'src/components/Button.tsx': {
    role: '버튼 모양과 동작을 만드는 파일입니다.',
    preview: '색상, 둥근 정도, 클릭 이벤트를 바꾸면 화면의 버튼이 바로 달라집니다.',
  },
  'src/app/page.tsx': {
    role: '메인 화면을 조립하는 파일입니다.',
    preview: 'Header, Button, Card 같은 조각을 모아 실제 페이지를 만듭니다.',
  },
  'src/lib/api.ts': {
    role: '서버나 외부 API와 통신하는 함수를 모아두는 위치입니다.',
    preview: '저장 버튼을 눌렀을 때 fetch 요청이 여기에서 출발할 수 있습니다.',
  },
  '.env.local': {
    role: 'API 키와 데이터베이스 주소처럼 공개되면 안 되는 값을 보관합니다.',
    preview: 'GitHub에 올리지 않고 배포 서비스에 따로 입력합니다.',
  },
};

export class FileTreeExplorer {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.render();
  }

  static mount(host, context) {
    return new FileTreeExplorer(host, context);
  }

  render() {
    this.host.classList.add('edu-sim', 'file-tree-sim');
    this.host.innerHTML = `
      <div class="edu-panel file-tree-panel">
        <div class="file-tree-head">
          <div>
            <div class="file-tree-kicker">PROJECT EXPLORER</div>
            <div class="file-tree-title">AI가 만든 프로젝트를 탐험합니다.</div>
          </div>
          <div class="edu-toolbar">
            <button class="edu-btn" data-walk="button">버튼 수정하기</button>
            <button class="edu-btn" data-walk="api">API 위치 찾기</button>
            <button class="edu-btn" data-walk="env">비밀값 숨기기</button>
          </div>
        </div>
        <div class="file-tree-layout">
          <div class="file-tree-browser" data-tree>
            ${this.treeMarkup()}
          </div>
          <div class="file-tree-detail">
            <div class="file-role-card">
              <span>SELECTED FILE</span>
              <strong data-file-name>파일을 클릭하세요</strong>
              <p data-file-role>왼쪽 파일을 누르면 역할과 수정 포인트가 연결됩니다.</p>
            </div>
            <div class="file-preview-card">
              <span>SCREEN PREVIEW</span>
              <div class="fake-page-preview">
                <div class="fake-header"></div>
                <button class="fake-button" data-preview-button>로그인</button>
                <div class="fake-card"></div>
              </div>
              <p data-file-preview>워크스루 버튼을 누르면 관련 파일이 자동 하이라이트됩니다.</p>
            </div>
          </div>
        </div>
        <div class="edu-status" data-status>폴더를 펼치고 파일을 클릭해보세요.</div>
      </div>
    `;

    this.host.querySelectorAll('[data-file]').forEach((file) => {
      file.addEventListener('click', () => this.selectFile(file.dataset.file));
      file.addEventListener('mouseenter', () => file.classList.add('is-hovered'));
      file.addEventListener('mouseleave', () => file.classList.remove('is-hovered'));
    });

    this.host.querySelectorAll('[data-folder]').forEach((folder) => {
      folder.addEventListener('click', () => {
        folder.parentElement.classList.toggle('is-open');
      });
    });

    this.host.querySelector('[data-walk="button"]').addEventListener('click', () => this.walk(['src', 'src/components', 'src/components/Button.tsx']));
    this.host.querySelector('[data-walk="api"]').addEventListener('click', () => this.walk(['src', 'src/lib', 'src/lib/api.ts']));
    this.host.querySelector('[data-walk="env"]').addEventListener('click', () => this.walk(['.env.local']));
  }

  treeMarkup() {
    return `
      <div class="tree-row file" data-file="package.json"><span>package.json</span></div>
      <div class="tree-node is-open">
        <div class="tree-row folder" data-folder="src"><span>src/</span></div>
        <div class="tree-children">
          <div class="tree-node is-open">
            <div class="tree-row folder" data-folder="src/app"><span>app/</span></div>
            <div class="tree-children">
              <div class="tree-row file" data-file="src/app/page.tsx"><span>page.tsx</span></div>
            </div>
          </div>
          <div class="tree-node is-open">
            <div class="tree-row folder" data-folder="src/components"><span>components/</span></div>
            <div class="tree-children">
              <div class="tree-row file" data-file="src/components/Button.tsx"><span>Button.tsx</span></div>
            </div>
          </div>
          <div class="tree-node">
            <div class="tree-row folder" data-folder="src/lib"><span>lib/</span></div>
            <div class="tree-children">
              <div class="tree-row file" data-file="src/lib/api.ts"><span>api.ts</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tree-row file is-secret" data-file=".env.local"><span>.env.local</span></div>
    `;
  }

  clearActive() {
    this.host.querySelectorAll('.tree-row').forEach((row) => row.classList.remove('is-active', 'is-path'));
    this.host.querySelector('[data-preview-button]').classList.remove('is-editing');
  }

  selectFile(path) {
    const data = FILES[path];
    if (!data) return;

    this.clearActive();
    const row = this.host.querySelector(`[data-file="${CSS.escape(path)}"]`);
    row?.classList.add('is-active');

    this.host.querySelector('[data-file-name]').textContent = path;
    this.host.querySelector('[data-file-role]').textContent = data.role;
    this.host.querySelector('[data-file-preview]').textContent = data.preview;

    if (path.includes('Button')) {
      this.host.querySelector('[data-preview-button]').classList.add('is-editing');
    }

    const status = this.host.querySelector('[data-status]');
    status.textContent = `${path} 선택됨`;
    status.dataset.state = 'success';
  }

  async walk(paths) {
    this.clearActive();
    const status = this.host.querySelector('[data-status]');
    status.textContent = 'AI가 수정 위치를 찾는 중...';
    status.dataset.state = 'neutral';

    for (const path of paths) {
      const folder = this.host.querySelector(`[data-folder="${CSS.escape(path)}"]`);
      const file = this.host.querySelector(`[data-file="${CSS.escape(path)}"]`);
      const target = folder || file;
      target?.parentElement?.classList.add('is-open');
      target?.classList.add('is-path');
      await this.animation.pulse(target, 'is-pulsing', 420);
      await this.animation.wait(160);
    }

    const last = paths[paths.length - 1];
    this.selectFile(last);
  }
}
