/**
 * This was written after the competition to simplify the implementation into a generator function
 */

const input = global
  .loadInput()
  .split(',')
  .toInts();

const getInput = () => [...input];

function* runProgram(getIn, program) {
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
        yield getEffectiveValue(1);
        index += 2;
        break;
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
          setEffectiveValue(3, 1);
        } else {
          setEffectiveValue(3, 0);
        }
        index += 4;
        break;
      case 8:
        if (getEffectiveValue(1) === getEffectiveValue(2)) {
          setEffectiveValue(3, 1);
        } else {
          setEffectiveValue(3, 0);
        }
        index += 4;
        break;
    }
  }
}

const possibleNumbers = [5, 6, 7, 8, 9];

let max = 0;
function bruteForce(used = []) {
  if (used.length === possibleNumbers.length) {
    const generators = {};
    const inputs = {};
    for (const i of Object.keys(possibleNumbers)) {
      inputs[i] = [used[i]];
    }
    inputs[0].push(0);

    let complete = false;
    while (!complete) {
      for (const [index] of used.entries()) {
        if (!generators[index]) {
          generators[index] = runProgram(() => {
            if (!inputs[index].length) throw new Error('No input for amp');
            return inputs[index].shift();
          }, getInput());
        }
        const out = generators[index].next();
        if (out.done) {
          complete = true;
          break;
        }
        if (index === used.length - 1) max = Math.max(max, out.value);
        // Loop around to set first when in last amp
        const nextIndex = index + 1 >= used.length ? 0 : index + 1;
        inputs[nextIndex].push(out.value);
      }
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
