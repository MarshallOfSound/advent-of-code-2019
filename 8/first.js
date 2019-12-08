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

let min = Number.MAX_VALUE;
let minLayer;
for (const layer of layers) {
  let zeros = layer.filter(n => n === 0).length;
  if (zeros < min) {
    min = zeros;
    minLayer = layer;
  }
}

console.log(minLayer.filter(n => n === 1).length * minLayer.filter(n => n === 2).length);
