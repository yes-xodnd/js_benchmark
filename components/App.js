import test from '../lib/test.js';
import fns from '../lib/iteration.js';
import pipe from '../lib/pipe.js';
import partial from '../lib/partial.js';
import createTestResultItem from '../lib/table.js';

const WORKER_URL = (location.hostname.includes('github'))
                 ? 'https://yes-xodnd.github.io/js_benchmark/worker.js'
                 : '../worker.js';

const worker = (window.Worker)
                 ? new Worker(WORKER_URL, { type: 'module' })
                 : null;

export default function App() {

  // elements
  const root = document.querySelector('.app');
  const inputL = root.querySelector('#input-length');
  const inputN = root.querySelector('#input-count');
  const result = root.querySelector('.result');
  const buttonTest = root.querySelector('.button-test');
  const buttonClear = root.querySelector('.button-clear');
  const loading = `<div class="loading"></div>`;

  let isLoading = false;
  
  inputL.addEventListener('keyup', onEvent);
  inputN.addEventListener('keyup', onEvent);
  buttonTest.addEventListener('click', onEvent);
  buttonClear.addEventListener('click', clearResult);

  // methods
  function onEvent(e) {
    const L = inputL.value * 1;
    const N = inputN.value * 1;

    if (e.type === 'keyup' && e.key !== 'Enter') {
      return;
    }

    if (L < 100) {
      alert('L: 100 이상의 숫자를 입력할 수 있습니다.');
      return;
    }
    
    if (N < 1 || N > 1000) {
      alert('N: 1이상, 1000이하의 숫자를 입력할 수 있습니다.');
      return;
    }

    if (isLoading) {
      if (worker) {
        worker.terminate();
        restoreButton();
        alert('계산이 취소되었습니다.');
        return;

      } else {
        alert('결과를 계산하는 중입니다.');
        return;
      }
    }

    isLoading = true;
    buttonTest.innerHTML = loading;

    if (worker) {
      worker.postMessage({ L, N });
      worker.onmessage = ({ data }) => {
        pipe(
          partial(createTestResultItem, '_', L, N),
          appendResultItem
        )(data);
        
        restoreButton();
      }

    } else {
      pipe(
        test,
        partial(createTestResultItem, '_', L, N),
        appendResultItem
      )({ fns, L, N });

      restoreButton();
    }
  }

  function appendResultItem(item) {
    result.append(item);
  }

  function clearResult() {
    result.innerHTML = null;
  }

  function restoreButton() {
    isLoading = false;
    buttonTest.innerHTML = 'TEST';
  }
}