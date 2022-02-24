import { assertEquals, assertThrows } from 'https://deno.land/std@0.126.0/testing/asserts.ts';
import { addLetterToGrid, addWordToGrid, initGrid, OutOfBoundsError } from './buildGrid.ts';

Deno.test('Should initialize an empty grid', () => {
  const width = 4;
  const height = 4;

  const row = new Array(width).fill(' ');
  const expected = new Array(height).fill(row);

  const actual = initGrid(width, height);

  assertEquals(actual, expected);
});

Deno.test('Should add a letter to the grid', () => {
  const grid = initGrid(4, 4);
  const letter = 'D';

  const expected = [
    '    ',
    ' D  ',
    '    ',
    '    ',
  ].map((row) => row.split(''));
  const actual = addLetterToGrid(grid, letter, 1, 1);

  assertEquals(actual, expected);
});

Deno.test('Should throw an error if letter is out of bounds', () => {
  const grid = initGrid(4, 4);
  const letter = 'D';

  assertThrows(() => addLetterToGrid(grid, letter, 5, 5), OutOfBoundsError);
});

Deno.test('Should add a word in a grid horizontally', () => {
  const grid = initGrid(4, 4);
  const word = 'foo';

  const expected = [
    '    ',
    '    ',
    ' foo',
    '    ',
  ].map((row) => row.split(''));

  const actual = addWordToGrid(grid, word, 1, 2, 'horizontal');

  assertEquals(actual, expected);
});

Deno.test('Should add a word in a grid vertically', () => {
  const grid = initGrid(4, 4);
  const word = 'foo';

  const expected = [
    '    ',
    ' f  ',
    ' o  ',
    ' o  ',
  ].map((row) => row.split(''));

  const actual = addWordToGrid(grid, word, 1, 1, 'vertical');

  assertEquals(actual, expected);
});

Deno.test('Should throw an error if word is out of bounds', () => {
  const grid = initGrid(4, 4);
  const word = 'Deuteronomical';

  assertThrows(() => addWordToGrid(grid, word, 1, 1, 'vertical'), OutOfBoundsError);
});
