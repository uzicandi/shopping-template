// Fetch the items from the JSON file
function loadItems() {
  // brower API "fetch"를 이용해서 json 가져오기
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  // json타입을 li태그로 바꾸기
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    // 필터링 할 수 있는 정보가 들어 있지 않다면.
    return;
  }

  // 배열에서 특정 데이터만 모아서 작은 배열을 만들때
  // Filter를 이용하면 됨!
  displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  // 하나하나에 eventListener를 등록하는 것 보다
  // 버튼들이 들어있는 컨테이너에 eventListener를 등록해서
  // 한곳에서만 핸들링할 수 있게 만드는게 효율적 ==> 이벤트 위임
  logo.addEventListener('click', () => displayItems(items));
  // 로고가 선택되면 모든 아이템들이 보여지게 만들기
  buttons.addEventListener('click', event => onButtonClick(event, items));
  //
}

// main
loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
