const input = global
  .loadInput()
  .split(',')
  .toInts();

input[0] = 2;

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

let score = 0;
const grid = {};

function findAll(type) {
  const all = [];
  for (const x of Object.keys(grid)) {
    for (const y of Object.keys(grid[x])) {
      if (grid[x][y] === type) {
        all.push([x * 1, y * 1]);
      }
    }
  }
  return all;
}

function paintBoard() {
  const rows = [];
  for (const x of Object.keys(grid)) {
    for (const y of Object.keys(grid[x])) {
      if (!rows[y * 1]) rows[y * 1] = [];
      rows[y * 1][x * 1] = grid[x][y];
    }
  }
  console.log(
    rows
      .map(row =>
        row
          .map(i => {
            if (i === 0) return ' ';
            if (i === 1) return '|';
            if (i === 2) return 'X';
            if (i === 3) return '_';
            if (i === 4) return '.';
            return '?';
          })
          .join(''),
      )
      .join('\n'),
  );
  console.log('Score:', score);
}

function dir(a, b) {
  if (a < b) return -1;
  if (a === b) return 0;
  return 1;
}

let next;
const gen = runProgram(() => {
  const ball = findAll(4)[0];
  const paddle = findAll(3)[0];
  paintBoard();
  return dir(ball[0], paddle[0]);
}, getInput());
while ((next = gen.next())) {
  if (next.done) break;
  let x = next.value;
  let y = gen.next().value;
  let type = gen.next().value;
  if (x === -1 && y === 0) {
    score = type;
  } else {
    if (!grid[x]) grid[x] = {};
    grid[x][y] = type;
  }
}

paintBoard();
