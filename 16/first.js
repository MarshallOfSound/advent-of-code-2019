let input = global
  .loadInput()
  .split('')
  .toInts();

const pattern = '0, 1, 0, -1'
  .split(',')
  .map(s => s.trim())
  .toInts();

for (let phase = 0; phase < 100; phase++) {
  const newInput = [];
  for (let i = 0; i < input.length; i++) {
    const newValues = [];
    const _pattern = [...pattern];
    const mPattern = [];
    for (const item of _pattern) {
      for (let k = 0; k < i + 1; k++) {
        mPattern.push(item);
      }
    }
    for (let j = 1; j <= input.length; j++) {
      const val = mPattern[j % mPattern.length] * input[j - 1];
      newValues.push(val);
    }
    newInput.push(Math.abs(newValues.reduce((accum, a) => accum + a, 0)) % 10);
  }
  // console.log(newInput);
  input = newInput;
}

console.log(input.slice(0, 8).join(''));
