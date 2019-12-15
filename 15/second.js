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
const OXYGEN = 'O';
let final;

let next;
let lastDir;
const gen = runProgram(() => {
  lastDir = directionsToTry[0][0];
  return [1, 4, 2, 3][directionsToTry[0][0]];
}, getInput());
while ((next = gen.next())) {
  if (next.done) break;

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

let rim = [final];
let minutes = 0;
while (rim.length) {
  minutes++;
  const _rim = [...rim];
  rim = [];
  for (const node of _rim) {
    for (const delta of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const newNode = [node[0] + delta[0], node[1] + delta[1]];
      if (grid[newNode[1]][newNode[0]] === EMPTY || grid[newNode[1]][newNode[0]] === DEAD_END) {
        set(...newNode, OXYGEN);
        rim.push(newNode);
      }
    }
  }
}

console.log(minutes - 1);
