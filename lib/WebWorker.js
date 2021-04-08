
const WORKER_URL = (location.hostname.includes('github'))
                 ? 'https://github.com/yes-xodnd/js_benchmark/worker.js'
                 : '../worker.js';

const worker = (window.Worker)
               ? new Worker(WORKER_URL, { type: 'module' })
               : null;

export default worker;