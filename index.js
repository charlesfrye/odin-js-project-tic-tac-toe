const gameBoard = (() => {
  let _array = Array.from(Array(3), () => new Array(3));

  function _transpose(arr) {
    return arr[0].map((col, c) => arr.map((row, r) => arr[r][c]));
  }

  function _clear() {
    this._array = _array.map((row) => _array.map((col) => 0));
  }

  function _set() {
    this._array = [
      [1, 0, 0],
      [0, 10, 10],
      [1, 0, 10],
    ];
  }

  function _check_winner() {
    const winners = _get_winners(this._array);
    const winner = _parse_winners(winners);
    return winner;
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
        return "O";
      case 30:
        return "X";
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

  _clear();

  return {
    _transpose,
    _clear,
    _array,
    _check_winner,
    _get_winners,
    _parse_winners,
    _sum,
    _score_cols,
    _score_diags,
    _score_rows,
    _check_cols,
    _check_diags,
    _check_rows,
    _set,
  };
})();
