const input = global.loadInput();

const [min, max] = input.split('-').toInts();

let s = 0;
for (let i = min; i <= max; i++) {
  const nums = `${i}`.split('').toInts();
  let hasDouble = false;
  let decreased = false;
  for (let j = 0; j < nums.length - 1; j++) {
    if (nums[j] > nums[j + 1]) {
      decreased = true;
    }
    if (nums[j] === nums[j + 1]) {
      hasDouble = true;
    }
  }
  if (hasDouble && !decreased) {
    s++;
  }
}

console.log(s);
