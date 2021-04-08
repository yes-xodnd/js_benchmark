const fns = [
  sumForLoop1,
  sumForLoop2,
  sumWhile,
  sumForOf,
  sumForIn,
  sumForEach,
  sumReduce,
];

const test = pipe(
  batchTest,
  sortByTime,
  addMultiplier
);

onmessage = ({ data }) => {
  const { L, N } = data;
  const result = test({ fns, L, N });
  postMessage({ result, L, N });
};

// test
function batchTest({ fns, L, N }) {
  return fns.map(fn => getTestResult(fn, L, N));
}

function sortByTime(arr) {
  return arr.sort((a, b) => a.time - b.time);
}

function addMultiplier(arr) {
  const t = arr[0].time;
  return arr.map(item => (
    { 
      ...item,
      M: (item.time/t).toFixed(2)
    }
  )); 
}

function getTestResult(fn, L, N) {
  const name = fn.name;
  const time = measurePerfTimeMean(fn, L, N).toFixed(4);
  return { name, time }
}

function measurePerfTimeMean(fn, L, N) {
  let sum = 0;
  for (let i = 0; i < N; i++) {
    sum += measurePerfTime(fn, L);
  }
  return sum / N;
}

function measurePerfTime(fn, L) {
  const arr = getRandomArr(L);
  const t0 = performance.now();
  fn(arr);
  const t1 = performance.now();
  return (t1 - t0);
}

function getRandomArr(L) {
  Math.random();
  return Array(L).fill(0).map(_ => getRandomInt(1, 100));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// util
function pipe(...fns) {
  return (arg, debug = false) => fns.reduce((before, fn) => {
    const next = fn(before);

    if (debug) {
      console.log(fn.name, next);
    }
    return next;
  }, arg);
}



// functions
function sumForLoop1(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

function sumForLoop2(arr) {
  const N = arr.length;
  let result = 0;

  for (let i = 0; i < N; i++) {
    result += arr[i];
  }
  return result;
}

function sumWhile(arr) {
  const N = arr.length;
  let result = 0;
  let i = 0;
  
  while (i < N) {
    result += arr[i];
    i += 1;
  }
  return result;
}

function sumForOf(arr) {
  let result = 0;

  for (let item of arr) {
    result += item;
  }
  return result;
}

function sumForIn(arr) {
  let result = 0;

  for (let i in arr) {
    result += arr[i];
  }
  return result;
}

function sumForEach(arr) {
  let result = 0;
  arr.forEach(n => result += n);
  return result;
}

function sumReduce(arr) {
  return arr.reduce((result, n) => result + n, 0); 
}
