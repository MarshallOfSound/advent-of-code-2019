let grid = global
  .loadInput()
  .split('\n')
  .map(r => r.split(''));

const seen = new Set();
while (true) {
  const str = JSON.stringify(grid);
  if (seen.has(str)) {
    let rating = 0;
    let v = 1;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '#') {
          rating += v;
        }
        v = v * 2;
      }
    }
    console.log(rating);
    break;
  }
  seen.add(str);
  const newGrid = [];
  for (let y = 0; y < grid.length; y++) {
    newGrid.push([...grid[y]]);
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let adj = 0;
      for (const delta of [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
      ]) {
        let nX = x + delta[0];
        let nY = y + delta[1];
        if (nX >= 0 && nX < grid[0].length && nY >= 0 && nY < grid.length) {
          adj += grid[nY][nX] === '#' ? 1 : 0;
        }
      }

      if (grid[y][x] === '#' && adj !== 1) {
        newGrid[y][x] = '.';
      }
      if (grid[y][x] === '.' && (adj === 1 || adj === 2)) {
        newGrid[y][x] = '#';
      }
    }
  }

  grid = newGrid;
}
