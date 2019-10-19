module.exports = function solveSudoku(matrix) {
  let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function isFilledSudoku(matrix) {
    return matrix.every(row => !row.includes(0));
  }

  // outer: while (!isFilledSudoku(matrix)) {
  let bestCandidate = {
    y: -1,
    x: -1,
    candidates: numArr
  };
  let flag = true;
  while (flag) {
    flag = false;
    mainCycle: for (let i = 0; i < 9; i++) {
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
            flag = true;
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
    if (isFilledSudoku(matrix)) return matrix
  }

  if (!isFilledSudoku(matrix)) {
    for (let candidate of bestCandidate.candidates) {
      let currentMatrix = [];
      matrix.forEach(el => currentMatrix.push(el.slice()));
      matrix[bestCandidate.y][bestCandidate.x] = candidate;
      matrix = solveSudoku(matrix);
      if (isFilledSudoku(matrix)) return matrix
      matrix = currentMatrix;
    }
  }
  return matrix;
}