
const WORKER_URL = (location.hostname.includes('github'))
                 ? 'https://yes-xodnd.github.io/js_benchmark/worker.js'
                 : '../worker.js';

console.log(WORKER_URL)

const worker = (window.Worker)
                 ? new Worker(WORKER_URL, { type: 'module' })
                 : null;

console.log(worker)
                 
export default worker;