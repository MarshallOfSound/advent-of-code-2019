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

function getOreReq(f) {
  let oreRequirement = 0;
  const requirements = [{ quantity: f, material: 'FUEL' }];
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
  return oreRequirement;
}

// Brute force but smart, instead of jumping 1 at a time we group in ever
// decreasing buckets of powers of 10.  In theory we could bucket into something
// like buckets of 10,000 and then binary search but it is easier to just bucket
// down to a search space of 1.
function searchFor(n) {
  let i = 1;
  for (let power = 5; power >= 0; power--) {
    const inc = Math.pow(10, power);
    while (getOreReq(i) < n) {
      i += inc;
    }
    i -= inc;
  }
  return i;
}
console.log(searchFor(1000000000000));
