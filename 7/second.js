const input = global
  .loadInput()
  .split(',')
  .toInts();

const getInput = () => [...input];

function runProgram(getIn, program, initialIndex = 0) {
  let index = initialIndex;

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
    program[program[index + paramIndex]] = v;
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
      case 3: {
        setEffectiveValue(1, getIn());
        index += 2;
        break;
      }
      case 4: {
        const out = getEffectiveValue(1);
        index += 2;
        return {
          out,
          index,
          complete: false,
        };
      }
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
  return {
    complete: true,
  };
}

const possibleNumbers = [5, 6, 7, 8, 9];

let max = 0;
function bruteForce(used = []) {
  if (used.length === possibleNumbers.length) {
    const outs = {
      [0]: [0],
    };
    const resumes = {};
    const sentPhase = {};
    let complete = false;
    while (!complete) {
      // Run each amp
      for (const [index, phase] of used.entries()) {
        resumes[index] = resumes[index] || {};
        resumes[index].copy = resumes[index].copy || getInput();
        resumes[index].index = resumes[index].index || 0;
        const nextOut = runProgram(
          () => {
            if (!sentPhase[index]) {
              sentPhase[index] = true;
              return phase;
            }
            return outs[index].pop();
          },
          resumes[index].copy,
          resumes[index].index,
        );
        resumes[index].index = nextOut.index;
        max = Math.max(max, nextOut.out);
        // Loop around to set first when in last amp
        const nextIndex = index + 1 >= used.length ? 0 : index + 1;
        outs[nextIndex] = outs[nextIndex] || [];
        outs[nextIndex].push(nextOut.out);
      }

      // At the end, try to finish the program, if it asks for an input
      // we are not done.  Damm this would have been easier in python :/
      try {
        const out = runProgram(
          () => {
            throw 'bad';
          },
          [...resumes[used.length - 1].copy],
          resumes[used.length - 1].index,
        );
        complete = out.complete;
      } catch {}
    }
  }

  for (const n of possibleNumbers) {
    if (used.includes(n)) continue;
    used.push(n);
    bruteForce(used);
    used.pop();
  }
}

bruteForce();
console.log(max);
