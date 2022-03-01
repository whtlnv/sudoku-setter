import {
  assertEquals,
  assertExists,
  // assertThrows,
} from 'https://deno.land/std@0.126.0/testing/asserts.ts';
// import { EventEmitter } from "https://deno.land/std@0.127.0/node/events.ts";
import UI from './UI.ts';

let messageLog: Record<string, unknown>[] = [];
const cleanMessageLog = () => {
  messageLog = [];
};
const testOutput = (promptResults: string[] = []) => ({
  printLine(...data: string[]): void {
    messageLog.push({
      method: 'printLine',
      data: data.join('|'),
    });
  },
  printGroup(title: string, elements: string[]): void {
    messageLog.push({
      method: 'printGroup',
      title,
      elements,
    });
  },
  prompt(message: string, defaultValue: string): string {
    messageLog.push({
      method: 'prompt',
      message,
      defaultValue,
    });
    return promptResults.shift() || defaultValue;
  },
});

Deno.test('printStatus should print the formatted log type and message', () => {
  cleanMessageLog();
  const ui = new UI(testOutput());
  const type = 'info';
  const message = 'Hello World';
  ui.printStatus(type, message);

  assertEquals(messageLog[0], {
    method: 'printLine',
    data: `\x1b[34m[${type}]\x1b[39m|${message}`,
  });
});

Deno.test('help should print help menu', () => {
  cleanMessageLog();
  const ui = new UI(testOutput());
  ui.help();

  assertEquals(messageLog[0].method, 'printGroup');
  assertExists(messageLog[0].elements);
  assertExists(messageLog[0].title);
});

Deno.test('insert should first call output.prompt', () => {
  cleanMessageLog();
  const ui = new UI(testOutput(['1,2', 'a']));
  ui.insert();

  assertEquals(messageLog[0], {
    method: 'prompt',
    defaultValue: '',
    message: 'Cell location',
  });
  assertEquals(messageLog[1], {
    method: 'prompt',
    defaultValue: '',
    message: 'Symbol',
  });
  assertEquals(messageLog[2], {
    method: 'printLine',
    data: `\x1b[32m[success]\x1b[39m|Inserting a at 1, 2`,
  });
});

Deno.test(
  'insert should call output.prompt again if first time was invalid',
  () => {
    cleanMessageLog();
    const ui = new UI(testOutput(['invalid cell location', '1,2', 'a']));
    ui.insert();

    assertEquals(messageLog[0], {
      method: 'prompt',
      defaultValue: '',
      message: 'Cell location',
    });
    assertEquals(messageLog[1], {
      method: 'printLine',
      data: `\x1b[31m[error]\x1b[39m|Invalid cell location`,
    });
    assertEquals(messageLog[2], {
      method: 'prompt',
      defaultValue: '',
      message: 'Cell location',
    });
  }
);

Deno.test('print should print mock message', () => {
  cleanMessageLog();
  const ui = new UI(testOutput());
  ui.print();

  assertEquals(messageLog[0], {
    method: 'printLine',
    data: '\x1b[34m[info]\x1b[39m|printing...',
  });
});

Deno.test('readFromPrompt should call the appropriate function', () => {
  cleanMessageLog();
  const ui = new UI(testOutput(['help']));
  ui.readFromPrompt();

  assertEquals(messageLog[0].method, 'prompt');
  assertEquals(messageLog[1].method, 'printGroup');
  assertExists(messageLog[1].elements);
  assertExists(messageLog[1].title);
});
