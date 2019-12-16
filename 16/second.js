const oInput = global
  .loadInput()
  .split('')
  .toInts();

const address = oInput.slice(0, 7).join('') * 1;

let input = [];
for (let i = 0; i < 10000; i++) {
  input.push(...oInput);
}

const input_length = input.length;

for (let i = 0; i < 100; i++) {
  let sum = 0;
  for (let j = address; j < input.length; j++) {
    sum += input[j];
  }
  for (let j = address; j < input.length; j++) {
    const t = sum;
    sum -= input[j];
    input[j] = Math.abs(t) % 10;
  }
}

console.log(input.slice(address, address + 8).join(''));
