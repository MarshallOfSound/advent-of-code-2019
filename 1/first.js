const input = global.loadInput().lines();

function fuel(mass) {
  return Math.floor(mass / 3) - 2;
}

console.log(input.reduce((accum, mass) => accum + fuel(mass), 0));
