export type Direction = 'horizontal' | 'vertical';

export class OutOfBoundsError extends Error {}

export function initGrid(width: number, height: number) {
  return new Array(width).fill('').map(() => new Array(height).fill(' '));
}

export function printGrid(grid: string[][]) {
  console.log(grid.map((row) => row.join(' ')).join('\n'));
}

export function addLetterToGrid(grid: string[][], letter: string, x: number, y: number) {
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
    throw new OutOfBoundsError();
  }

  grid[y][x] = letter;
  return grid;
}

export function addWordToGrid(
  grid: string[][],
  word: string,
  x: number,
  y: number,
  direction: Direction = 'horizontal',
) {
  for (let i = 0; i < word.length; i++) {
    const lx = direction === 'horizontal' ? x + i : x;
    const ly = direction === 'vertical' ? y + i : y;

    grid = addLetterToGrid(grid, word[i], lx, ly);
  }
  return grid;
}
