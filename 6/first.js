const input = global
  .loadInput()
  .lines()
  .map(a => a.split(')'))

const orbits = {};

for (const o of input) {
  orbits[o[0]] = orbits[o[0]] || [];
  orbits[o[0]].push(o[1]);
}

let n = 0;

function count(thing, current = 0) {
  n += current;
  for (const t of (orbits[thing] || [])) {
    count(t, current + 1);
  }
}
count('COM')

console.log(n)