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

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    const p = runProgram([input[0], i, j, ...input.slice(3)]);
    if (p[0] === 19690720) console.log(i * 100 + j);
  }
}
