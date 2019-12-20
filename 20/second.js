const maze = global.loadInput().split('\n').map(r => r.split(''));

const portals = {};
for (let y = 0; y < maze.length; y++) {
  for (let x = 0; x < maze[y].length; x++) {
    if (/[A-Z]/.test(maze[y][x])) {
      let dotCoords;
      let pair;
      for (const delta of [
          [0, 1],
          [1, 0],
          [-1, 0],
          [0, -1]
        ]) {
        const nX = x + delta[0];
        const nY = y + delta[1];
        if (!maze[nY]) continue;
        if (/[A-Z]/.test(maze[nY][nX])) {
          pair = maze[nY][nX];
        }
        if (maze[nY][nX] === '.') {
          dotCoords = [nX, nY];
        }
      }
      if (dotCoords && pair) {
        const key = (maze[y][x] + pair).split('').sort().join('');
        portals[key] = portals[key] || [];
        portals[key].push(dotCoords);
      }
    }
  }
}

function bfs(from, to, visited = new Set([`${from[0]}:${from[1]}`])) {
  if (from[0] === to[0] && from[1] === to[1]) return visited.size;

  for (const delta of [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1]
    ]) {
    const nX = from[0] + delta[0];
    const nY = from[1] + delta[1];
    if (maze[nY][nX] === '.') {
      if (visited.has(`${nX}:${nY}`)) continue;

      visited.add(`${nX}:${nY}`);
      const result = bfs([nX, nY], to, visited);
      if (result) return result;
      visited.delete(`${nX}:${nY}`);
    }
  }
}

const graph = {};
const pretty = {};

for (const portal in portals) {
  const start = portals[portal];
  if (start.length === 2) {
    const k1 = `${start[0][0]}:${start[0][1]}`;
    const k2 = `${start[1][0]}:${start[1][1]}`;
    pretty[k1] = portal;
    pretty[k2] = portal;

    graph[k1] = graph[k1] || {};
    graph[k2] = graph[k2] || {};
    graph[k1][k2] = 0;
    graph[k2][k1] = 0;
  }
  for (const ePortal in portals) {
    const end = portals[ePortal];
    for (const s of start) {
      for (const e of end) {
        if (portal === ePortal) continue;
        const sKey = `${s[0]}:${s[1]}`;
        const eKey = `${e[0]}:${e[1]}`;
        graph[sKey] = graph[sKey] || {};
        graph[sKey][eKey] = bfs(s, e);
      }
    }
  }
}

let min = Number.MAX_VALUE;

function gBfs(from, to, current = 0, level = 0, visited = new Set([from])) {
  if (level > 30) return;
  if (level < 0) return;
  if (from === to) {
    if (level === 0) {
      min = Math.min(current, min);
    }
    return;
  }

  for (const option of Object.keys(graph[from] || {})) {
    if (graph[from][option] === undefined || graph[from][option] === 0) continue;
    if (option === 'AA') continue;

    if (option === to) {
      gBfs(option, to, current + graph[from][option], level + 0, visited);
      continue;
    }

    const jump = Object.keys(graph[option]).find(k => graph[option][k] === 0 && k !== option);
    if (!jump) continue;
    if (visited.has(`${jump}${level}`)) continue;

    visited.add(`${jump}${level}`);
    let levelJump = 1;
    if ((option.startsWith('2:') || option.startsWith(`${maze[0].length - 3}:`) || option.endsWith(':2') || option.endsWith(`:${maze.length - 3}`))) {
      levelJump = -1;
    }
    gBfs(jump, to, current + graph[from][option], level + levelJump, visited);
    visited.delete(`${jump}${level}`);
  }
}

const s = portals['AA'][0];
const e = portals['ZZ'][0];

gBfs(`${s[0]}:${s[1]}`, `${e[0]}:${e[1]}`)

console.log(min - 1);