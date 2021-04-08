export default function createTestResultItem(testResult, L, N) {
  const table = createTable(testResult);
  const title = createTableTitle(L, N);
  let footNote = '';

  if (1 * testResult[0].time === 0) {
    footNote = '충분히 큰 L을 입력해주세요.';
  }
  
  const div = document.createElement('div');
  div.append(title, table, footNote);
  return div;
}

export function createTable(result) {
  const table = document.createElement('table');
  const header = createTrDOMString([ 'name', 'time (ms)', 'M' ], 'th');
  const body = result.reduce((acc, item) => (
    acc + createTrDOMString(Object.values(item), 'td')
  ), '');

  table.innerHTML = header + body;
  return table;
}

export function createTableTitle(L, N) {
  const title = document.createElement('h2');
  title.innerText = 
    `length : ${L.toLocaleString('en-US')}
    count  : ${N}
  `;
  return title;
}

function createTrDOMString(arr, tag) {
  const Tag = content => `<${tag}>${ content }</${tag}>`;
  return `
    <tr>${arr.reduce((acc, v) => acc + Tag(v), '')}</tr>
  `;
}
