const input = global.loadInput();

const [firstWire, secondWire] = input.lines().map(l => l.split(','));

let min = Number.MAX_VALUE;

function run(wire, checkAgainst = null) {
  const visited = new Set();
  let x = 0;
  let y = 0;

  for (const movement of wire) {
    let endX = x;
    let endY = y;
    let inc = 1;
    const amount = parseInt(movement.substr(1));
    if (movement[0] === 'R') {
      endX += amount;
    } else if (movement[0] === 'L') {
      endX -= amount;
      inc = -1;
    } else if (movement[0] === 'U') {
      endY -= amount;
      inc = -1;
    } else if (movement[0] === 'D') {
      endY += amount;
    } else {
      throw 'a';
    }
    for (let nX = x; inc === 1 ? nX <= endX : nX >= endX; nX += inc) {
      for (let nY = y; inc === 1 ? nY <= endY : nY >= endY; nY += inc) {
        if (!(nX === 0 && nY === 0)) {
          const point = `${nX}:${nY}`;
          if (checkAgainst && checkAgainst.has(point)) {
            min = Math.min(min, Math.abs(nX) + Math.abs(nY));
          }
          visited.add(point);
        }
      }
    }
    x = endX;
    y = endY;
  }

  return [visited];
}

const [path] = run(firstWire);
const [path2] = run(secondWire, path);
console.log(min);
