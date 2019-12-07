const input = global
  .loadInput()
  .lines()
  .map(a => a.split(')'))

const orbits = {};

for (const o of input) {
  orbits[o[0]] = orbits[o[0]] || [];
  orbits[o[0]].push(o[1]);

  orbits[o[1]] = orbits[o[1]] || [];
  orbits[o[1]].push(o[0]);
}

let found;

function bfs(thing, visited = new Set()) {
  if (thing === 'SAN') found = visited.size;
  if (found) return;
  for (const t of (orbits[thing] || [])) {
    if (visited.has(t)) continue;
    visited.add(t);
    bfs(t, visited);
    visited.delete(t);
  }
}
bfs('YOU')

console.log(found - 2)