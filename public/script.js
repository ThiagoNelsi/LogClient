const allLogs = [];
const logsBox = document.getElementById('logs');
const filterInput = document.getElementById('filter-input');

const socket = io('/');
socket.on('newLog', (log) => {
  allLogs.push(log);
  renderLog(log);
  if (logsBox.scrollHeight - logsBox.scrollTop < 1000) logsBox.scrollTop = logsBox.scrollHeight
});

fetch('/logs').then(async response => {
  response.json().then(logs => {
    logs.forEach(log => {
      allLogs.push(log);
      renderLog(log);
    });
  });
  setTimeout(() => {
    logsBox.scrollTop = logsBox.scrollHeight;
  }, 500);
});

let timeout = setTimeout(() => { });
filterInput.addEventListener('input', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    filter(filterInput.value);
  }, 300);
});

function renderLog(log) {
  logsBox.innerHTML += `<span>${log}\n</span>`;
}

function download() {
  const blob = new Blob([logsBox.innerText], { type: 'text/plain' });
  const a = document.createElement('a');
  a.setAttribute('download', 'logs');
  a.setAttribute('href', window.URL.createObjectURL(blob));
  a.click();
}

function clearLogs() {
  logsBox.innerHTML = '';
  allLogs.splice(0, allLogs.length);
}

function filter(query) {
  logsBox.innerHTML = '';
  const numberOfLogs = allLogs.length;
  for (let i = 0; i < numberOfLogs; i++) {
    const log = allLogs[i];
    if (new RegExp(`${query}`, 'gi').test(log)) {
      renderLog(log);
    };
  }
}
