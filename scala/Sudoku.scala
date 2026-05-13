package sudoku

// Sudoku solver
// The sudoku board is linearised in a simple Array of cells.
// Each cell is either a fixed digit (Cell.Fixed) or the set of remaining
// candidate digits (Cell.Candidates).
//
// `dim` is the number of dimensions for the sudoku. The traditional sudoku
// has dim = 3 (a 9x9 board made of 3x3 sub-grids).

sealed trait Cell
object Cell {
  final case class Fixed(value: Int) extends Cell
  final case class Candidates(values: Set[Int]) extends Cell
}

object Sudoku {
  import Cell._

  type Board = Vector[Cell]
  type CoordFunc = (Int, Int) => Vector[Int]

  /** A fresh candidate set: {1, 2, ..., dim*dim}. */
  def newSet(dim: Int): Set[Int] = (1 to dim * dim).toSet

  /** Replace every empty cell (None) with the full candidate set. */
  def initSolset(sudoku: Vector[Option[Int]], dim: Int = 3): Board =
    sudoku.map {
      case Some(v) => Fixed(v)
      case None    => Candidates(newSet(dim))
    }

  /** Coordinates of the i-th row (0-indexed). */
  def getRowCoords(i: Int, dim: Int = 3): Vector[Int] = {
    val n = dim * dim
    (0 until n).toVector.map(k => i * n + k)
  }

  /** Coordinates of the i-th column (0-indexed). */
  def getColCoords(i: Int, dim: Int = 3): Vector[Int] = {
    val n = dim * dim
    (0 until n).toVector.map(k => i + n * k)
  }

  /** Coordinates of the i-th sub-grid (0-indexed). */
  def getCellCoords(i: Int, dim: Int = 3): Vector[Int] = {
    val n = dim * dim
    val rowBlock = i / dim
    val colBlock = i % dim
    (for {
      r <- 0 until dim
      c <- 0 until dim
    } yield (rowBlock * dim + r) * n + (colBlock * dim + c)).toVector
  }

  /** Find pairs of cells in the set that share the exact same 2-candidate
    * set. These pairs lock those two digits, so they can be eliminated from
    * the other cells in the set (the "naked pair" rule).
    */
  def list2Possibilities(board: Board, coords: Vector[Int]): Vector[Set[Int]] = {
    val twos = coords.flatMap { i =>
      board(i) match {
        case Candidates(s) if s.size == 2 => Some(s)
        case _                            => None
      }
    }

    val seen = scala.collection.mutable.Set.empty[Set[Int]]
    val dup  = scala.collection.mutable.Set.empty[Set[Int]]
    twos.foreach { s =>
      if (seen.contains(s)) dup += s else seen += s
    }
    dup.toVector
  }

  /** Look at one "set" - a group of cells that must each hold a unique digit.
    * Eliminate fixed digits and naked pairs from every candidate cell in the
    * set. If a cell is reduced to a single candidate it becomes fixed.
    */
  def checkRow(board: Board, coords: Vector[Int]): Board = {
    val fixed = coords.flatMap { i =>
      board(i) match {
        case Fixed(v) => Some(v)
        case _        => None
      }
    }.toSet

    val pairs = list2Possibilities(board, coords)
    val coordSet = coords.toSet

    board.zipWithIndex.map { case (cell, i) =>
      if (!coordSet.contains(i)) cell
      else cell match {
        case Fixed(_) => cell
        case Candidates(s) =>
          val afterFixed = s -- fixed
          val afterPairs =
            if (afterFixed.size == 2 && pairs.contains(afterFixed)) afterFixed
            else afterFixed -- pairs.flatten
          if (afterPairs.size == 1) Fixed(afterPairs.head)
          else Candidates(afterPairs)
      }
    }
  }

  /** Apply `checkRow` to every set produced by `funcCoord`. */
  def checkDim(board: Board, funcCoord: CoordFunc, dim: Int): Board =
    (0 until dim * dim).foldLeft(board) { (acc, i) =>
      checkRow(acc, funcCoord(i, dim))
    }

  /** Run one full pass across rows, columns and sub-grids. */
  def solveIteration(
      board: Board,
      dim: Int = 3,
      strategies: Vector[CoordFunc] = Vector(getRowCoords, getColCoords, getCellCoords)
  ): Board =
    strategies.foldLeft(board) { (acc, st) => checkDim(acc, st, dim) }

  /** Iterate `solveIteration` until the board is fully fixed or `nEpochs`
    * is reached. Returns whatever is found so far.
    */
  def solve(board: Board, dim: Int = 3, nEpochs: Int = 30): Board = {
    if (nEpochs == 0) board
    else if (board.forall(_.isInstanceOf[Fixed])) board
    else solve(solveIteration(board, dim), dim, nEpochs - 1)
  }

  /** Entry point: take a raw board of Option[Int] and return the solved
    * (or partially solved) board.
    */
  def solveWithInit(sudoku: Vector[Option[Int]], dim: Int = 3, nEpochs: Int = 30): Board =
    solve(initSolset(sudoku, dim), dim, nEpochs)

  /** Render the board as a human-readable grid. Cells with more than `cutoff`
    * candidates are shown as `(-n-)` where n is the candidate count.
    */
  def printSudoku(board: Board, dim: Int = 3, cutoff: Int = 2): String = {
    val n = dim * dim
    (0 until n).map { row =>
      (0 until n).map { col =>
        board(row * n + col) match {
          case Fixed(v)      => v.toString
          case Candidates(s) =>
            if (s.size > cutoff) s"(-${s.size}-)" else s.toVector.sorted.mkString("[", ",", "]")
        }
      }.mkString("\t")
    }.mkString("\n")
  }
}
