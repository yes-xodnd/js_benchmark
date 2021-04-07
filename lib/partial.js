export default function partial(fn, ...args) {
  return partialBody(fn, args)
}

function partialBody(fn, args1) {
  return (...args2) => {
    const newArgs = [];
    let j = 0;

    for (let i = 0; i < args1.length; i++) {

      if (args1[i] === '_' && j < args2.length) {
        newArgs.push(args2[j]);
        j +=   1;

      } else {
        newArgs.push(args1[i]);
      }
    }

    if (j < args2.length) {
      for (; j < args2.length; j++) {
        newArgs.push(args2[j]);
      }
    }
    
    return (!newArgs.includes('_') && newArgs.length === fn.length)
           ? fn(...newArgs)
           : partialBody(fn, newArgs);
  }
}

function x(a, b, c, d, e) {
  return a + b + c + d + e;
}

const y = partial(x, 1, 2, '_', 4)
