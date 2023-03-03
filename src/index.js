import auth from './templates/auth.js';
import reg from './templates/reg.js';

const root = document.querySelector('#root');

const config = {
  auth: {
    href: '/auth',
    render: renderAuth,
    key: 'auth',
  },
  reg: {
    href: '/reg',
    render: renderReg,
    key: 'reg',
  },
};

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

function renderAuth(parent) {
  parent.innerHTML = auth();

  document.querySelector('#auth-but').addEventListener('click', (e) => {
    e.preventDefault();

    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');

    const valEmail = validateEmail(inputEmail);
    const valPassword = validatePassword(inputPassword);

    if (valEmail.isCorrect && valPassword.isCorrect) {
      ajax(
        'POST',
        '/auth',
        { email: inputEmail.value, password: inputPassword.value },
        (status) => {
          if (status === 200) {
            // todo: goToPage
          }
          // todo: show error
        },
      );
    }

    console.log(valEmail.message);
    console.log(valPassword.message);
  });

  document.querySelector('#auth-ques').addEventListener('click', (e) => {
    e.preventDefault();

    goToPage(root, config.reg);
  });
}

function renderReg(parent) {
  parent.innerHTML = reg();

  document.querySelector('#reg-but').addEventListener('click', (e) => {
    e.preventDefault();

    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    const inputNick = document.querySelector('#nick');
    const inputConfirmPassword = document.querySelector('#confirmPassword');

    const valEmail = validateEmail(inputEmail);
    const valPassword = validatePassword(inputPassword);
    const valNick = validateNick(inputNick);
    const valConfirmPassword = validateConfirmPassword(inputPassword, inputConfirmPassword);

    if (valEmail.isCorrect && valPassword.isCorrect
        && valNick.isCorrect && valConfirmPassword.isCorrect) {
      ajax(
        'POST',
        '/reg',
        { email: inputEmail.value, password: inputPassword.value, nick: inputNick.value },
        (status) => {
          if (status === 200) {
            // todo: goToPage
          }
          // todo: show error
        },
      );
    }

    console.log(valEmail.message);
    console.log(valNick.message);
    console.log(valPassword.message);
    console.log(valConfirmPassword.message);
  });

  document.querySelector('#reg-ques').addEventListener('click', (e) => {
    e.preventDefault();

    goToPage(root, config.auth);
  });
}

function goToPage(parent, page) {
  parent.innerHTML = '';

  page.render(root);
}

function validateEmail(email) {
  const regular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let message = 'correct email';
  let isCorrect = (email.value !== '');

  if (!isCorrect) {
    email.classList.add('auth-reg__input_error');
    message = 'email not filled';
    return { isCorrect: isCorrect, message: message };
  }

  isCorrect = regular.test(String(email.value).toLowerCase());

  if (!isCorrect) {
    email.classList.add('auth-reg__input_error');
    message = 'email not correct';
  }

  return { isCorrect: isCorrect, message: message };
}

function validateConfirmPassword(password, confirmPassword) {
  let message = 'correct confirm password';
  let isCorrect = (confirmPassword.value !== '');

  if (!isCorrect) {
    confirmPassword.classList.add('auth-reg__input_error');
    message = 'confirmPassword not filled';
    return { isCorrect: isCorrect, message: message };
  }

  isCorrect = (password.value === confirmPassword.value);

  if (!isCorrect) {
    confirmPassword.classList.add('auth-reg__input_error');
    message = 'confirmPassword not correct';
  }

  return { isCorrect: isCorrect, message: message };
}

function validatePassword(password) {
  let message = 'correct password';
  let isCorrect = (password.value !== '');

  if (!isCorrect) {
    password.classList.add('auth-reg__input_error');
    message = 'password not filled';
    return { isCorrect: isCorrect, message: message };
  }

  isCorrect = (password.value > 8);

  if (!isCorrect) {
    password.classList.add('auth-reg__input_error');
    message = 'password too short';
  }

  return { isCorrect: isCorrect, message: message };
}

function validateNick(nick) {
  let message = 'correct nick';
  let isCorrect = (nick.value !== '');

  if (!isCorrect) {
    nick.classList.add('auth-reg__input_error');
    message = 'password not filled';
    return { isCorrect: isCorrect, message: message };
  }

  return { isCorrect: isCorrect, message: message };
}

config.auth.render(root);
