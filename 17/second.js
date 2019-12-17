const { runProgram } = require('../.intcode/runner');

const input = global
  .loadInput()
  .split(',')
  .toInts();

input[0] = 2;

const getInput = () => [...input];

const grid = [];

let x = -1;
let y = -1;
const directions = [];

const main = 'ABABACBCAC';
const A = ['L', ',', 6, ',', 'R', ',', 1, 2, ',', 'L', ',', 6].map(a => `${a}`);
const B = ['R', ',', 1, 2, ',', 'L', ',', 1, 0, ',', 'L', ',', 4, ',', 'L', ',', 6].map(
  a => `${a}`,
);
const C = ['L', ',', 1, 0, ',', 'L', ',', 1, 0, ',', 'L', ',', 4, ',', 'L', ',', 6].map(
  a => `${a}`,
);

const inChain = [
  ...main
    .split('')
    .join(',')
    .split(''),
  10,
  ...A,
  10,
  ...B,
  10,
  ...C,
  10,
  'n',
  10,
];

const gen = runProgram(() => {
  const item = inChain.shift();
  if (typeof item === 'string') return item.charCodeAt(0);
  return item;
  // Used this code to trace the path, then figured out A, B and C by hand.
  // if (!directions.length) {
  //   let X = x;
  //   let Y = y;
  //   let direction = 0;
  //   let movement = 0;
  //   while (true) {
  //     let dC = directions.length;
  //     let nX = X + (direction === 1 ? 1 : 0) + (direction === 3 ? -1 : 0);
  //     let nY = Y + (direction === 0 ? 1 : 0) + (direction === 2 ? -1 : 0);
  //     if (grid[nY] && (grid[nY][nX] === '#' || grid[nY][nX] === 'X')) {
  //       grid[nY][nX] = 'X';
  //       movement++;
  //     } else {
  //       if (movement) directions.push(movement);
  //       movement = 0;
  //       const possibleDirs = [0, 1, 2, 3].filter(
  //         d => direction !== d && Math.abs(direction - d) !== 2,
  //       );
  //       for (const possibleDir of possibleDirs) {
  //         const tX = X + (possibleDir === 1 ? 1 : 0) + (possibleDir === 3 ? -1 : 0);
  //         const tY = Y + (possibleDir === 0 ? 1 : 0) + (possibleDir === 2 ? -1 : 0);
  //         console.log(possibleDir, nX, nY);
  //         if (grid[tY] && grid[tY][tX] === '#') {
  //           if (possibleDir === 0 && direction === 1) directions.push('R');
  //           else if (possibleDir === 1 && direction === 2) directions.push('R');
  //           else if (possibleDir === 2 && direction === 3) directions.push('R');
  //           else if (possibleDir === 3 && direction === 2) directions.push('R');
  //           else if (possibleDir === 4 && direction === 0) directions.push('R');
  //           else directions.push('L');
  //           direction = possibleDir;
  //         }
  //       }
  //       nX = X;
  //       nY = Y;
  //     }
  //     if (nX === X && nY === Y && dC === directions.length) {
  //       console.log(directions.join(''));
  //       console.log(grid.map(r => r.join('')).join('\n'));
  //       break;
  //     }
  //     X = nX;
  //     Y = nY;
  //   }
  // }
  throw 'a';
}, getInput());
let next;
let current = [];
while ((next = gen.next())) {
  console.log(next.value);
  if (next.done) break;
  if (next.value === 10) {
    if (current.length) grid.push(current);
    current = [];
  } else {
    if (String.fromCharCode(next.value) === '^' && x === -1 && y === -1) {
      x = current.length;
      y = grid.length;
    }
    current.push(String.fromCharCode(next.value));
  }
}
