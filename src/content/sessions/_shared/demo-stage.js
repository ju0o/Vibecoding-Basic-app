'use strict';
/* ===========================================================
   Live Demo Stage — interactive presenter sandbox (vanilla JS)
   Terminal + file tree + code editor share ONE in-memory VFS.
   Freely type commands, create / rename / delete / move files,
   and edit file contents live. Nothing touches the real disk.
   Hotkeys: T terminal · F files · C code · D toggle · Esc close
   =========================================================== */
(function () {
  const DEFAULTS = {
    title: 'sandbox',
    cwd: '/project',
    open: null,
    fs: [{ name: 'project', type: 'dir', children: [
      { name: 'README.md', type: 'file', content: '# 자유롭게 만들어보세요\n\n터미널: mkdir / touch / rm / mv / cat / echo\n트리: 새 파일·폴더·이름변경·삭제·드래그 이동\n' },
    ] }],
  };

  function readConfig() {
    if (window.DEMO_STAGE) return window.DEMO_STAGE;
    const tag = document.getElementById('demo-stage-config');
    if (tag) { try { return JSON.parse(tag.textContent); } catch (e) { /* ignore */ } }
    return {};
  }
  const cfg = Object.assign({}, DEFAULTS, readConfig());
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  /* ---------- virtual file system ---------- */
  const root = { name: '', type: 'dir', children: [] };
  (function seed(nodes, parent) {
    (nodes || []).forEach((n) => {
      const node = n.type === 'dir'
        ? { name: n.name, type: 'dir', children: [] }
        : { name: n.name, type: 'file', content: n.content || '' };
      parent.children.push(node);
      if (n.type === 'dir') seed(n.children, node);
    });
  })(cfg.fs, root);

  const segs = (p) => String(p || '').split('/').filter(Boolean);
  function normalize(parts) {
    const out = [];
    parts.forEach((p) => { if (p === '.' || p === '') return; if (p === '..') out.pop(); else out.push(p); });
    return out;
  }
  function resolve(base, arg) {
    if (arg == null || arg === '') return base.slice();
    return normalize(arg.startsWith('/') ? segs(arg) : base.concat(segs(arg)));
  }
  function nodeAt(parts) {
    let cur = root;
    for (const name of parts) {
      if (cur.type !== 'dir') return null;
      cur = cur.children.find((c) => c.name === name);
      if (!cur) return null;
    }
    return cur;
  }
  const pathStr = (parts) => '/' + parts.join('/');
  const childByName = (dir, name) => dir.children.find((c) => c.name === name);
  function ensureName(name) { return name && !name.includes('/'); }

  let cwd = normalize(segs(cfg.cwd));
  if (!nodeAt(cwd)) cwd = [];

  /* ---------- build DOM ---------- */
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button class="demo-fab" id="demo-fab" type="button" aria-label="라이브 시연 창 열기">
      <span class="badge">‹›</span>라이브 시연<span class="keys">T·F·C</span></button>
    <div class="demo-scrim" id="demo-scrim"></div>
    <aside class="demo-stage" id="demo-stage" aria-hidden="true">
      <div class="demo-head"><span class="dot"></span><b id="demo-title">${esc(cfg.title)}</b>
        <span class="demo-hint">자유 입력 · Esc 닫기</span>
        <button class="demo-close" id="demo-close" type="button" aria-label="닫기">×</button></div>
      <div class="demo-tabs">
        <button type="button" data-demo-tab="terminal"><span class="k">T</span>터미널</button>
        <button type="button" data-demo-tab="files"><span class="k">F</span>파일트리</button>
        <button type="button" data-demo-tab="code"><span class="k">C</span>코드</button>
      </div>
      <div class="demo-body">
        <section class="demo-pane" data-demo-pane="terminal">
          <div class="demo-os-toggle"><span>OS</span><button type="button" data-os="mac">macOS · zsh</button><button type="button" data-os="windows">Windows · PowerShell</button></div>
          <div class="demo-term-wrap" id="demo-term-wrap">
            <div class="demo-term" id="demo-term"></div>
            <div class="demo-term-input-row">
              <span class="pfx" id="demo-prompt">$</span>
              <input class="demo-term-input" id="demo-term-input" type="text" autocomplete="off"
                autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="명령을 입력하고 Enter ( help )">
            </div>
          </div>
        </section>
        <section class="demo-pane" data-demo-pane="files">
          <div class="demo-files-toolbar">
            <button type="button" id="demo-new-file">+ 파일</button>
            <button type="button" id="demo-new-dir">+ 폴더</button>
            <button type="button" id="demo-rename">이름</button>
            <span class="spacer"></span>
            <button type="button" class="danger" id="demo-delete">삭제</button>
          </div>
          <div class="demo-files" id="demo-files"></div>
        </section>
        <section class="demo-pane" data-demo-pane="code">
          <div class="demo-codehead"><span class="dot"></span><span id="demo-code-file">파일을 선택하세요</span>
            <span class="saved" id="demo-code-saved"></span></div>
          <textarea class="demo-code-editor" id="demo-code-editor" spellcheck="false"
            placeholder="트리에서 파일을 열면 여기서 자유롭게 작성할 수 있습니다." disabled></textarea>
        </section>
      </div>
    </aside>`;
  document.body.appendChild(wrap);

  const $ = (id) => document.getElementById(id);
  const stage = $('demo-stage');
  let currentTab = null;
  let selectedPath = null;       // segments of selected tree node
  let openPath = null;           // segments of file open in editor
  const expanded = new Set(['']); // path strings of expanded dirs
  cwd.reduce((acc, s) => { acc.push(s); expanded.add(pathStr(acc)); return acc; }, []);

  function open(tab) { document.body.classList.add('demo-open'); stage.setAttribute('aria-hidden', 'false'); setTab(tab || currentTab || 'terminal'); }
  function close() { document.body.classList.remove('demo-open'); stage.setAttribute('aria-hidden', 'true'); }
  function toggle(tab) {
    if (document.body.classList.contains('demo-open')) { if (tab && tab !== currentTab) setTab(tab); else close(); }
    else open(tab);
  }
  function setTab(tab) {
    currentTab = tab;
    stage.querySelectorAll('[data-demo-tab]').forEach((b) => b.classList.toggle('active', b.dataset.demoTab === tab));
    stage.querySelectorAll('[data-demo-pane]').forEach((p) => p.classList.toggle('active', p.dataset.demoPane === tab));
    if (tab === 'terminal') setTimeout(() => $('demo-term-input').focus(), 60);
    if (tab === 'code' && !$('demo-code-editor').disabled) setTimeout(() => $('demo-code-editor').focus(), 60);
  }

  /* ---------- terminal ---------- */
  const term = $('demo-term');
  const history = []; let histPos = 0;
  function print(text, cls) {
    String(text).split('\n').forEach((line) => {
      const el = document.createElement('div');
      el.className = 'ln' + (cls ? ' ' + cls : '');
      el.textContent = line;
      term.appendChild(el);
    });
    term.scrollTop = term.scrollHeight;
  }
  function echoCmd(cmd) {
    const el = document.createElement('div');
    el.className = 'ln echo';
    el.innerHTML = `<span class="pfx">${esc(promptStr())}</span>${esc(cmd)}`;
    term.appendChild(el); term.scrollTop = term.scrollHeight;
  }
  let osMode = (() => { try { return localStorage.getItem('demo-os') || 'mac'; } catch (e) { return 'mac'; } })();
  function promptStr() {
    const p = pathStr(cwd) || '/';
    if (osMode === 'windows') return 'PS C:' + p.replace(/\//g, '\\') + '>';
    return p + ' %';
  }
  function refreshPrompt() { $('demo-prompt').textContent = promptStr(); }
  function setOs(mode) {
    osMode = mode;
    try { localStorage.setItem('demo-os', mode); } catch (e) { /* ignore */ }
    stage.querySelectorAll('[data-os]').forEach((b) => b.classList.toggle('active', b.dataset.os === mode));
    refreshPrompt();
    const input = $('demo-term-input');
    if (input) input.placeholder = mode === 'windows' ? 'PowerShell 명령 입력 후 Enter ( help )' : 'zsh 명령 입력 후 Enter ( help )';
  }

  function tokenize(line) { return (line.match(/"[^"]*"|'[^']*'|\S+/g) || []).map((t) => t.replace(/^['"]|['"]$/g, '')); }

  const COMMANDS = {
    help() {
      print('사용 가능한 명령:', 'sys');
      print(osMode === 'windows'
        ? '  pwd  ls/dir  cd  mkdir/md  ni/touch  rm/del [-r]  mv/move  cp/copy  cat/type  echo  tree  clear/cls  git  npm  open  help'
        : '  pwd  ls  cd  mkdir  touch  rm [-r]  mv  cp  cat  echo  tree  clear  git  npm  open  help', 'sys');
    },
    dir(a) { return this.ls(a); },
    type(a) { return this.cat(a); },
    del(a) { return this.rm(a); },
    erase(a) { return this.rm(a); },
    copy(a) { return this.cp(a); },
    move(a) { return this.mv(a); },
    ren(a) { return this.mv(a); },
    md(a) { return this.mkdir(a); },
    ni(a) { return this.touch(a); },
    cls() { return this.clear(); },
    pwd() { print(pathStr(cwd) || '/'); },
    ls(args) {
      const target = nodeAt(resolve(cwd, args[0]));
      if (!target) return print(`ls: '${args[0]}' 경로를 찾을 수 없습니다`, 'err');
      if (target.type === 'file') return print(target.name);
      const names = target.children.map((c) => c.type === 'dir' ? c.name + '/' : c.name);
      print(names.length ? names.join('   ') : '(빈 폴더)', names.length ? '' : 'sys');
    },
    cd(args) {
      if (!args[0] || args[0] === '~') { cwd = []; return refreshPrompt(); }
      const parts = resolve(cwd, args[0]); const node = nodeAt(parts);
      if (!node) return print(`cd: '${args[0]}' 폴더가 없습니다`, 'err');
      if (node.type !== 'dir') return print(`cd: '${args[0]}'는 폴더가 아닙니다`, 'err');
      cwd = parts; refreshPrompt(); parts.reduce((a, s) => { a.push(s); expanded.add(pathStr(a)); return a; }, []); renderTree();
    },
    mkdir(args) { args.forEach((a) => makeNode(a, 'dir')); renderTree(); },
    touch(args) { args.forEach((a) => makeNode(a, 'file')); renderTree(); },
    rm(args) {
      const recursive = args.includes('-r') || args.includes('-rf') || args.includes('-f');
      args.filter((a) => !a.startsWith('-')).forEach((a) => {
        const parts = resolve(cwd, a); const node = nodeAt(parts); const parent = nodeAt(parts.slice(0, -1));
        if (!node || !parent) return print(`rm: '${a}' 대상을 찾을 수 없습니다`, 'err');
        if (node.type === 'dir' && node.children.length && !recursive) return print(`rm: '${a}'는 폴더입니다 ( rm -r 사용 )`, 'err');
        parent.children = parent.children.filter((c) => c !== node);
        if (openPath && pathStr(openPath).startsWith(pathStr(parts))) closeEditor();
        if (selectedPath && pathStr(selectedPath).startsWith(pathStr(parts))) selectedPath = null;
      });
      renderTree();
    },
    mv(args) { const d = moveOrCopy(args, false); if (d) expanded.add(d); renderTree(); },
    cp(args) { const d = moveOrCopy(args, true); if (d) expanded.add(d); renderTree(); },
    cat(args) {
      const node = nodeAt(resolve(cwd, args[0]));
      if (!node) return print(`cat: '${args[0]}' 파일이 없습니다`, 'err');
      if (node.type !== 'file') return print(`cat: '${args[0]}'는 폴더입니다`, 'err');
      print(node.content || '(빈 파일)', node.content ? '' : 'sys');
    },
    echo(args, raw) {
      const m = raw.match(/^echo\s+(.*?)\s*(>>?)\s*(\S+)\s*$/);
      if (m) {
        const text = m[1].replace(/^['"]|['"]$/g, '');
        const parts = resolve(cwd, m[3]); let node = nodeAt(parts);
        if (!node) node = makeNode(m[3], 'file');
        if (node && node.type === 'file') { node.content = m[2] === '>>' ? (node.content || '') + text + '\n' : text + '\n'; if (openPath && pathStr(openPath) === pathStr(parts)) loadEditor(parts); lastChanged = pathStr(parts); }
        renderTree();
      } else { print(args.join(' ')); }
    },
    open(args) {
      const parts = resolve(cwd, args[0]); const node = nodeAt(parts);
      if (!node || node.type !== 'file') return print(`open: '${args[0]}' 파일이 없습니다`, 'err');
      selectedPath = parts; loadEditor(parts); renderTree(); setTab('code');
    },
    tree() { const lines = []; (function walk(node, prefix) { node.children.forEach((c, i) => { const last = i === node.children.length - 1; lines.push(prefix + (last ? '└ ' : '├ ') + c.name + (c.type === 'dir' ? '/' : '')); if (c.type === 'dir') walk(c, prefix + (last ? '   ' : '│  ')); }); })(nodeAt(cwd) || root, ''); print(lines.join('\n') || '(빈 폴더)', lines.length ? '' : 'sys'); },
    clear() { term.innerHTML = ''; },
    git(args) {
      const sub = args[0];
      if (sub === 'status') print('On branch main\nnothing to commit, working tree clean', 'sys');
      else if (sub === 'init') print('Initialized empty Git repository', 'sys');
      else if (sub === 'add') print('', 'sys');
      else if (sub === 'commit') print('[main 0a1b2c3] ' + (args.slice(args.indexOf('-m') + 1).join(' ') || 'commit'), 'sys');
      else if (sub === 'push') print('To github.com:me/project.git\n   ..0a1b2c3  main -> main', 'sys');
      else print(`git: '${sub || ''}' (데모용 git)`, 'sys');
    },
    npm(args) {
      if (args[0] === 'run' && args[1] === 'dev') print('VITE ready\n  ➜ Local: http://localhost:3000', 'sys');
      else if (args[0] === 'install' || args[0] === 'i') print('added 312 packages in 4s', 'sys');
      else print(`npm: '${args.join(' ')}' (데모용)`, 'sys');
    },
  };

  function makeNode(arg, type) {
    const parts = resolve(cwd, arg); const name = parts[parts.length - 1];
    const parent = nodeAt(parts.slice(0, -1));
    if (!parent || parent.type !== 'dir') { print(`'${arg}' 상위 폴더가 없습니다`, 'err'); return null; }
    if (!ensureName(name)) { print(`'${name}' 이름이 올바르지 않습니다`, 'err'); return null; }
    if (childByName(parent, name)) { print(`'${name}' 이미 존재합니다`, 'err'); return childByName(parent, name); }
    const node = type === 'dir' ? { name, type: 'dir', children: [] } : { name, type: 'file', content: '' };
    parent.children.push(node);
    expanded.add(pathStr(parts.slice(0, -1)));
    lastChanged = pathStr(parts);
    return node;
  }
  function moveOrCopy(args, copy) {
    const real = args.filter((a) => !a.startsWith('-'));
    if (real.length < 2) return print(`${copy ? 'cp' : 'mv'}: 원본과 대상이 필요합니다`, 'err');
    const srcParts = resolve(cwd, real[0]); const src = nodeAt(srcParts); const srcParent = nodeAt(srcParts.slice(0, -1));
    if (!src) return print(`'${real[0]}' 원본이 없습니다`, 'err');
    let dstParts = resolve(cwd, real[1]); let dst = nodeAt(dstParts);
    let newName = src.name; let destDir; let destDirParts;
    if (dst && dst.type === 'dir') { destDir = dst; destDirParts = dstParts; }
    else { destDirParts = dstParts.slice(0, -1); destDir = nodeAt(destDirParts); newName = dstParts[dstParts.length - 1]; }
    if (!destDir || destDir.type !== 'dir') { print(`'${real[1]}' 대상 폴더가 없습니다`, 'err'); return null; }
    if (!copy && (destDir === src || pathStr(dstParts).startsWith(pathStr(srcParts) + '/'))) { print('자기 자신 안으로는 이동할 수 없습니다', 'err'); return null; }
    if (childByName(destDir, newName) && childByName(destDir, newName) !== src) { print(`'${newName}' 이미 존재합니다`, 'err'); return null; }
    const clone = copy ? JSON.parse(JSON.stringify(src)) : src;
    clone.name = newName;
    if (!copy) srcParent.children = srcParent.children.filter((c) => c !== src);
    destDir.children.push(clone);
    lastChanged = pathStr(destDirParts.concat(newName));
    return pathStr(destDirParts);
  }

  function runCommand(raw) {
    const line = raw.trim();
    echoCmd(raw);
    if (!line) return;
    history.push(line); histPos = history.length;
    const toks = tokenize(line); const cmd = toks[0]; const args = toks.slice(1);
    if (COMMANDS[cmd]) { try { COMMANDS[cmd](args, line); } catch (e) { print('오류: ' + e.message, 'err'); } }
    else print(`'${cmd}': 알 수 없는 명령입니다 ( help )`, 'err');
    if (lastChanged) { flashRow(lastChanged); lastChanged = null; }
  }

  const termInput = $('demo-term-input');
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { runCommand(termInput.value); termInput.value = ''; }
    else if (e.key === 'ArrowUp') { if (histPos > 0) { histPos -= 1; termInput.value = history[histPos]; } e.preventDefault(); }
    else if (e.key === 'ArrowDown') { if (histPos < history.length - 1) { histPos += 1; termInput.value = history[histPos]; } else { histPos = history.length; termInput.value = ''; } e.preventDefault(); }
  });
  $('demo-term-wrap').addEventListener('mousedown', (e) => { if (e.target.closest('.demo-term-input-row')) return; setTimeout(() => termInput.focus(), 0); });

  /* ---------- file tree ---------- */
  const filesBox = $('demo-files');
  let dragPath = null;
  let lastChanged = null;
  function flashRow(pathString) {
    const row = [...filesBox.querySelectorAll('.row')].find((r) => r.dataset.path === pathString);
    if (row) { row.classList.add('flash'); row.scrollIntoView({ block: 'nearest' }); setTimeout(() => row.classList.remove('flash'), 1500); }
  }
  function renderTree() {
    filesBox.innerHTML = '';
    const selStr = selectedPath ? pathStr(selectedPath) : null;
    const cwdStr = pathStr(cwd);
    (function walk(node, parts, depth) {
      node.children.slice().sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1)).forEach((child) => {
        const cp = parts.concat(child.name); const cpStr = pathStr(cp);
        const row = document.createElement('div');
        row.className = 'row ' + child.type + (cpStr === selStr ? ' sel' : '') + (cpStr === cwdStr ? ' cwd' : '');
        row.dataset.path = cpStr; row.draggable = true;
        row.style.paddingLeft = (8 + depth * 15) + 'px';
        const isOpen = expanded.has(cpStr);
        const tw = child.type === 'dir' ? (isOpen ? '▾' : '▸') : '';
        const ic = child.type === 'dir' ? '▦' : '·';
        row.innerHTML = `<span class="tw">${tw}</span><span class="ic">${ic}</span><span class="nm">${esc(child.name)}</span>`;
        filesBox.appendChild(row);
        if (child.type === 'dir' && isOpen) walk(child, cp, depth + 1);
      });
    })(root, [], 0);
    if (!filesBox.children.length) filesBox.innerHTML = '<div class="empty">비어 있습니다. 위의 + 파일 / + 폴더로 만들어 보세요.</div>';
  }
  filesBox.addEventListener('click', (e) => {
    const row = e.target.closest('.row'); if (!row) return;
    const parts = segs(row.dataset.path); const node = nodeAt(parts);
    selectedPath = parts;
    if (node.type === 'dir') { const s = row.dataset.path; if (expanded.has(s)) expanded.delete(s); else expanded.add(s); renderTree(); }
    else { loadEditor(parts); renderTree(); setTab('code'); }
  });
  filesBox.addEventListener('dragstart', (e) => { const row = e.target.closest('.row'); if (row) { dragPath = row.dataset.path; e.dataTransfer.effectAllowed = 'move'; } });
  filesBox.addEventListener('dragover', (e) => { const row = e.target.closest('.row'); filesBox.querySelectorAll('.drop-target').forEach((r) => r.classList.remove('drop-target')); if (row && nodeAt(segs(row.dataset.path)).type === 'dir' && row.dataset.path !== dragPath) { e.preventDefault(); row.classList.add('drop-target'); } });
  filesBox.addEventListener('dragleave', (e) => { const row = e.target.closest('.row'); if (row) row.classList.remove('drop-target'); });
  filesBox.addEventListener('drop', (e) => {
    e.preventDefault();
    const row = e.target.closest('.row'); filesBox.querySelectorAll('.drop-target').forEach((r) => r.classList.remove('drop-target'));
    if (!row || !dragPath) return;
    const destStr = row.dataset.path;
    if (destStr === dragPath || destStr.startsWith(dragPath + '/')) { dragPath = null; return; }
    moveOrCopy([dragPath, destStr], false); dragPath = null; expanded.add(destStr); renderTree();
  });

  function startRename() {
    if (!selectedPath || !selectedPath.length) return;
    const want = pathStr(selectedPath);
    const row = [...filesBox.querySelectorAll('.row')].find((r) => r.dataset.path === want);
    if (!row) return;
    const nm = row.querySelector('.nm'); const old = nm.textContent;
    const input = document.createElement('input'); input.className = 'rename'; input.value = old;
    nm.replaceWith(input); input.focus(); input.select();
    const commit = (ok) => {
      const val = input.value.trim();
      if (ok && ensureName(val) && val !== old) {
        const parent = nodeAt(selectedPath.slice(0, -1)); const node = nodeAt(selectedPath);
        if (node && parent && !childByName(parent, val)) {
          const wasOpen = openPath && pathStr(openPath) === pathStr(selectedPath);
          node.name = val; selectedPath = selectedPath.slice(0, -1).concat(val);
          if (wasOpen) openPath = selectedPath.slice();
        }
      }
      renderTree();
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') commit(true); if (e.key === 'Escape') commit(false); });
    input.addEventListener('blur', () => commit(true));
  }
  function createFromToolbar(type) {
    const sel = selectedPath ? nodeAt(selectedPath) : null;
    const dirParts = sel ? (sel.type === 'dir' ? selectedPath : selectedPath.slice(0, -1)) : cwd;
    const dir = nodeAt(dirParts) || root;
    let base = type === 'dir' ? '새-폴더' : '새-파일'; let name = base; let i = 1;
    while (childByName(dir, name)) { name = base + '-' + (i += 1); }
    const node = type === 'dir' ? { name, type: 'dir', children: [] } : { name, type: 'file', content: '' };
    dir.children.push(node); expanded.add(pathStr(dirParts)); selectedPath = dirParts.concat(name);
    renderTree(); startRename();
  }
  $('demo-new-file').addEventListener('click', () => createFromToolbar('file'));
  $('demo-new-dir').addEventListener('click', () => createFromToolbar('dir'));
  $('demo-rename').addEventListener('click', startRename);
  $('demo-delete').addEventListener('click', () => {
    if (!selectedPath || !selectedPath.length) return;
    const parent = nodeAt(selectedPath.slice(0, -1)); const node = nodeAt(selectedPath);
    if (!parent || !node) return;
    parent.children = parent.children.filter((c) => c !== node);
    if (openPath && pathStr(openPath).startsWith(pathStr(selectedPath))) closeEditor();
    selectedPath = null; renderTree();
  });

  /* ---------- code editor ---------- */
  const editor = $('demo-code-editor');
  function loadEditor(parts) {
    const node = nodeAt(parts);
    if (!node || node.type !== 'file') return;
    openPath = parts.slice();
    $('demo-code-file').textContent = pathStr(parts);
    editor.disabled = false; editor.value = node.content || '';
    $('demo-code-saved').textContent = '● 저장됨';
  }
  function closeEditor() { openPath = null; editor.value = ''; editor.disabled = true; $('demo-code-file').textContent = '파일을 선택하세요'; $('demo-code-saved').textContent = ''; }
  editor.addEventListener('input', () => {
    if (!openPath) return; const node = nodeAt(openPath); if (node) node.content = editor.value;
    $('demo-code-saved').textContent = '● 저장됨';
  });
  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') { e.preventDefault(); const s = editor.selectionStart, en = editor.selectionEnd; editor.value = editor.value.slice(0, s) + '  ' + editor.value.slice(en); editor.selectionStart = editor.selectionEnd = s + 2; editor.dispatchEvent(new Event('input')); }
  });

  /* ---------- wiring ---------- */
  $('demo-fab').addEventListener('click', () => toggle('terminal'));
  $('demo-close').addEventListener('click', close);
  $('demo-scrim').addEventListener('click', close);
  stage.querySelectorAll('[data-demo-tab]').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.demoTab)));
  stage.querySelectorAll('[data-os]').forEach((b) => b.addEventListener('click', () => setOs(b.dataset.os)));
  // keep all keystrokes inside the stage from reaching the deck's slide navigation
  stage.addEventListener('keydown', (e) => e.stopPropagation());

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && document.body.classList.contains('demo-open')) { e.preventDefault(); close(); return; }
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.code === 'KeyT') { e.preventDefault(); toggle('terminal'); }
    else if (e.code === 'KeyF') { e.preventDefault(); toggle('files'); }
    else if (e.code === 'KeyC') { e.preventDefault(); toggle('code'); }
    else if (e.code === 'KeyD') { e.preventDefault(); toggle(); }
  }, true);

  /* ---------- init ---------- */
  setOs(osMode);
  print('가상 샌드박스입니다. 실제 디스크에는 영향이 없습니다. help 입력으로 명령을 확인하세요.', 'sys');
  renderTree();
  if (cfg.open) { const p = normalize(segs(cfg.open)); if (nodeAt(p)) { selectedPath = p; loadEditor(p); } }

  window.demoStage = { open, close, toggle, setTab };
})();
