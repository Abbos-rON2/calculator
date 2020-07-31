const text = document.querySelector('input');
const keypad = document.querySelector('.keypad')
const historyContainer = document.querySelector('.historyContainer')
let history = [];

if (localStorage.getItem('history')) {
  history = JSON.parse(localStorage.getItem("history"));
}

keypad.addEventListener('click', e => {
  if (!e.target.classList.contains('keypad')) {
    if (!e.target.classList.contains('control')) text.value += e.target.innerHTML;
    else if (e.target.innerHTML == '=') calculate();
    else if (e.target.innerHTML == 'C') clear();
    else if (e.target.innerHTML == 'Del') del();
  }
})

function calculate() {
  const question = text.value
  const answer = eval(text.value);
  text.value = answer;
  history.push([question, answer])
  localStorage.setItem("history", JSON.stringify(history));
  addHistoryItem(question, answer);
}
function clear() {
  text.value = ''
}
function del() {
  text.value = text.value.slice(0, -1)
}
function addHistoryItem(a, b) {
  const historyItem = document.createElement('div');
  historyItem.className = 'historyItem'
  const historyItemInput = document.createElement('div');
  historyItemInput.className = 'historyItemInput'
  const historyItemOutput = document.createElement('div');
  historyItemOutput.className = 'historyItemOutput'
  historyItemInput.innerHTML = a;
  historyItemOutput.innerHTML = b;
  historyItem.append(historyItemInput);
  historyItem.append(historyItemOutput);
  historyContainer.prepend(historyItem);
}

history.forEach(([a, b]) => addHistoryItem(a, b));
