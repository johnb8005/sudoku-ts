
// sudoku solver
// the sudoku board is linearized in a simple array[Option[Int]]
// there is a solution set array that contain all possible combination: array[array[Int]]

// in all the below functions, the parameter `dim` is the number of dimensions for the sudoku. The traditional sudoku has `dim=3`

/**
 * creates a new (unit) set: [1, 2, 3, ...]
 * @return [1, 2, 3, ...]
 */
export const newSet = (dim:number):number[] => Array(dim * dim).fill(0).map((_,i) => i + 1);

/**
 * [description]
 * @param  sudoku: given sudoku linearized. Empty cells are `nulls`
 * @param  
 * @return sudoku but all `nulls` are replaced with an array of all possibilities
 */
export const initSolset = (sudoku:(null | number)[], dim:number = 3): (number[] | number)[] => {
  return sudoku.map(s => {
    if (s) {
      return s;
    }

    return newSet(dim);
  });
}

/**
 * get the list of coordinates for a row
 * @param  i: row index (starts at 1)
 * @return e.g. [1, 2, 3, ...]
 */
export const getRowCoords = (i:number, dim:number = 3):number[] => Array(dim * dim).fill(0).map((_x, k) => i*dim*dim + k);

/**
 * get the list of coordinates for a column
 * @param  i: row index (starts at 1)
 * @return e.g. [1, 9, 18, ...]
 */
export const getColCoords = (i:number, dim:number = 3):number[] => Array(dim * dim).fill(0).map((x, k) => i + dim*dim*k);

/**
 * get the list of coordinates for a cell of cells (in regular sudoku, 3x3 cells)
 * @param  i: row index (starts at 1)
 * @return e.g. [1, 2, 3, 9, 10, 11, ...]
 */
export const getCellCoords = (i:number, dim:number = 3) => {
  if (dim === 3) {
    if (i=== 0) return [0, 1, 2,  9, 10, 11, 18, 19, 20];
    if (i=== 1) return [3, 4, 5, 12, 13, 14, 21, 22, 23];
    if (i=== 2) return [6, 7, 8, 15, 16, 17, 24, 25, 26];
  // second three cells (from left to right)
    if (i=== 3) return [27, 28, 29, 36, 37, 38, 45, 46, 47];
    if (i=== 4) return [30, 31, 32, 39, 40, 41, 48, 49, 50];
    if (i=== 5) return [33, 34, 35, 42, 43, 44, 51, 52, 53];
  // third three cells (from left to right)
    if (i=== 6) return [54, 55, 56, 63, 64, 65, 72, 73, 74];
    if (i=== 7) return [57, 58, 59, 66, 67, 68, 75, 76, 77];
    if (i=== 8) return [60, 61, 62, 69, 70, 71, 78, 79, 80];
  }


  const r = [];

  // first adder
  const a1 = (i % dim )*dim;
  // second adder
  const a2 = Math.floor(i/2)*dim*dim*dim;

  for (let j = 0; j < dim; j++) {
    for (let k = 0; k < dim; k++) {
      const x = a1 + a2 + j*dim*dim +k;
      r.push(x);
    }
  }

  return r;
}

export const list2Possibilities = (row:any[], coords:number[]) => {
  // filter out all the cells that have 2 digits as a possibility
  const twoPossibilities = row.filter((r, i) => Array.isArray(r) && r.length === 2 && coords.includes(i));

  // keep the duplicates
  // go through the upper right triangle (avoid extra unnecessary computation) matrix (formed by the two vectors)
  return twoPossibilities.flatMap((x, i) => {
    return twoPossibilities.map((y, j) => {
      if (i > j && compareArray(x, y)) {
        return x;
      }

      return null;
    });
  })
  .filter(_ => _ !== null);
}

/**
 * looks at one "set". a set here is defined as an array where all elements should uniquely contain all digits. In the normal sudoku, that includes rows, cells and columns
 * @param row: full array of sudoku
 * @param coords: coords that represent the "set"
 * @return full array but without redundancies within a particular set; if a set contained both `1` and `[1, 3]`, the functoin would return for these cells `1` and `3`
 */
export const checkRow = (row:any[], coords:any[]) => {
  const temps = row.filter((r, i) => typeof r === 'number' && coords.includes(i));

  const listof2 = list2Possibilities(row, coords)

  return row.map((r, i) => {
    // check if it is a single digit
    if(typeof r === 'number' || !coords.includes(i)) {
      return r;
    }

    // when an array substract the other ruled out possibilities (without substrating itself)
    const x = substractArray(r, temps);
    const y = substractArrayFromArray(x, listof2);

    if (y.length === 1) {
      return y[0];
    }

    return y;
  });
}

/**
 * compares two unsorted array 
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @return true if same array
 */
export const compareArray = (a:number[], b:number[]):boolean => {
  if ( a.length !== b.length) {
    return false;
  }
  return a.filter(function(i) {
    return !b.includes(i);
  }).length === 0;  
}

/**
 * substract array s from a
 */
export const substractArray = (a:any[], s:any[]):boolean[] => a.filter(x => !s.includes(x));

export const substractArrayFromArray = (a:any[], ss:any[]) => {
  if (a.length === 2 && !compareArray(a, ss)) {
    return a;
  }

  const mergedSs = [].concat.apply([], ss);

  return substractArray(a, mergedSs);
}

/**
 * generalization of checkRow
 * @param  {[type]} funcCoord : the function that describes the set

 */
export const checkDim = (sudoku:(number[] | number)[], funcCoord:CoordFunc, dim:number, rowIdx = 0):any => {
  if (rowIdx === dim * dim ) {
    return sudoku;
  }

  const coords = funcCoord(rowIdx, dim);
  const s = checkRow(sudoku, coords);

  return checkDim(s, funcCoord, dim, rowIdx + 1);
}

type CoordFunc = (i: number, dim?: number) => number[]

/**
 * go through all types of "set" once
 * @param  {[type]} sudoku         [description]
 * @return sudoku array without redundancies that were found.
 */
export const solveIteration = (sudoku:(number[] | number)[], dim:number = 3, strategies:CoordFunc[] = [getRowCoords, getColCoords, getCellCoords]):(number[] | number)[] => {
  const st = strategies.pop()

  if(st){
    const s = checkDim(sudoku, st, dim);
    return solveIteration(s, dim, strategies);
  }

  return sudoku;
}

/**
 * iterates over `solveIteration`
 */
export const solve = (sudoku:(number[] | number)[], dim:number = 3, nEpochs:number = 30):any => {
  //console.log(`=== computing epoch ${nEpochs} (counting backwards) ===`)
  if (nEpochs === 0) {
    console.log(`algorithm after all epochs were exhausted (${nEpochs})`);
    return sudoku;
  }

  const nFound = sudoku.filter(x => typeof x !== 'number').length;

  //console.log(`the grid contains ${nFound}/${dim ** 4} cells that are undefined (${(100 * nFound/(dim ** 4)).toFixed(2)}%)`)

  // check if something is left to solve, else return array
  if(nFound === 0) {
    console.log(`algorithm aborted early at epochs ${nEpochs}`);
    return sudoku;
  }

  const s = solveIteration(sudoku, dim);

  return solve(s, dim, nEpochs - 1);
}

export const solveWithInit = (sudoku:(null | number)[], dim:number = 3, nIteration:number = 30) => {
  const s0 = initSolset(sudoku);
  return solve(s0, dim, nIteration);
}


export const printSudoku = (s:number[][], dim:number = 3, cutoff:number = 2) => Array(dim**2).fill(0).map((_, j) => {
  return s
    .filter((x, i) => i >= j*9 && i <= (j+1)*9 -1)
    .map(x => x.length > cutoff ? `(-${x.length}-)` : x )
    .reduce((a, b) => `${a} \t${b}`);
})
.reduce((a, b) => `${a}\n${b}`);
