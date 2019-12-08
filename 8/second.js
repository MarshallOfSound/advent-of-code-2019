const input = global.loadInput();

const W = 25;
const H = 6;

const layers = [];
let current = [];
for (const val of input.split('')) {
  current.push(val * 1);

  if (current.length === W * H) {
    layers.push(current);
    current = [];
  }
}

const finalLayer = {};
for (const layer of layers) {
  for (let i = 0; i < layer.length; i++) {
    if (finalLayer[i] === undefined) {
      if (layer[i] !== 2) finalLayer[i] = layer[i];
    }
  }
}

for (let r = 0; r < H; r++) {
  let line = '';
  for (let i = 0; i < W; i++) {
    line += `${finalLayer[r * W + i] === 0 ? ' ' : 'X'}`;
  }
  console.log(line);
}
