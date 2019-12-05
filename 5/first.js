const input = global
  .loadInput()
  .split(',')
  .toInts();

function runProgram(mInput, program) {
  let index = 0;

  let sOp;
  const getEffectiveValue = paramIndex => {
    let val = sOp[sOp.length - paramIndex - 2] || 0;
    val = parseInt(val);
    if (val === 0) {
      return program[program[index + paramIndex]];
    }
    return program[index + paramIndex];
  };

  const setEffectiveValue = (paramIndex, v) => {
    let val = sOp[sOp.length - paramIndex - 2] || 0;
    val = parseInt(val);
    if (val === 0) {
      program[program[index + paramIndex]] = v;
    }
    program[index + paramIndex] = v;
  };

  while (program[index] !== 99) {
    const op = program[index];
    sOp = `${op}`;

    switch (parseInt(sOp.substr(sOp.length - 2))) {
      case 1:
        setEffectiveValue(3, getEffectiveValue(1) + getEffectiveValue(2));
        index += 4;
        break;
      case 2:
        setEffectiveValue(3, getEffectiveValue(1) * getEffectiveValue(2));
        index += 4;
        break;
      case 3:
        setEffectiveValue(1, mInput);
        index += 2;
        break;
      case 4:
        console.warn('Output:', getEffectiveValue(1));
        index += 2;
        break;
    }
  }
  return program;
}

runProgram(1, input);
