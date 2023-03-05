const AJAX_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

const BACKEND_URL = 'http://95.163.249.116:8081/login'
const BACKEND_URL__LOGIN = 'http://95.163.249.116:8081/login'
const BACKEND_URL__REG = 'http://95.163.249.116:8081/reg'
const BACKEND_URL__USERS = 'http://95.163.249.116:8081/users'

function ajax(url, { method, body = null }) {
  return fetch(url, {
    method,
    headers: { Accept: 'application/json', Host: 'http://95.163.249.116:8081/login', method: 'post', mode: 'cors'},
    body,
  })
    .then((response) => {
      const { status } = response;
      const parsedBody = response.json();
      return { status, parsedBody };
    });
}

function get({ url }) {
  return ajax(BACKEND_URL, {
    method: AJAX_METHODS.GET,
  });
}

function post({ url, body }) {
  return ajax(BACKEND_URL__LOGIN, {
    method: AJAX_METHODS.POST,
    body,
  });
}

function deleteSession({ url, body }) {
  ajax(BACKEND_URL__USERS, {
    method: AJAX_METHODS.DELETE,
    body,
  });
}

export {
  get, post, deleteSession,
};
