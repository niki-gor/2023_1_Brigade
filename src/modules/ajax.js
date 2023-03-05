const AJAX_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

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
  ajax({
    method: AJAX_METHODS.GET,
    url,
  });
}

function post({ url, body }) {
  ajax({
    method: AJAX_METHODS.POST,
    url,
    body,
  });
}

function deleteSession({ url, body }) {
  ajax({
    method: AJAX_METHODS.DELETE,
    url,
    body,
  });
}

export {
  get, post, deleteSession,
};
