import { simulationEngine } from './engine/simulation-engine/simulation-engine.js';
import { presentationEngine } from './engine/presentation-engine/presentation-engine.js';
import { interactionEngine } from './engine/interaction-engine/interaction-engine.js';
import { ApiFlowSimulation } from './components/api-flow/api-flow.js';
import { DeployVisualizer } from './components/deploy-visualizer/deploy-visualizer.js';
import { TerminalSimulation } from './components/terminal-sim/terminal-sim.js';
import { AiChatSimulation } from './components/ai-chat-sim/ai-chat-sim.js';
import { FileTreeExplorer } from './components/file-tree/file-tree.js';
import { DragExercise } from './components/drag-exercise/drag-exercise.js';
import { QuizComponent } from './components/quiz/quiz.js';
import { VibeLoop } from './components/vibe-loop/vibe-loop.js';
import { CliExtDemo } from './components/cli-ext-demo/cli-ext-demo.js';
import { IdeTour } from './components/ide-tour/ide-tour.js';

simulationEngine
  .register('api-flow', ApiFlowSimulation)
  .register('deploy-visualizer', DeployVisualizer)
  .register('terminal-sim', TerminalSimulation)
  .register('ai-chat-sim', AiChatSimulation)
  .register('file-tree', FileTreeExplorer)
  .register('drag-exercise', DragExercise)
  .register('quiz', QuizComponent)
  .register('vibe-loop', VibeLoop)
  .register('cli-ext-demo', CliExtDemo)
  .register('ide-tour', IdeTour);

function bootInteractiveEducation() {
  simulationEngine.mountAll(document);
  presentationEngine.mount(document);
  interactionEngine.bindRipples(document);
  window.vibeCodingInteractive = {
    mountAll: () => simulationEngine.mountAll(document),
    simulationEngine,
    presentationEngine,
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootInteractiveEducation, { once: true });
} else {
  bootInteractiveEducation();
}
