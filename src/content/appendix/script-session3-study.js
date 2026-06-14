(function () {
  const storagePrefix = 'vibe-session3-script';
  const cards = [...document.querySelectorAll('[data-script-slide]')];
  const focusButton = document.querySelector('[data-script-action="focus"]');
  const printButton = document.querySelector('[data-script-action="print"]');
  const countLabel = document.getElementById('memorized-count');

  function updateCount() {
    const completed = cards.filter((card) => card.querySelector('[data-memorized]')?.checked).length;
    countLabel.textContent = `암기 완료 ${completed} / ${cards.length}`;
  }

  cards.forEach((card) => {
    const slide = card.dataset.scriptSlide;
    const checkbox = card.querySelector('[data-memorized]');
    checkbox.checked = localStorage.getItem(`${storagePrefix}:memorized:${slide}`) === 'true';
    checkbox.addEventListener('change', () => {
      localStorage.setItem(`${storagePrefix}:memorized:${slide}`, String(checkbox.checked));
      card.classList.toggle('is-memorized', checkbox.checked);
      updateCount();
    });
    card.classList.toggle('is-memorized', checkbox.checked);

    const noteBlock = document.createElement('div');
    noteBlock.className = 'personal-script-note';
    noteBlock.innerHTML = `
      <div class="label">내 말투로 다시 쓰기 · 개인 메모</div>
      <div class="personal-note-editor" contenteditable="true" data-placeholder="이 장에서 실제로 사용할 표현, 추가 사례, 잊기 쉬운 문장을 적으세요."></div>
    `;
    const editor = noteBlock.querySelector('.personal-note-editor');
    editor.textContent = localStorage.getItem(`${storagePrefix}:note:${slide}`) || '';
    noteBlock.classList.toggle('is-empty', !editor.textContent.trim());
    editor.addEventListener('input', () => {
      const value = editor.textContent.trim();
      localStorage.setItem(`${storagePrefix}:note:${slide}`, value);
      noteBlock.classList.toggle('is-empty', !value);
    });
    card.querySelector('.script-detail').appendChild(noteBlock);
  });

  focusButton.addEventListener('click', () => {
    const active = document.body.classList.toggle('memorize-mode');
    focusButton.textContent = active ? '전체 대본 보기' : '암기 모드';
  });

  printButton.addEventListener('click', () => window.print());
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.personal-script-note').forEach((note) => {
      const editor = note.querySelector('.personal-note-editor');
      note.classList.toggle('is-empty', !editor?.textContent.trim());
    });
  });
  updateCount();
})();
