const { runProgram } = require('../.intcode/runner');

const input = global
  .loadInput()
  .split(',')
  .toInts();

const getInput = () => [...input];

const grid = {};
let x = 1000;
let y = 1000;
const directionsToTry = [[0, 1, 2, 3]];

const set = (x, y, v) => {
  grid[y] = grid[y] || {};
  // if (grid[y][x] && grid[y][x] !== v) {
  //   print();
  //   console.log(x, y, grid[x][y], v);
  //   throw grid[y][x];
  // }
  grid[y][x] = v;
};

const get = (x, y) => {
  grid[y] = grid[y] || {};
  return grid[y][x];
};

const move = (dir = null) => {
  if (dir === null) dir = directionsToTry[0][0];
  let nX = x;
  let nY = y;
  switch (dir) {
    case 0:
      nY -= 1;
      break;
    case 1:
      nX += 1;
      break;
    case 2:
      nY += 1;
      break;
    case 3:
      nX -= 1;
      break;
  }
  return [nX, nY];
};

const DEAD_END = 'X';
const WALL = '#';
const EMPTY = '.';
let final;

let next;
let lastDir;
const gen = runProgram(() => {
  lastDir = directionsToTry[0][0];
  return [1, 4, 2, 3][directionsToTry[0][0]];
}, getInput());
while ((next = gen.next())) {
  if (next.done || final) break;

  switch (next.value) {
    case 0: {
      const [nextX, nextY] = move();
      set(nextX, nextY, WALL);
      if (directionsToTry[0].length === 1) {
        set(x, y, DEAD_END);
        directionsToTry.shift();
      } else {
        directionsToTry[0].shift();
      }
      break;
    }
    case 1: {
      const [nX, nY] = move();
      x = nX;
      y = nY;
      set(x, y, EMPTY);
      if (directionsToTry.length > 1 && directionsToTry[0].length === 1) {
        directionsToTry.shift();
      } else {
        directionsToTry[0].shift();
        const order = [0, 1, 2, 3];
        const opposite = [2, 3, 0, 1][lastDir];
        directionsToTry.unshift([
          ...order.filter(o => o !== opposite).filter(dir => get(...move(dir)) !== WALL),
          opposite,
        ]);
      }
      break;
    }
    case 2: {
      const [nX, nY] = move();
      x = nX;
      y = nY;
      final = [x, y];
      break;
    }
  }
}

function print() {
  const X = x;
  const Y = y;
  console.log(`\n\nBoard (${X}, ${Y})`);
  const minY = Math.min(...Object.keys(grid).toInts());
  const minX = Math.min(...Object.keys(grid).map(y => Math.min(...Object.keys(grid[y]).toInts())));
  const maxY = Math.max(...Object.keys(grid).toInts());
  const maxX = Math.max(...Object.keys(grid).map(y => Math.max(...Object.keys(grid[y]).toInts())));
  for (let y = minY; y <= maxY; y++) {
    let s = '';
    grid[y] = grid[y] || {};
    for (let x = minX; x <= maxX; x++) {
      if (x === X && y === Y) {
        s += 'D';
      } else {
        s += grid[y][x] || ' ';
      }
    }
    console.log(s);
  }
}

function sleep(ms) {
  const d = Date.now();
  while (Date.now() < d + ms) {}
}

console.log(directionsToTry.length);
