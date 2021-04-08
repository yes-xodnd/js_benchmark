
const WORKER_URL = (location.hostname.includes('github'))
                 ? 'https://yes-xodnd.github.io/js_benchmark/worker.js'
                 : '../worker.js';

const worker = (window.Worker)
               ? new Worker(WORKER_URL, { type: 'module' })
               : null;

export default worker;