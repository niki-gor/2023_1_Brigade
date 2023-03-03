import auth from './templates/auth.js';
import reg from './templates/reg.js';

let inputEmail;
let inputPassword;
let inputNick;
let inputConfirmPassword;

function checkInputs() {
  inputEmail = null;
  inputPassword = null;
  inputNick = null;
  inputConfirmPassword = null;

  inputEmail = document.querySelector('#email');
  inputPassword = document.querySelector('#password');
  inputNick = document.querySelector('#nick');
  inputConfirmPassword = document.querySelector('#confirmPassword');
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateConfirmPassword(confirmPassword) {
  return confirmPassword === inputPassword.value;
}

function validatePassword(password) {
  return false;
}

export default function () {
  document.querySelector('.auth-reg-bottom__button').addEventListener('click', (e) => {
    e.preventDefault();
    checkInputs();
    if (inputEmail.value === '') {
      inputEmail.classList.add('auth-reg__input_error');
      console.log('email not filled');
    } else if (!validateEmail(inputEmail.value)) {
      inputEmail.classList.add('auth-reg__input_error');
      console.log('incorrect email');
    } else {
      inputEmail.classList.remove('auth-reg__input_error');
    }

    if (inputPassword.value === '') {
      inputPassword.classList.add('auth-reg__input_error');
      console.log('password not filled');
    } else {
      inputPassword.classList.remove('auth-reg__input_error');
    }

    if (inputNick) {
      if (inputNick.value === '') {
        inputNick.classList.add('auth-reg__input_error');
        console.log('nick not filled');
      } else {
        inputNick.classList.remove('auth-reg__input_error');
      }
    }

    if (inputConfirmPassword) {
      if (inputConfirmPassword.value === '') {
        inputConfirmPassword.classList.add('auth-reg__input_error');
        console.log('confirm password not filled');
      } else if (!validateConfirmPassword(inputConfirmPassword.value)) {
        inputConfirmPassword.classList.add('auth-reg__input_error');
        console.log('incorrect confirm password not filled');
      } else {
        inputConfirmPassword.classList.remove('auth-reg__input_error');
      }
    }
  });

  document.querySelector('.auth-reg-bottom__question').addEventListener('click', (e) => {
    e.preventDefault();
    checkInputs();
    document.querySelector('#root').innerHTML = '';
    if (inputConfirmPassword) {
      document.querySelector('#root').innerHTML = auth();
    } else {
      document.querySelector('#root').innerHTML = reg();
    }
  });
}
