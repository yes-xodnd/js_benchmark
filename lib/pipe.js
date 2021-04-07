export default function pipe(...fns) {
  return (arg, debug = false) => fns.reduce((before, fn) => {
    const next = fn(before);
    
    if (debug) {
      console.log(fn.name, next);
    }

    return next;
  }, arg);
}