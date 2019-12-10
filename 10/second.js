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
        if (tX > x) {
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

const x = best[0];
const y = best[1];
const posGradients = {};
const negGradients = {};

for (let tX = 0; tX < grid[0].length; tX++) {
  for (let tY = 0; tY < grid.length; tY++) {
    if (grid[tY][tX] !== ASTEROID) continue;
    if (tY === y && tX === x) continue;

    const g = (tX - x) / (tY - y);
    if (tX > x || (tX === x && tY < y)) {
      posGradients[g] = posGradients[g] || [];
      posGradients[g].push([tX, tY]);
    } else {
      negGradients[g] = negGradients[g] || [];
      negGradients[g].push([tX, tY]);
    }
  }
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

for (const key of Object.keys(posGradients)) {
  posGradients[key].sort((a, b) => distance([x, y], a) - distance([x, y], b));
}
for (const key of Object.keys(negGradients)) {
  negGradients[key].sort((a, b) => distance([x, y], a) - distance([x, y], b));
}

function orderKeysByGIncZero(keys) {
  const k = [...keys];
  const pos = k.filter(a => a >= 0).sort((a, b) => a - b);
  const neg = k.filter(a => a < 0).sort((a, b) => a - b);
  return [...pos, ...neg];
}

function orderKeysByGExZero(keys) {
  const k = [...keys];
  const pos = k.filter(a => a > 0).sort((a, b) => a - b);
  const neg = k.filter(a => a <= 0).sort((a, b) => a - b);
  return [...pos, ...neg];
}

let removed = 0;
while (removed < 200) {
  for (const g of orderKeysByGIncZero(Object.keys(posGradients).map(a => parseFloat(a)))) {
    if (posGradients[g] && posGradients[g].length) {
      removed++;
      if (removed === 200) console.log(posGradients[g][0]);
      posGradients[g].shift();
    }
  }

  for (const g of orderKeysByGExZero(Object.keys(negGradients).map(a => parseFloat(a))).reverse()) {
    if (negGradients[g] && negGradients[g].length) {
      removed++;
      if (removed === 200) console.log(negGradients[g][0]);
      negGradients[g].shift();
    }
  }
}
