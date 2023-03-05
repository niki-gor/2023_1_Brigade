const AJAX_METHODS = {
  GET: 'GET',
  POST: 'POST',
};

function ajax({
  method, url, body = null, callback = () => undefined,
}) {
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

function get({ url, callback }) {
  ajax({
    method: AJAX_METHODS.GET,
    url,
    callback,
  });
}

function post({ url, body, callback }) {
  ajax({
    method: AJAX_METHODS.POST,
    url,
    body,
    callback,
  });
}

export {
  get, post,
};
