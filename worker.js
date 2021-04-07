import fns from './lib/iteration.js';
import test from './lib/test.js';

onmessage = ({ data }) => {
  const { L, N } = data; 
  const result = test({ fns, L, N });
  postMessage(result);
};
