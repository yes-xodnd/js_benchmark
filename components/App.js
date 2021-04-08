import pipe from '../lib/pipe.js';
import partial from '../lib/partial.js';
import createTestResultItem from '../lib/table.js';

const WORKER_URL = (location.hostname.includes('github'))
                 ? 'https://yes-xodnd.github.io/js_benchmark/worker.js'
                 : '../worker.js';


export default function App() {

  // init worker
  const worker = new Worker(WORKER_URL);
  worker.onmessage = messageHandler;

  // elements
  const root = document.querySelector('.app');
  const inputL = root.querySelector('#input-length');
  const inputN = root.querySelector('#input-count');
  const result = root.querySelector('.result');
  const buttonTest = root.querySelector('.button-test');
  const buttonClear = root.querySelector('.button-clear');
  const loading = `<div class="loading"></div>`;

  // state
  let isLoading = false;
  
  // 
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

    if (L < 1) {
      alert('L: 1보다 큰 숫자를 입력해주세요.');
      return;
    }
    
    if (N < 1 || N > 10000) {
      alert('N: 1이상, 10000 이하의 숫자를 입력해주세요.');
      return;
    }

    if (isLoading) {
      worker.terminate();
      isLoading = false;
      buttonTest.innerHTML = 'TEST';
      alert('테스트가 취소되었습니다.');
      return;
    }

    // initTest
    isLoading = true;
    buttonTest.innerHTML = loading;
    worker.postMessage({ L, N });
  }

  function messageHandler({ data }) {
    const { result, L, N } = data;
    pipe(
      partial(createTestResultItem, '_', L, N),
      appendResultItem
    )(result);
    
    isLoading = false;
    buttonTest.innerHTML = 'TEST';
  }

  function appendResultItem(item) {
    result.append(item);
  }

  function clearResult() {
    result.innerHTML = null;
  }
}