const input = global
  .loadInput()
  .split(',')
  .toInts();

function runProgram(program) {
  let index = 0;
  while (program[index] !== 99) {
    const op = program[index];

    const first = program[program[index + 1]];
    const second = program[program[index + 2]];
    const result = op === 1 ? first + second : first * second;
    program[program[index + 3]] = result;
    index += 4;
  }
  return program;
}

console.log(runProgram(input)[0]);
