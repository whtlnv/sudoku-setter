export type Direction = 'horizontal' | 'vertical';

export class Grid {
  private _columns: number;
  private _rows: number;
  private _orderedSymbols: string[];
  private _grid: string[][];

  constructor(rows: number, columns: number, orderedSymbols: string[]) {
    this._columns = columns;
    this._rows = rows;
    this._orderedSymbols = orderedSymbols;
    this._grid = [];

    this.resetGrid(rows, columns);
  }

  get grid() {
    return this._grid;
  }

  get columns() {
    return this._columns;
  }

  get rows() {
    return this._rows;
  }

  get orderedSymbols() {
    return this._orderedSymbols;
  }

  resetGrid(columns: number, rows: number) {
    this._grid = new Array(rows).fill('').map(() => new Array(columns).fill(' '));
    return this;
  }

  addSymbol(letter: string, column: number, row: number) {
    if (row < 0 || row >= this._rows || column < 0 || column >= this._columns) {
      throw new RangeError();
    }

    this._grid[row][column] = letter;
    return this;
  }

  addWord(word: string, column: number, row: number, direction: Direction) {
    const wordArray = word.split('');
    if (direction === 'horizontal') {
      wordArray.forEach((letter, index) => {
        this.addSymbol(letter, column + index, row);
      });
    } else {
      wordArray.forEach((letter, index) => {
        this.addSymbol(letter, column, row + index);
      });
    }
  }

  getCell(column: number, row: number) {
    return this._grid[row][column];
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
