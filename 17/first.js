const { runProgram } = require('../.intcode/runner');

const input = global
  .loadInput()
  .split(',')
  .toInts();

const getInput = () => [...input];

const grid = [];

const gen = runProgram(() => {
  throw 'a';
}, getInput());
let next;
let current = [];
while ((next = gen.next())) {
  if (next.done) break;
  if (next.value === 10) {
    if (current.length) grid.push(current);
    current = [];
  } else {
    current.push(String.fromCharCode(next.value));
  }
}

let sum = 0;
for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    if (
      grid[y][x] === '#' &&
      grid[y - 1][x] === '#' &&
      grid[y + 1][x] === '#' &&
      grid[y][x - 1] === '#' &&
      grid[y][x + 1] === '#'
    ) {
      sum += x * y;
    }
  }
}

console.log(sum);
