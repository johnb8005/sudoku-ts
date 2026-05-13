package sudoku

object Main {
  def main(args: Array[String]): Unit = {
    // Same puzzle as src/sudoku.js' defSudoku.
    val raw: Vector[Option[Int]] = Vector(
      None, None, None, Some(4), None,    None,    None,    Some(8), None,
      None, None, Some(6), None,    Some(8), None,    Some(1), None,    Some(3),
      None, Some(8), None, Some(1), None,    Some(3), None,    Some(5), None,
      Some(2), None, None, None,    Some(6), None,    Some(8), None,    Some(1),
      None, Some(6), None, Some(8), None,    Some(1), None,    Some(3), Some(4),
      None, None, Some(1), None,    Some(3), Some(4), None,    Some(6), None,
      None, Some(4), None, Some(6), Some(7), None,    Some(9), None,    Some(2),
      Some(6), None, None, Some(9), None,    Some(2), None,    Some(4), Some(5),
      None, None, Some(2), None,    None,    None,    None,    None,    None
    )

    val solved = Sudoku.solveWithInit(raw)
    println(Sudoku.printSudoku(solved))
  }
}
