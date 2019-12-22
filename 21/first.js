const { runProgram } = require('../.intcode/runner');

const input = global
  .loadInput()
  .split(',')
  .toInts();

const getInput = () => [...input];

const instructions = ['NOT A J', 'NOT C T', 'AND D T', 'OR T J', 'WALK'];

const inp = instructions
  .join('\n')
  .split('')
  .concat(['\n']);

const gen = runProgram(() => inp.shift().charCodeAt(0), getInput());
let next;
while ((next = gen.next())) {
  if (next.done) break;
  if (next.value > 200) console.log(next.value);
  process.stdout.write(String.fromCharCode(next.value));
}
