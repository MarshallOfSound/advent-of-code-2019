const input = global.loadInput();

const [min, max] = input.split('-').toInts();

let s = 0;
for (let i = min; i <= max; i++) {
  const nums = `${i}`.split('').toInts();
  let decreased = false;
  let last;
  let sequence = 1;
  const sequences = [];
  for (let j = 0; j < nums.length; j++) {
    if (j !== nums.length - 1 && nums[j] > nums[j + 1]) {
      decreased = true;
    }
    if (last) {
      if (nums[j] === last) {
        sequence++;
      } else {
        sequences.push(sequence);
        sequence = 1;
      }
    }
    last = nums[j];
  }
  sequences.push(sequence);
  if (!decreased && sequences.includes(2)) {
    s++;
  }
}

console.log(s);
