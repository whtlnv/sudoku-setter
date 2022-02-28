import * as Colors from 'https://deno.land/std@0.127.0/fmt/colors.ts';

const ACTIONS: Record<string, () => void> = {
  insert: insert,
  print: print,
  help: help,
  exit: Deno.exit,
};

function readFromPrompt() {
  const input = prompt('What do you want to do?') ?? 'help';
  const actionName = input.trim().toLowerCase();
  const action = ACTIONS[actionName.toLowerCase()] || help;
  action();
}

function log(kind: 'info' | 'error' | 'success', message: string) {
  const colors = {
    info: Colors.blue,
    error: Colors.red,
    success: Colors.green,
  };

  const color = colors[kind];
  console.log(color(`[${kind}]`), message);
}

function insert() {
  while (true) {
    const cellInput = prompt('Cell location') ?? '';

    const [column, row] = cellInput.split(',').map(Number);
    if (isNaN(column) || isNaN(row)) {
      log('error', 'Invalid cell location');
      continue;
    }

    const symbol = prompt('Symbol') ?? '';

    // should emit instead
    log('success', `Inserting ${symbol} at ${column}, ${row}`);
    return;
  }
}

function print() {
  log('info', 'printing...');
}

function help() {
  const title = (text: string) => `${Colors.bold(text)}`;

  console.group(Colors.blue('Available actions:'));
  console.log(title('insert'), 'put stuff in the grid');
  console.log(title('print'), 'print stuff in the grid');
  console.log(title('help'), 'this thing');
  console.log(title('exit'), 'exit the program');
  console.groupEnd();
}

export function start() {
  while (true) {
    readFromPrompt();
  }
}
