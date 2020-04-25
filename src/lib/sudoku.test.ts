import * as Sudoku from './sudoku';

test('subtract array', () => {
  const a = [1, 2, 3, 4, 5];
  const s = [2, 5, 4];
  const e = [1, 3];

  expect(Sudoku.substractArray(a, s)).toEqual(e)
});

//
const dim = 2;

test('init', () => {
  const sudoku = [1, 2, 3, 4, 4, 3, 2, 1, 1, 2, 3, 4, 4, 3, 2, null];
  const s = Sudoku.initSolset(sudoku, 2);
  const t = [1, 2, 3, 4, 4, 3, 2, 1, 1, 2, 3, 4, 4, 3, 2, [1, 2, 3, 4]];  

  expect(s).toEqual(t);
});

test('check row', () => {
  const coords = [0, 1, 2, 3];
  const row1 = [1, 2, 3, [1, 2, 3, 4]]; 
  const e1 = [1, 2, 3, 4];
  expect(Sudoku.checkRow(row1, coords)).toEqual(e1);

  const row2 = [1, 2, [1, 2, 3, 4], [1, 2, 3, 4]]; 
  const e2 = [1, 2, [3, 4], [3,4]];
  expect(Sudoku.checkRow(row2, coords)).toEqual(e2);

  const row3 = [[1, 2, 3, 4], 2, [1, 2, 3, 4], [1, 2, 3, 4]]; 
  const e3 = [[1, 3, 4],  2, [1, 3, 4], [1, 3,4]];
  expect(Sudoku.checkRow(row3, coords)).toEqual(e3);


  const row4 = [[1, 3], 2, [1, 3], [1, 2, 3, 4]]; 
  const e4 = [[1, 3], 2, [1, 3], 4];
  expect(Sudoku.checkRow(row4, coords)).toEqual(e4);
  
  
  // have test for of list 2 possibilities (see test below)
  const row5 = [[1, 3, 2], [1, 2], [3, 7], [3, 7], [3, 7, 1], 6, [8,9], [9,8], [1, 3, 2]];
  const e5   = [[1, 2],    [1, 2], [3, 7], [3, 7], 1,        6, [8, 9], [9,8], [1, 2]];
  const coords5 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const r5 = Sudoku.checkRow(row5, coords5);
  expect(r5).toEqual(e5);
});


test('get row coords', () => {
  // 2 dim
  expect(Sudoku.getRowCoords(0, dim)).toEqual([0, 1, 2, 3]);
  expect(Sudoku.getRowCoords(1, dim)).toEqual([4, 5, 6, 7]);
  // 3 dim
  expect(Sudoku.getRowCoords(0)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  expect(Sudoku.getRowCoords(1)).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
});

test('get col coords', () => {
  // 2 dim
  expect(Sudoku.getColCoords(0, dim)).toEqual([0, 4, 8, 12]);
  expect(Sudoku.getColCoords(1, dim)).toEqual([1, 5, 9, 13]);
  // 3 dim
  expect(Sudoku.getColCoords(0)).toEqual([0,  9, 18, 27, 36, 45, 54, 63, 72]);
  expect(Sudoku.getColCoords(1)).toEqual([1, 10, 19, 28, 37, 46, 55, 64, 73]);
  expect(Sudoku.getColCoords(2)).toEqual([2, 11, 20, 29, 38, 47, 56, 65, 74]);
  expect(Sudoku.getColCoords(3)).toEqual([3, 12, 21, 30, 39, 48, 57, 66, 75]);
  expect(Sudoku.getColCoords(4)).toEqual([4, 13, 22, 31, 40, 49, 58, 67, 76]);
  expect(Sudoku.getColCoords(5)).toEqual([5, 14, 23, 32, 41, 50, 59, 68, 77]);
  expect(Sudoku.getColCoords(6)).toEqual([6, 15, 24, 33, 42, 51, 60, 69, 78]);
  expect(Sudoku.getColCoords(7)).toEqual([7, 16, 25, 34, 43, 52, 61, 70, 79]);
  expect(Sudoku.getColCoords(8)).toEqual([8, 17, 26, 35, 44, 53, 62, 71, 80]);
})

test('get cell coords', () => {
  // 2 dim
  expect(Sudoku.getCellCoords(0, dim)).toEqual([0, 1, 4, 5]);
  expect(Sudoku.getCellCoords(1, dim)).toEqual([2, 3, 6, 7]);
  expect(Sudoku.getCellCoords(2, dim)).toEqual([8, 9, 12, 13]);
  expect(Sudoku.getCellCoords(3, dim)).toEqual([10, 11, 14, 15]);
  // 3 dim
  // first three cells (from left to right)
  expect(Sudoku.getCellCoords(0)).toEqual([0, 1, 2, 9, 10, 11, 18, 19, 20]);
  expect(Sudoku.getCellCoords(1)).toEqual([3, 4, 5, 12, 13, 14, 21, 22, 23]);
  expect(Sudoku.getCellCoords(2)).toEqual([6, 7, 8, 15, 16, 17, 24, 25, 26]);
  // second three cells (from left to right)
  expect(Sudoku.getCellCoords(3)).toEqual([27, 28, 29, 36, 37, 38, 45, 46, 47]);
  expect(Sudoku.getCellCoords(4)).toEqual([30, 31, 32, 39, 40, 41, 48, 49, 50]);
  expect(Sudoku.getCellCoords(5)).toEqual([33, 34, 35, 42, 43, 44, 51, 52, 53]);
  // third three cells (from left to right)
  expect(Sudoku.getCellCoords(6)).toEqual([54, 55, 56, 63, 64, 65, 72, 73, 74]);
  expect(Sudoku.getCellCoords(7)).toEqual([57, 58, 59, 66, 67, 68, 75, 76, 77]);
  expect(Sudoku.getCellCoords(8)).toEqual([60, 61, 62, 69, 70, 71, 78, 79, 80]);
});


test('checkdim', () => {
  const s1 = [
               1, [1, 2, 3, 4], 3,           4,
    [1, 2, 3, 4], 3,            2,           1,
               2, 1,            4,           3,
               3, 4,            1, [1, 2, 3, 4]
  ];

  const e1 = [
    1, 2, 3, 4,
    4, 3, 2, 1,
    2, 1, 4, 3,
    3, 4, 1, 2
  ];

  const s = Sudoku.checkDim(s1, Sudoku.getRowCoords, dim);
  expect(s).toEqual(e1);
});



test('check cols', () => {
  const s1 = [
    1,            [1, 2, 3, 4],            3, 4,
    4,                       3, [1, 2, 3, 4], 1,
    2,                       1,            4, [1, 2, 3, 4],
    [1, 2, 3, 4],            4,            1, 2
  ];

  const e1 = [
    1, 2, 3, 4,
    4, 3, 2, 1,
    2, 1, 4, 3,
    3, 4, 1, 2
  ];

  const s = Sudoku.checkDim(s1, Sudoku.getColCoords, dim);

  expect(s).toEqual(e1);
});

test('check cells', () => {
  const s1 = [
    1,            [1, 2, 3, 4],            3, 4,
    4,                       3, [1, 2, 3, 4], 1,
    2,                       1,            4, [1, 2, 3, 4],
    [1, 2, 3, 4],            4,            1, 2
  ];

  const e1 = [
    1, 2, 3, 4,
    4, 3, 2, 1,
    2, 1, 4, 3,
    3, 4, 1, 2
  ];

  const s = Sudoku.checkDim(s1, Sudoku.getCellCoords, dim);

  expect(s).toEqual(e1);
});


test('list2Possibilities', () => {
  const rows = [[3, 7], [7,3], [1, 3, 7]];
  const coords = [0, 1, 2];

  const r = Sudoku.list2Possibilities(rows, coords);
  const e = [[7, 3]];

  expect(r).toEqual(e);
});

test('list2Possibilities (2)', () => {
  const rows = [[3, 7], [3 ,7], [1, 3, 7]];
  const coords = [0, 1, 2];

  const r = Sudoku.list2Possibilities(rows, coords);
  const e = [[3, 7]];

  expect(r).toEqual(e);
});

test('list2Possibilities (3)', () => {
  const rows = [[3, 7], [1, 3, 7]];
  const coords = [0, 1, 2];

  const r = Sudoku.list2Possibilities(rows, coords);
  const e = [];

  expect(r).toEqual(e);
});

test('list2Possibilities (4)', () => {
  const rows = [[3, 7], [3 ,7], [2, 4], [2, 4], [1, 3, 7]];
  const coords = [0, 1, 2, 3, 4];

  const r = Sudoku.list2Possibilities(rows, coords);
  const e = [[3, 7], [2, 4]];

  expect(r).toEqual(e);
});

test('list2Possibilities (4)', () => {
  const row = [[1, 3, 2], [1, 2], [3, 7], [3, 7], [3, 7, 1], 6, [8,9], [9,8], [1, 3, 2]];
  const coords = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const r = Sudoku.list2Possibilities(row, coords);
  const e   = [ [ 3, 7 ], [ 9, 8 ] ];

  expect(r).toEqual(e);
});

test('list 3 possibilities', () => {
  const row = [[1, 3, 2], [1, 3, 2], [1, 2], 4, 5];
  const coords = [0, 1, 2, 3, 4];

  const r = list3Possibilities(row, coords);
  const e   = [ [ 1, 3, 2 ] ];

  expect(r).toEqual(e);
});

/*
test('list 3 possibilities (2)', () => {
  const row = [[1, 3, 2], [1, 3, 2], [1, 2], 4, 5, [6, 7], [6, 7]];
  const coords = [0, 1, 2, 3, 4, 5, 6];
  const r = list3Possibilities(row, coords);
  const e   = [ [ 1, 3, 2 ] ];
  expect(r).toEqual(e);
});*/

export const list3Possibilities = (row, coords) => {
  // filter out all the cells that have 2 digits as a possibility
  const twoPossibilities = row.filter((r, i) => Array.isArray(r) && (r.length === 2 || r.length === 3) && coords.includes(i));

  // keep the duplicates
  // go through the upper right triangle (avoid extra unnecessary computation) matrix (formed by the two vectors)
  return twoPossibilities.flatMap((x, i) => {
    return twoPossibilities.map((y, j) => {
      if (i > j && Sudoku.compareArray(x, y)) {
        return x;
      }

      return null;
    });
  })
  .filter(_ => _ !== null);
}

test('substractArrayFromArray', () => {
  const s = [[3, 7], [9,8]];
  const a = [1, 3, 7];
  
  const e = [1];
  const r = Sudoku.substractArrayFromArray(a, s);

  expect(r).toEqual(e);
})

test('substractArrayFromArray 2', () => {
  //const row = [[1, 3, 2], [1, 2], [3, 7], [3, 7], [3, 7, 1], 6, [8,9], [9,8], [1, 3, 2]];
  // result of list 2 possibilities (see test below)
  const s = [[3, 7], [9,8]];
  const a = [ 3, 7];
  //const e   = [[1, 2],    [1, 2], [3, 7], [3, 7], 1,       , 6, [8, 9], [9,8], [1,2]];
  const e = [3, 7];
  const r = Sudoku.substractArrayFromArray(a, s);

  expect(r).toEqual(e);
});