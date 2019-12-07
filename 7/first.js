const input = global
  .loadInput()
  .split(',')
  .toInts();

const getInput = () => [...input];

function runProgram(mInputs, program) {
  let index = 0;
  const outputs = [];

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
        setEffectiveValue(1, mInputs.shift());
        index += 2;
        break;
      case 4:
        outputs.push(getEffectiveValue(1));
        index += 2;
        break;
      case 5:
        if (getEffectiveValue(1)) {
          index = getEffectiveValue(2);
        } else {
          index += 3;
        }
        break;
      case 6:
        if (!getEffectiveValue(1)) {
          index = getEffectiveValue(2);
        } else {
          index += 3;
        }
        break;
      case 7:
        if (getEffectiveValue(1) < getEffectiveValue(2)) {
          program[program[index + 3]] = 1;
        } else {
          program[program[index + 3]] = 0;
        }
        index += 4;
        break;
      case 8:
        if (getEffectiveValue(1) === getEffectiveValue(2)) {
          program[program[index + 3]] = 1;
        } else {
          program[program[index + 3]] = 0;
        }
        index += 4;
        break;
    }
  }
  return outputs;
}

const possibleNumbers = [0, 1, 2, 3, 4];
let max = 0;
function bruteForce(last = 0, used = new Set()) {
  if (used.size === possibleNumbers.length) max = Math.max(max, last);
  for (const n of possibleNumbers) {
    if (used.has(n)) continue;
    used.add(n);
    bruteForce(runProgram([n, last], getInput())[0], used);
    used.delete(n);
  }
}

bruteForce();
console.log(max);
