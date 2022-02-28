import { assertEquals, assertThrows } from 'https://deno.land/std@0.126.0/testing/asserts.ts';
import { Grid } from './Grid.ts';

Deno.test('Should initialize a grid with the given size', () => {
  const rows = 4;
  const columns = 4;

  const actual = new Grid(rows, columns, []);

  assertEquals(actual.rows, rows);
  assertEquals(actual.columns, columns);
});

Deno.test('Should initialize an empty grid', () => {
  const rows = 4;
  const columns = 4;

  const row = new Array(rows).fill(' ');
  const expected = new Array(columns).fill(row);

  const actual = new Grid(rows, columns, []);

  assertEquals(actual.grid, expected);
});

Deno.test('Should add a letter to the grid', () => {
  const actual = new Grid(4, 4, ['D']);
  const letter = 'D';

  const expected = [
    '    ',
    ' D  ',
    '    ',
    '    ',
  ].map((row) => row.split(''));
  actual.addSymbol(letter, 1, 1);

  assertEquals(actual.grid, expected);
});

Deno.test('Should throw an error if letter is out of bounds', () => {
  const actual = new Grid(4, 4, ['D']);
  const letter = 'D';

  assertThrows(() => actual.addSymbol(letter, 4, 0), RangeError);
  assertThrows(() => actual.addSymbol(letter, 0, 4), RangeError);
  assertThrows(() => actual.addSymbol(letter, -1, 0), RangeError);
  assertThrows(() => actual.addSymbol(letter, 0, -1), RangeError);
});

Deno.test('Should throw an error if symbol isnt supported', () => {
  const actual = new Grid(4, 4, ['D']);
  const letter = 'E';

  assertThrows(() => actual.addSymbol(letter, 1, 1), Deno.errors.InvalidData);
});

Deno.test('Should add a word in a grid horizontally', () => {
  const actual = new Grid(4, 4, 'foo'.split(''));
  const word = 'foo';

  const expected = [
    '    ',
    '    ',
    ' foo',
    '    ',
  ].map((row) => row.split(''));

  actual.addWord(word, 1, 2, 'horizontal');

  assertEquals(actual.grid, expected);
});

Deno.test('Should add a word in a grid vertically', () => {
  const actual = new Grid(4, 4, 'foo'.split(''));
  const word = 'foo';

  const expected = [
    '    ',
    ' f  ',
    ' o  ',
    ' o  ',
  ].map((row) => row.split(''));

  actual.addWord(word, 1, 1, 'vertical');

  assertEquals(actual.grid, expected);
});

Deno.test('Should throw an error if word is out of bounds', () => {
  const actual = new Grid(4, 4, 'Deuteronomical'.split(''));
  const word = 'Deuteronomical';

  assertThrows(() => actual.addWord(word, 1, 1, 'horizontal'), RangeError);
  assertThrows(() => actual.addWord(word, 1, 1, 'vertical'), RangeError);
});

Deno.test('Should expose a single cell', () => {
  const grid = new Grid(4, 4, 'foo'.split(''));
  const word = 'foo';

  grid.addWord(word, 0, 0, 'vertical');

  const expected = word[1];
  const actual = grid.getCell(0, 1);

  assertEquals(actual, expected);
});

Deno.test('Should expose a given row', () => {
  const grid = new Grid(4, 4, 'foo'.split(''));
  const word = 'foo';

  grid.addWord(word, 1, 2, 'horizontal');

  const expected = ' foo'.split('');
  const actual = grid.getRow(2);

  assertEquals(actual, expected);
});

Deno.test('Should expose a given column', () => {
  const grid = new Grid(4, 4, 'foo'.split(''));
  const word = 'foo';

  grid.addWord(word, 1, 1, 'vertical');

  const expected = ' foo'.split('');
  const actual = grid.getColumn(1);

  assertEquals(actual, expected);
});
