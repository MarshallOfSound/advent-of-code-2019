const input = global.loadInput();

const conversions = [];
for (const line of input.split('\n')) {
  const [inputs, output] = line.split(' => ');
  const inputDetails = inputs
    .split(',')
    .map(s => s.trim())
    .map(s => s.split(' '))
    .map(([n, item]) => ({ quantity: n * 1, material: item }));
  const outputDetails = output
    .split(',')
    .map(s => s.trim())
    .map(s => s.split(' '))
    .map(([n, item]) => ({ quantity: n * 1, material: item }));
  conversions.push({
    in: inputDetails,
    out: outputDetails,
  });
}

let oreRequirement = 0;
const requirements = [{ quantity: 1, material: 'FUEL' }];
const available = {};
while (requirements.length) {
  const req = requirements.pop();
  const conversion = conversions.find(c => c.out.find(out => out.material === req.material));
  const outThing = conversion.out.find(out => out.material === req.material);

  const toTake = Math.min(req.quantity, available[req.material] || 0);
  req.quantity -= toTake;
  available[req.material] = (available[req.material] || 0) - toTake;

  const leftOver = Math.ceil(req.quantity / outThing.quantity) * outThing.quantity - req.quantity;
  available[req.material] += leftOver;

  for (const inp of conversion.in) {
    const requiredNumber = Math.ceil(req.quantity / outThing.quantity) * inp.quantity;
    if (inp.material === 'ORE') {
      oreRequirement += requiredNumber;
    } else {
      requirements.push({
        quantity: requiredNumber,
        material: inp.material,
      });
    }
  }
}
console.log(oreRequirement, available);
