import * as Colors from 'https://deno.land/std@0.127.0/fmt/colors.ts';
import Output from './Output.ts';

const ACTIONS: Record<string, () => void> = {
  insert: insert,
  print: print,
  help: help,
  exit: Deno.exit,
};

function readFromPrompt() {
  const actionName = Output.prompt('What do you want to do?', 'help');
  const action = ACTIONS[actionName.trim().toLowerCase()] || help;
  action();
}

function log(kind: 'info' | 'error' | 'success', message: string) {
  const colors = {
    info: Colors.blue,
    error: Colors.red,
    success: Colors.green,
  };

  const color = colors[kind];
  Output.printLine(color(`[${kind}]`), message);
}

function insert() {
  while (true) {
    const cellInput = Output.prompt('Cell location', '');

    const [column, row] = cellInput.split(',').map(Number);
    if (isNaN(column) || isNaN(row)) {
      log('error', 'Invalid cell location');
      continue;
    }

    const symbol = Output.prompt('Symbol', '');

    log('success', `Inserting ${symbol} at ${column}, ${row}`);
    return;
  }
}

function print() {
  log('info', 'printing...');
}

function help() {
  const title = (text: string) => `${Colors.bold(text)}`;

  Output.printGroup(Colors.blue('Available actions:'), [
    `${title('insert')} put stuff in the grid`,
    `${title('print')} print stuff in the grid`,
    `${title('help')} this thing`,
    `${title('exit')} exit the program`,
  ]);
}

export function start() {
  while (true) {
    readFromPrompt();
  }
}
