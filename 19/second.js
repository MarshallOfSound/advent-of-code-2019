const { runProgram } = require('../.intcode/runner');

const input = global
  .loadInput()
  .split(',')
  .toInts();

const getInput = () => [...input];

const tractor = new Set();
const grid = [];

for (let y = 0; y < 1300; y++) {
  let foundOne = false;
  for (let x = 0; x < 1300; x++) {
    grid[y] = grid[y] || [];
    const inp = [y, x];
    const gen = runProgram(() => inp.pop(), getInput());
    const v = gen.next().value;
    if (v) foundOne = true;
    if (!v && foundOne) break;

    grid[y][x] = v;
    if (v) {
      tractor.add(`${x}:${y}`);
      if (
        tractor.has(`${x - 99}:${y - 99}`) &&
        tractor.has(`${x - 99}:${y}`) &&
        tractor.has(`${x}:${y - 99}`)
      ) {
        console.log(x - 99, y - 99);
        return;
      }
    }
  }
}
