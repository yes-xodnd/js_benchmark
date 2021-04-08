# JavaScript Iteration Performance Benchmark

## 소개

자바스크립트의 반복문 성능을 측정하기 위한 웹 어플리케이션입니다.

테스트는 각 반복문 함수를 이용해 배열 요소들의 합(sum)을 구하는 시간을 비교합니다.
배열은 매 시행마다 1과 100사이의 임의의 자연수로 채워집니다.

- L : 배열의 길이
- N : 각 함수별 시행횟수. 결과는 N번 시행의 평균 시간을 출력합니다.
- M : 최소 시간 대비 배수

## 반복문

``` js
function sumForLoop1(arr) {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

function sumForLoop2(arr) {
  const N = arr.length;
  let result = 0;

  for (let i = 0; i < N; i++) {
    result += arr[i];
  }
  return result;	
}

function sumWhile(arr) {
  const N = arr.length;
  let result = 0;
  let i = 1;
  
  while (i < N) {
    result += arr[i];
    i += 1;
  }
  return result;
}

function sumForOf(arr) {
  let result = 0;

  for (let item of arr) {
    result += item;
  }
  return result;
}

function sumForIn(arr) {
  let result = 0;

  for (let i in arr) {
    result += arr[i];
  }
  return result;
}

function sumForEach(arr) {
  let result = 0;
  arr.forEach(n => result += n);
  return result;
}

function sumReduce(arr) {
  return arr.reduce((result, n) => result + n, 0); 
}
```



