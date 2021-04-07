const modalTemplate = `
  <div class="modal-overlay">
    <div class="modal-wrap">
      <div class="modal-body">
        <h2>About</h2>
        <p>
          테스트는 각 반복문 함수를 이용해 배열 요소들의 합(sum)을 구하는 시간을 비교합니다. <br>
          배열은 매 시행마다 1과 100사이의 임의의 자연수로 채워집니다. <br>
        </p>

        <ul>
          <li>L : 배열의 길이</li>
          <li>N : 각 함수별 시행횟수. 결과는 N번 시행의 평균 시간을 출력합니다.</li>
          <li>M : 최소 시간 대비 배수</li>
        </ul>
      </div>
    </div>
  </div>
`;


export default function About() {
  const root = document.querySelector('.app');
  const about = root.querySelector('.button-about');
  const modalFragment = createModalFragment(modalTemplate);
  const overlay = modalFragment.querySelector('.modal-overlay');
  
  overlay.addEventListener('click', onClickOverlay);
  about.addEventListener('click', showModal);
  about.addEventListener('keyup', onKeyup);
  document.body.appendChild(modalFragment);

  function onKeyup(e) {
    if (e.key === 'Escape') {
      hideModal();
    }
  }

  function onClickOverlay(e) {
    if (e.target.className === 'modal-overlay') {
      hideModal();
    }
  }

  function showModal() {
    overlay.style.visibility = 'visible';
  }

  function hideModal() {
    overlay.style.visibility = 'hidden';
  }
}

function createModalFragment(template) {
  const t = document.createElement('template');
  t.innerHTML = template;
  return t.content.cloneNode(true);
}