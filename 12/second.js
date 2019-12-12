const input = global.loadInput();

const moons = [];

for (const line of input.split('\n')) {
  const parts = line.split(',');
  moons.push({
    pos: {
      x: parseInt(parts[0].split('=')[1], 10),
      y: parseInt(parts[1].split('=')[1], 10),
      z: parseInt(parts[2].split('=')[1], 10),
    },
    velocity: {
      x: 0,
      y: 0,
      z: 0,
    },
  });
}

function delta(a, b) {
  if (a === b) return 0;
  if (a < b) return 1;
  return -1;
}

function runTick() {
  for (let i = 0; i < moons.length; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      const first = moons[i];
      const second = moons[j];
      let firstXDelta = delta(first.pos.x, second.pos.x);
      let firstYDelta = delta(first.pos.y, second.pos.y);
      let firstZDelta = delta(first.pos.z, second.pos.z);
      first.velocity.x += firstXDelta;
      first.velocity.y += firstYDelta;
      first.velocity.z += firstZDelta;

      second.velocity.x -= firstXDelta;
      second.velocity.y -= firstYDelta;
      second.velocity.z -= firstZDelta;
    }
  }

  for (const moon of moons) {
    moon.pos.x += moon.velocity.x;
    moon.pos.y += moon.velocity.y;
    moon.pos.z += moon.velocity.z;
  }
}

const vals = [];
for (const c of ['x', 'y', 'z']) {
  const match = new Set();
  let i = 0;
  while (true) {
    runTick();
    const x = moons.map(m => [m.pos[c], m.velocity[c]]);
    const v = JSON.stringify(x);
    if (match.has(v)) {
      vals.push(i);
      break;
    }
    match.add(v);
    i++;
  }
}

function lcm_two_numbers(x, y) {
  return !x || !y ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

function gcd_two_numbers(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

console.log(lcm_two_numbers(lcm_two_numbers(vals[0], vals[1]), vals[2]));
