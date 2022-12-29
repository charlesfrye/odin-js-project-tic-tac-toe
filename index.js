const gameBoard = (() => {
  let _array = Array.from(Array(3), () => new Array(3));

  function check_winner() {
    const winners = _get_winners(this._array);
    const winner = _parse_winners(winners);
    return winner;
  }

  function clear() {
    this._array = _array.map((row) => _array.map((col) => 0));
  }

  function is_legal(row, col) {
    return this._array[row][col] == 0;
  }

  function update(row, col, value) {
    this._array[row][col] = value;
  }

  function _get_winners(arr) {
    const rowWinner = _check_rows(arr);
    const colWinner = _check_cols(arr);
    const diagWinner = _check_diags(arr);

    const winners = [rowWinner, colWinner, diagWinner].flat();
    return winners;
  }

  function _parse_winners(winners) {
    if (winners.includes("O")) {
      return "O";
    } else if (winners.includes("X")) {
      return "X";
    } else return null;
  }

  function _check_rows(arr) {
    const sums = _score_rows(arr);
    return sums.map(_sum_to_winner);
  }

  function _check_cols(arr) {
    const sums = _score_cols(arr);
    return sums.map(_sum_to_winner);
  }

  function _check_diags(arr) {
    const sums = _score_diags(arr);
    return sums.map(_sum_to_winner);
  }

  function _score_rows(arr) {
    return arr.map((row) => _sum(row));
  }

  function _score_cols(arr) {
    return _score_rows(_transpose(arr));
  }

  function _score_diags(arr) {
    return [_sum_diag(arr), _sum_diag(_transpose(arr))];
  }

  function _sum_to_winner(value) {
    switch (value) {
      case 3:
        return "X";
      case 30:
        return "O";
      default:
        return null;
    }
  }

  function _sum(arr) {
    return arr.reduce((acc, elem) => acc + elem, 0);
  }

  function _sum_diag(arr) {
    indices = [...Array(arr.length).keys()];
    const sum = indices.reduce((acc, ii) => acc + arr[ii][ii], 0);
    return sum;
  }

  function _transpose(arr) {
    return arr[0].map((col, c) => arr.map((row, r) => arr[r][c]));
  }

  return {
    check_winner,
    clear,
    is_legal,
    update,
  };
})();

gameBoard.clear();

const interface = (() => {
  let player = 1;

  function flip(event) {
    const square = event.target.id;
    const { row, col } = _indices_from(square);
    if (_is_legal(row, col)) {
      _update_board(row, col, player);
      _update_display(square, player);
      _next();
    }
  }

  function _is_legal(row, col) {
    return gameBoard.is_legal(row, col);
  }

  function _update_board(row, col, player) {
    gameBoard.update(row, col, player);
  }
  function _update_display(square_id, player) {
    const square_div = document.getElementById(square_id);
    const new_class = player == 1 ? "X" : "O";
    square_div.classList.add(new_class);
  }

  function _indices_from(square_id) {
    const row_str = square_id[0];
    const col_str = square_id[1];
    return { row: parseInt(row_str), col: parseInt(col_str) };
  }

  function _next() {
    player = (player + 9) % 18;
  }
  return { flip };
})();

const boxes = [...document.querySelectorAll(".box")];

boxes.map((box) => box.addEventListener("click", interface.flip));
