import * as Sudoku from './sudoku';

test('real life test (2dim)', () => {
  const s:(number | null)[] = [
    1,    null, 3,    4,
    4,    null, null, 1,
    2,    1,    4,    null,
    null, null, 1,    2
  ];

  const s0 = Sudoku.initSolset(s, 2);
  const t = Sudoku.solveIteration(s0, 2);

  expect(t).toEqual([
    1, 2, 3, 4,
    4, 3, 2, 1,
    2, 1, 4, 3,
    3, 4, 1, 2])
});

test('real life test (3dim)', () => {
  /*const s2 = [
    3, 4, 9, 6, null, 2, null, null, null,
    null,  1, 8, 7, null, null, 2, null, null,
    null, 7, 2, null, 9, null, null, null, 8,
    null, null, null, null, 7, 4, null, null, 9,
    null, null, null, null, 2, null, 3, null, 5,
    null, null, null, 1, 6, null, null, 4, null,
    null, 2, null, null, 1, null, 9, 5, null,
    null,5, null, 2, null, 6, null, null, null,
    7, null, null, 3, null, 9, 4, 1, null
  ];*/

  const s:(null | number)[] = [
    null, null, null, 4, null, null, null, 8, null,
    null, null, 6, null, 8, null, 1, null, 3,
    null, 8, null, 1, null, 3, null, 5, null,
    2, null, null, null, 6, null, 8, null, 1,
    null, 6, null, 8, null, 1, null, 3, 4,
    null, null, 1, null, 3, 4, null, 6, null,
    null, 4, null, 6, 7, null, 9, null, 2,
    6, null, null, 9, null, 2, null, 4, 5,
    null, null, 2, null, null, null, null, null, null
  ];

  const e = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    4, 5, 6, 7, 8, 9, 1, 2, 3,
    7, 8, 9, 1, 2, 3, 4, 5, 6,
    2, 3, 4, 5, 6, 7, 8, 9, 1,
    5, 6, 7, 8, 9, 1, 2, 3, 4,
    8, 9, 1, 2, 3, 4, 5, 6, 7,
    3, 4, 5, 6, 7, 8, 9, 1, 2,
    6, 7, 8, 9, 1, 2, 3, 4, 5,
    9, 1, 2, 3, 4, 5, 6, 7, 8
  ];

  const t = Sudoku.solveWithInit(s);

  expect(t).toEqual(e);
});



test('example from previous app', () => {
  const arr = Array(81).fill(null);
  arr[0+0] = 9;
  arr[2+0] = 3;
  arr[3+0] = 7;
  arr[4+0] = 1;
  arr[7+0] = 8;
  arr[3+9] = 6;
  arr[4+9] = 9;
  arr[6+9] = 7;
  arr[7+9] = 3;
  arr[8+9] = 2;
  arr[0+18] = 2;
  arr[1+18] = 7;
  arr[2+18] = 6;
  arr[3+18] = 3;
  arr[6+18] = 1;

  arr[1+27] = 6;
  arr[5+27] = 9;
  arr[6+27] = 2;
  arr[7+27] = 7;
  arr[8+27] = 5;
  arr[0+36] = 3;
  arr[2+36] = 4;
  arr[3+36] = 2;
  arr[5+36] = 7;
  arr[8+36] = 6;
  arr[1+45] = 2;
  arr[2+45] = 7;
  arr[4+45] = 6;
  arr[5+45] = 1;
  arr[7+45] = 9;

  arr[0+54] = 1;
  arr[1+54] = 8;
  arr[2+54] = 5;
  arr[4+54] = 2;
  arr[7+54] = 4;
  arr[3+63] = 5;
  arr[5+63] = 3;
  arr[6+63] = 9;
  arr[7+63] = 6;
  arr[8+63] = 1;
  arr[0+72] = 6;
  arr[1+72] = 3;
  arr[4+72] = 7;
  arr[5+72] = 4;
  arr[6+72] = 5;

  const t = Sudoku.solveWithInit(arr);

  const e = [
    9, 5, 3, 7, 1, 2, 6, 8, 4,
    4, 1, 8, 6, 9, 5, 7, 3, 2,
    2, 7, 6, 3, 4, 8, 1, 5, 9,
    8, 6, 1, 4, 3, 9, 2, 7, 5,
    3, 9, 4, 2, 5, 7, 8, 1, 6,
    5, 2, 7, 8, 6, 1, 4, 9, 3,
    1, 8, 5, 9, 2, 6, 3, 4, 7,
    7, 4, 2, 5, 8, 3, 9, 6, 1,
    6, 3, 9, 1, 7, 4, 5, 2, 8
  ];

  expect(t).toEqual(e);
});



test('real life example 3', () => {
  const s = [
    5, null, null, null, null, null, null, null, null,
    null, null, 6, 2, null, 7, null, null, null,
    7, 9, null, 3, null, 1, null, null, 4,
    null, 1, 8, 7, null, null, 5, null, 3,
    null, null, null, 4, 6, 5, 1, null, 2,
    null, 2, null, null, null, null, null, 9, null,
    1, 5, 3, 8, null, null, null, null, null,
    null, null, null, 5, 3, null, 6, null, null,
    8, null, null, null, null, null, null, null, 5
  ];

  const t = Sudoku.solveWithInit(s, 3, 10);

  // first version without checking for "doubles" would only solve until this level and get stuck
  const e2 = [
      5,                 [ 3, 4, 8 ],    [ 1, 4 ],       [ 6, 9 ], [ 4, 8, 9 ],       [ 4, 6, 8, 9 ], [ 2, 3, 4, 9 ], [ 1, 2, 3, 7 ],
      [ 1, 7, 8, 9 ],    
      [ 3, 4 ],       [ 3, 4, 8 ],    6,
      2,                 [ 4, 8, 9 ],    7,              [ 3, 4, 9 ],
      [ 1, 3, 5 ],       [ 1, 8, 9 ], 
      7,              9,
      2,                 3,              5,              1,
      8,                 6,              4,              
      [ 6, 9 ],
      1,                 8,              7,              [ 2, 9 ],
      [ 2, 6, 9 ],       5,              4,              3,
      [ 3, 9 ],          [ 3, 7 ],       [ 7, 9 ],       4,
      6,                 5,              1,              8,
      2,                 
      [ 3, 4 ],       2,              [ 4, 5 ],
      1,                 [ 4, 8 ],       [ 3, 4, 8 ],    7,
      9,                 6,              
      1,              5,
      3,                 8,              [ 2, 4, 7, 9 ], [ 2, 4, 6, 9 ],
      [ 2, 4, 9 ],       [ 2, 7 ],       [ 7, 9 ],       
      [ 2, 9 ],
      [ 4, 7, 8 ],       [ 1, 4, 7, 9 ], 5,              3,
      [ 2, 4, 9 ],       6,              [ 1, 2, 7 ],    [ 1, 7, 8, 9 ],
      8,                 [ 3, 4, 6, 7 ], [ 1, 4, 7, 9 ], [ 6, 9 ],
      [ 1, 2, 4, 7, 9 ], [ 2, 4, 6, 9 ], [ 2, 3, 4, 9 ], [ 1, 2, 3, 7 ],
      5
    ];

  const e = [
    5, 4, 1, 6, 9, 8, 2, 3, 7,
    3, 8, 6, 2, 4, 7, 9, 5, 1,
    7, 9, 2, 3, 5, 1, 8, 6, 4,
    6, 1, 8, 7, 2, 9, 5, 4, 3,
    9, 3, 7, 4, 6, 5, 1, 8, 2,
    4, 2, 5, 1, 8, 3, 7, 9, 6,
    1, 5, 3, 8, 7, 6, 4, 2, 9,
    2, 7, 9, 5, 3, 4, 6, 1, 8,
    8, 6, 4, 9, 1, 2, 3, 7, 5
  ];

  expect(t).toEqual(e);
});

// too hard
test('sudoku.gamne - medium', () => {
  const s = [
  5, null, null, null, 3, null, null, null, null,
  null, null, null, null, null, 5, null, 9, 4,
  null, null, 3, null, null, null, 8, null, 2,
  null, null, 2, null, null, null, 7, null, 8,
  null, null, null, null, 1, null, null, null, null,
  null, 3, null, null, 8, null, 6, 2, 5,
  null, 1, null, null, 5, null, null, 6, null,
  2, null, null, 6, null, 9, null, null, null,
  null, 6, null, null, null, 2, null, null, null
  ];
  const t = Sudoku.solveWithInit(s, 3, 10);
  const dim = 3
  const cutoff = 3
  console.log(Sudoku.printSudoku(t, dim, cutoff));

  //expect(t).toEqual(s);
})

// too hard
test('sudoku.game - hard', () => {
  const s = [
    null, 7, null, 8, null, null, null, null, null,
    null, null, 6, null, null, null, 8, null, 2,
    null, null, null, null, 3, null, null, null, null,
    null, null, 4, null, null, 2, 5, null, null,
    null, 5, null, null, null, 9, null, 7, 8,
    null, null, null, 4, null, null, null, null, null, 
    null, null, 7, null, null, 4, null, null, 5,
    6, 9, null, 3, null, null, null, null, 7, 
    null, null, null, null, null, 7, 3, 1, null
  ];

  const t = Sudoku.solveWithInit(s, 3, 10);

  console.log(Sudoku.printSudoku(t));

  //expect(t).toEqual(s);
})