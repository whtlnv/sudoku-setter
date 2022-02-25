export type Direction = 'horizontal' | 'vertical';

export class Grid {
  columns: number;
  rows: number;
  private _grid: string[][];

  constructor(rows: number, columns: number) {
    this.columns = columns;
    this.rows = rows;
    this._grid = [];

    this.resetGrid(rows, columns);
  }

  public get grid() {
    return this._grid;
  }

  resetGrid(columns: number, rows: number) {
    this._grid = new Array(rows).fill('').map(() => new Array(columns).fill(' '));
    return this;
  }

  addLetter(letter: string, column: number, row: number) {
    if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
      throw new RangeError();
    }

    this._grid[row][column] = letter;
    return this;
  }

  addWord(word: string, column: number, row: number, direction: Direction) {
    const wordArray = word.split('');
    if (direction === 'horizontal') {
      wordArray.forEach((letter, index) => {
        this.addLetter(letter, column + index, row);
      });
    } else {
      wordArray.forEach((letter, index) => {
        this.addLetter(letter, column, row + index);
      });
    }
  }

  getRow(row: number) {
    return this._grid[row];
  }

  getColumn(column: number) {
    return this._grid.map((row) => row[column]);
  }

  printGrid() {
    console.log(this._grid.map((row) => row.join(' ')).join('\n'));
  }
}
