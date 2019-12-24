let grid = global
  .loadInput()
  .split('\n')
  .map(r => r.split(''));

grid[2][2] = '?';
let levels = { 0: grid };

const empty = () => [
  ['.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.'],
  ['.', '.', '?', '.', '.'],
  ['.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.'],
];
for (let i = -300; i <= 300; i++) {
  if (i === 0) continue;
  levels[i] = empty();
}

for (let minute = 0; minute < 200; minute++) {
  const newLevels = {};
  for (const levelKey in levels) {
    const newGrid = [];
    for (let y = 0; y < levels[levelKey].length; y++) {
      newGrid.push([...levels[levelKey][y]]);
    }
    newLevels[levelKey] = newGrid;
  }

  for (const levelKey in levels) {
    const grid = levels[levelKey];
    const newGrid = newLevels[levelKey];
    const levelN = levelKey * 1;

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (y === 2 && x === 2) continue;

        let adj = 0;
        for (const delta of [
          [0, 1],
          [1, 0],
          [-1, 0],
          [0, -1],
        ]) {
          let nX = x + delta[0];
          let nY = y + delta[1];
          if (nX === 2 && nY === 2) {
            levels[levelN + 1] = levels[levelN + 1] || empty();
            const inner = levels[levelN + 1];
            let coords = [];
            if (x === 1)
              coords = [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4],
              ];
            if (x === 3)
              coords = [
                [4, 0],
                [4, 1],
                [4, 2],
                [4, 3],
                [4, 4],
              ];
            if (y === 1)
              coords = [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
              ];
            if (y === 3)
              coords = [
                [0, 4],
                [1, 4],
                [2, 4],
                [3, 4],
                [4, 4],
              ];
            for (const coord of coords) {
              const iX = coord[0];
              const iY = coord[1];
              adj += inner[iY][iX] === '#' ? 1 : 0;
            }
          } else if (nX >= 0 && nX < 5 && nY >= 0 && nY < 5) {
            adj += grid[nY][nX] === '#' ? 1 : 0;
          } else {
            levels[levelN - 1] = levels[levelN - 1] || empty();
            const outer = levels[levelN - 1];
            let oX = 2;
            let oY = 2;
            if (nX === -1) oX--;
            if (nX === 5) oX++;
            if (nY === -1) oY--;
            if (nY === 5) oY++;
            adj += outer[oY][oX] === '#' ? 1 : 0;
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
  }

  levels = newLevels;
}

let s = 0;
for (const key in levels) {
  const grid = levels[key];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '#') s++;
    }
  }
}
console.log(s);
