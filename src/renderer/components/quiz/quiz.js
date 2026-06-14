export class QuizComponent {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.render();
  }

  static mount(host, context) {
    return new QuizComponent(host, context);
  }

  render() {
    const question = this.host.dataset.question || '어떤 설명이 가장 맞을까요?';
    const answer = this.host.dataset.answer || '1';
    const options = (this.host.dataset.options || '화면에 보이는 것은 프론트엔드|비밀 키는 코드에 직접 넣는다|에러는 무조건 실패다')
      .split('|');

    this.host.classList.add('edu-sim', 'quiz-sim');
    this.host.innerHTML = `
      <div class="edu-panel quiz-panel">
        <div class="quiz-kicker">QUICK CHECK</div>
        <div class="quiz-title">${question}</div>
        <div class="quiz-options">
          ${options.map((option, index) => `<button class="quiz-option" data-index="${index + 1}">${option}</button>`).join('')}
        </div>
        <div class="edu-status" data-status>정답을 골라보세요.</div>
      </div>
    `;

    const status = this.host.querySelector('[data-status]');
    this.host.querySelectorAll('.quiz-option').forEach((button) => {
      button.addEventListener('click', async () => {
        const ok = button.dataset.index === answer;
        button.classList.add(ok ? 'is-correct' : 'is-wrong');
        status.textContent = ok ? '정답입니다.' : '아직 아닙니다. 다시 생각해볼까요?';
        status.dataset.state = ok ? 'success' : 'fail';
        await this.animation.wait(650);
        if (!ok) button.classList.remove('is-wrong');
      });
    });
  }
}
