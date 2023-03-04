import chat from './templates/chat.js';

const root = document.querySelector('#root');

const config = {
  chat: {
    href: '/chat',
    render: renderChat,
    key: 'chat',
  },
};

function renderChat(parent) {
  parent.innerHTML = chat();
}

function goToPage(parent, page) {
  parent.innerHTML = '';

  page.render(root);
}

config.chat.render(root);

// ajax module
function ajax(method, url, body, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    callback(xhr.status, xhr.responseText);
  });

  if (body) {
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
    xhr.send(JSON.stringify(body));
    return;
  }

  xhr.send();
}
