package sudoku

import Cell._

class SudokuSuite extends munit.FunSuite {

  test("newSet returns 1..9 for dim=3") {
    assertEquals(Sudoku.newSet(3), (1 to 9).toSet)
  }

  test("newSet returns 1..4 for dim=2") {
    assertEquals(Sudoku.newSet(2), Set(1, 2, 3, 4))
  }

  test("getRowCoords") {
    assertEquals(Sudoku.getRowCoords(0), (0 to 8).toVector)
    assertEquals(Sudoku.getRowCoords(1), (9 to 17).toVector)
    assertEquals(Sudoku.getRowCoords(8), (72 to 80).toVector)
  }

  test("getColCoords") {
    assertEquals(Sudoku.getColCoords(0), Vector(0, 9, 18, 27, 36, 45, 54, 63, 72))
    assertEquals(Sudoku.getColCoords(1), Vector(1, 10, 19, 28, 37, 46, 55, 64, 73))
  }

  test("getCellCoords matches the hand-rolled 3x3 lookup") {
    assertEquals(Sudoku.getCellCoords(0), Vector(0, 1, 2, 9, 10, 11, 18, 19, 20))
    assertEquals(Sudoku.getCellCoords(1), Vector(3, 4, 5, 12, 13, 14, 21, 22, 23))
    assertEquals(Sudoku.getCellCoords(4), Vector(30, 31, 32, 39, 40, 41, 48, 49, 50))
    assertEquals(Sudoku.getCellCoords(8), Vector(60, 61, 62, 69, 70, 71, 78, 79, 80))
  }

  test("initSolset preserves fixed values and fills empties with full candidates") {
    val raw = Vector(Some(5), None, Some(2), None)
    val r   = Sudoku.initSolset(raw, dim = 2)
    assertEquals(r(0), Fixed(5))
    assertEquals(r(1), Candidates(Set(1, 2, 3, 4)))
    assertEquals(r(2), Fixed(2))
    assertEquals(r(3), Candidates(Set(1, 2, 3, 4)))
  }

  test("solveIteration solves a simple 2-dim sudoku") {
    val s: Vector[Option[Int]] = Vector(
      Some(1), None,    Some(3), Some(4),
      Some(4), None,    None,    Some(1),
      Some(2), Some(1), Some(4), None,
      None,    None,    Some(1), Some(2)
    )
    val expected = Vector(
      1, 2, 3, 4,
      4, 3, 2, 1,
      2, 1, 4, 3,
      3, 4, 1, 2
    ).map(Fixed.apply)

    val solved = Sudoku.solveIteration(Sudoku.initSolset(s, 2), 2)
    assertEquals(solved, expected)
  }

  test("solveWithInit solves the demo 3-dim puzzle from sudoku.js") {
    val s: Vector[Option[Int]] = Vector(
      None,    None,    None,    Some(4), None,    None,    None,    Some(8), None,
      None,    None,    Some(6), None,    Some(8), None,    Some(1), None,    Some(3),
      None,    Some(8), None,    Some(1), None,    Some(3), None,    Some(5), None,
      Some(2), None,    None,    None,    Some(6), None,    Some(8), None,    Some(1),
      None,    Some(6), None,    Some(8), None,    Some(1), None,    Some(3), Some(4),
      None,    None,    Some(1), None,    Some(3), Some(4), None,    Some(6), None,
      None,    Some(4), None,    Some(6), Some(7), None,    Some(9), None,    Some(2),
      Some(6), None,    None,    Some(9), None,    Some(2), None,    Some(4), Some(5),
      None,    None,    Some(2), None,    None,    None,    None,    None,    None
    )
    val expected = Vector(
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      4, 5, 6, 7, 8, 9, 1, 2, 3,
      7, 8, 9, 1, 2, 3, 4, 5, 6,
      2, 3, 4, 5, 6, 7, 8, 9, 1,
      5, 6, 7, 8, 9, 1, 2, 3, 4,
      8, 9, 1, 2, 3, 4, 5, 6, 7,
      3, 4, 5, 6, 7, 8, 9, 1, 2,
      6, 7, 8, 9, 1, 2, 3, 4, 5,
      9, 1, 2, 3, 4, 5, 6, 7, 8
    ).map(Fixed.apply)

    assertEquals(Sudoku.solveWithInit(s), expected)
  }

  test("solveWithInit solves a harder puzzle that requires the naked-pair rule") {
    val s: Vector[Option[Int]] = Vector(
      Some(5), None,    None,    None,    None,    None,    None,    None,    None,
      None,    None,    Some(6), Some(2), None,    Some(7), None,    None,    None,
      Some(7), Some(9), None,    Some(3), None,    Some(1), None,    None,    Some(4),
      None,    Some(1), Some(8), Some(7), None,    None,    Some(5), None,    Some(3),
      None,    None,    None,    Some(4), Some(6), Some(5), Some(1), None,    Some(2),
      None,    Some(2), None,    None,    None,    None,    None,    Some(9), None,
      Some(1), Some(5), Some(3), Some(8), None,    None,    None,    None,    None,
      None,    None,    None,    Some(5), Some(3), None,    Some(6), None,    None,
      Some(8), None,    None,    None,    None,    None,    None,    None,    Some(5)
    )
    val expected = Vector(
      5, 4, 1, 6, 9, 8, 2, 3, 7,
      3, 8, 6, 2, 4, 7, 9, 5, 1,
      7, 9, 2, 3, 5, 1, 8, 6, 4,
      6, 1, 8, 7, 2, 9, 5, 4, 3,
      9, 3, 7, 4, 6, 5, 1, 8, 2,
      4, 2, 5, 1, 8, 3, 7, 9, 6,
      1, 5, 3, 8, 7, 6, 4, 2, 9,
      2, 7, 9, 5, 3, 4, 6, 1, 8,
      8, 6, 4, 9, 1, 2, 3, 7, 5
    ).map(Fixed.apply)

    assertEquals(Sudoku.solveWithInit(s, 3, 10), expected)
  }
}
