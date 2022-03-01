import * as Colors from 'https://deno.land/std@0.127.0/fmt/colors.ts';
// import { EventEmitter } from 'https://deno.land/std@0.127.0/node/events.ts';

interface Printer {
  printLine(...data: string[]): void;
  printGroup(title: string, elements: string[]): void;
  prompt(message: string, defaultValue: string): string;
}

export default class UI {
  // private _eventEmitter: EventEmitter;
  private _output: Printer;
  private actions: Record<string, () => void> = {
    insert: this.insert.bind(this),
    print: this.print.bind(this),
    help: this.help.bind(this),
    exit: Deno.exit,
  };

  constructor(output: Printer) {
    this._output = output;
  }

  readFromPrompt(): void {
    const actionName = this._output.prompt('What do you want to do?', 'help');
    const action =
      this.actions[actionName.trim().toLowerCase()] || this.actions.help;
    action();
  }

  printStatus(kind: 'info' | 'error' | 'success', message: string): void {
    const colors = {
      info: Colors.blue,
      error: Colors.red,
      success: Colors.green,
    };

    const color = colors[kind];
    this._output.printLine(color(`[${kind}]`), message);
  }

  help(): void {
    const title = (text: string) => `${Colors.bold(text)}`;

    this._output.printGroup(Colors.blue('Available actions:'), [
      `${title('insert')} put stuff in the grid`,
      `${title('print')} print stuff in the grid`,
      `${title('help')} this thing`,
      `${title('exit')} exit the program`,
    ]);
  }

  insert(): void {
    while (true) {
      const cellInput = this._output.prompt('Cell location', '');

      const [column, row] = cellInput.split(',').map(Number);
      if (isNaN(column) || isNaN(row)) {
        this.printStatus('error', 'Invalid cell location');
        continue;
      }

      const symbol = this._output.prompt('Symbol', '');

      this.printStatus('success', `Inserting ${symbol} at ${column}, ${row}`);
      return;
    }
  }

  print(): void {
    this.printStatus('info', 'printing...');
  }
}
