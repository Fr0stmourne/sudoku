module.exports = function solveSudoku(matrix) {
  let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function isSolved(matrix) {
    return matrix.every(row => !row.includes(0));
  }

  let bestCandidate = {
    y: -1,
    x: -1,
    candidates: numArr
  };
  let wasInserted = true;
  while (wasInserted) {
    wasInserted = false;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!matrix[i][j]) {
          // collect candidates
          let candidates = numArr.filter(el => {
            let [verticalRow, horizontalRow, subgridArr] = [
              [],
              [],
              []
            ];
            for (let k = 0; k < 9; k++) {
              verticalRow.push(matrix[k][j]);
              horizontalRow.push(matrix[i][k]);
            }
            let [subgridRow, subgridCol] = [Math.floor(i / 3), Math.floor(j / 3)];
            for (let k = subgridRow * 3; k < subgridRow * 3 + 3; k++) {
              for (let l = subgridCol * 3; l < subgridCol * 3 + 3; l++) {
                subgridArr.push(matrix[k][l]);
              }
            }
            return !(new Set([...verticalRow, ...horizontalRow, ...subgridArr]).has(el));
          });
          if (!candidates.length) {
            return matrix;
          }
          if (candidates.length === 1) {
            matrix[i][j] = candidates[0];
            if (bestCandidate.y === i && bestCandidate.x === j) {
              bestCandidate.candidates = numArr;
            }
            wasInserted = true;
            continue;
          }
          if (candidates.length < bestCandidate.candidates.length) {
            bestCandidate.candidates = candidates;
            bestCandidate.y = i;
            bestCandidate.x = j;
          }
        }
      }
    }
    if (isSolved(matrix)) return matrix
  }

  if (!isSolved(matrix)) {
    for (let candidate of bestCandidate.candidates) {
      let matrixBeforeGuess = [];
      matrix.forEach(el => matrixBeforeGuess.push(el.slice()));
      matrix[bestCandidate.y][bestCandidate.x] = candidate;
      matrix = solveSudoku(matrix);
      if (isSolved(matrix)) return matrix
      matrix = matrixBeforeGuess;
    }
  }
  return matrix;
}