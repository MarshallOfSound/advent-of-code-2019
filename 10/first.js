const input = global.loadInput();

const ASTEROID = '#';
const EMPTY = '.';

const grid = [];
for (const row of input.split('\n')) {
  grid.push(row.split(''));
}

let best = [0, 0];
let most = 0;

for (let x = 0; x < grid[0].length; x++) {
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][x] !== ASTEROID) continue;
    const posGradients = new Set();
    const negGradients = new Set();

    for (let tX = 0; tX < grid[0].length; tX++) {
      for (let tY = 0; tY < grid.length; tY++) {
        if (grid[tY][tX] !== ASTEROID) continue;
        if (tY === y && tX === x) continue;

        const g = (tX - x) / (tY - y);
        if (tX > x || (tX === x && tY > y)) {
          posGradients.add(g);
        } else {
          negGradients.add(g);
        }
      }
    }

    const n = posGradients.size + negGradients.size;
    if (n > most) {
      most = n;
      best = [x, y];
    }
  }
}

console.log(most, best);
