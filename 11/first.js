const input = global
  .loadInput()
  .split(',')
  .toInts();

const getInput = () => [...input];

function* runProgram(getIn, program) {
  let index = 0;
  let relativeBase = 0;

  let sOp;
  const getEffectiveValue = paramIndex => {
    let val = sOp[sOp.length - paramIndex - 2] || 0;
    val = parseInt(val);
    if (val === 0) {
      return program[program[index + paramIndex]] || 0;
    }
    if (val === 2) {
      return program[program[index + paramIndex] + relativeBase] || 0;
    }
    return program[index + paramIndex] || 0;
  };

  const setEffectiveValue = (paramIndex, v) => {
    let val = sOp[sOp.length - paramIndex - 2] || 0;
    val = parseInt(val);
    if (val === 2) {
      program[program[index + paramIndex] + relativeBase] = v;
    } else {
      program[program[index + paramIndex]] = v;
    }
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
      case 9:
        relativeBase += getEffectiveValue(1);
        index += 2;
        break;
    }
  }
}

const hull = {};
let x = 0;
let y = 0;
let angle = 0;
const generator = runProgram(() => {
  const p = `${x}:${y}`;
  return hull[p] || 0;
}, getInput());
// Get all output
let next;
while ((next = generator.next())) {
  if (!next.done) {
    const p = `${x}:${y}`;
    hull[p] = next.value;
    const turn = generator.next();
    if (turn.value === 0) {
      angle -= 90;
    } else {
      angle += 90;
    }
    while (angle >= 360) {
      angle -= 360;
    }
    while (angle < 0) {
      angle += 360;
    }
    switch (angle) {
      case 0:
        y--;
        break;
      case 90:
        x++;
        break;
      case 180:
        y++;
        break;
      case 270:
        x--;
        break;
    }
  }
  if (next.done) break;
}

console.log(Object.keys(hull).length);
