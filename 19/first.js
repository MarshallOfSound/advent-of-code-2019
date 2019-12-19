const { runProgram } = require('../.intcode/runner');

const input = global
  .loadInput()
  .split(',')
  .toInts();

const getInput = () => [...input];

let sum = 0;
for (let x = 0; x < 50; x++) {
  for (let y = 0; y < 50; y++) {
    const inp = [y, x];
    const gen = runProgram(() => inp.pop(), getInput());
    sum += gen.next().value;
  }
}

console.log(sum);
