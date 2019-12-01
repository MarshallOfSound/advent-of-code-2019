const input = global.loadInput().lines();

function fuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function fuelWithFuel(mass) {
  let isolated = fuel(mass);
  if (isolated <= 0) return 0;
  return fuelWithFuel(isolated) + isolated;
}

console.log(input.reduce((accum, mass) => accum + fuelWithFuel(mass), 0));
