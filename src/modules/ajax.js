const AJAX_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

const BACKEND_URL = 'http://95.163.249.116:8081/'

function ajax({ method, url, body = null }) {
  return fetch(url, {
    method,
    headers: { Accept: 'application/json' },
    body,
  })
    .then((response) => {
      const { status } = response;
      const parsedBody = response.json();
      return { status, parsedBody };
    });
}

function get({ url }) {
  let origin = "".concat(BACKEND_URL, url)
  ajax({
    method: AJAX_METHODS.GET,
    origin,
  });
}

function post({ url, body }) {
  let origin = "".concat(BACKEND_URL, url)
  ajax({
    method: AJAX_METHODS.POST,
    origin,
    body,
  });
}

function deleteSession({ url, body }) {
  let origin = "".concat(BACKEND_URL, url)
  ajax({
    method: AJAX_METHODS.DELETE,
    origin,
    body,
  });
}

export {
  get, post, deleteSession,
};
