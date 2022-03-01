import Output from './UI/Output.ts';
import UI from './UI/UI.ts';

export function start() {
  const ui = new UI(Output);
  while (true) {
    ui.readFromPrompt();
  }
}

start();
