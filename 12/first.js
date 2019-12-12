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

for (let i = 0; i < 1000; i++) runTick();

let energy = 0;
for (const moon of moons) {
  energy +=
    (Math.abs(moon.pos.x) + Math.abs(moon.pos.y) + Math.abs(moon.pos.z)) *
    (Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z));
}
console.log(energy);
