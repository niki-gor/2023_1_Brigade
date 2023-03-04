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

function renderAuth(parent) {
  parent.innerHTML = auth();

  document.querySelector('#auth-but').addEventListener('click', (e) => {
    e.preventDefault();

    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');

    const valEmail = Validator.validateEmail(inputEmail);
    const valPassword = Validator.validatePassword(inputPassword);

    if (valEmail.isCorrect && valPassword.isCorrect) {
      Ajax.post({
        url: '/auth',
        body: { email: inputEmail.value, password: inputPassword.value },
        callback: (status) => {
          if (status === 200) {
            // todo: goToPage
          }
          // todo: show error
        },
      });
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

    const valEmail = Validator.validateEmail(inputEmail);
    const valPassword = Validator.validatePassword(inputPassword);
    const valNick = Validator.validateNick(inputNick);
    const valConfirmPassword = Validator.validateConfirmPassword(inputPassword, inputConfirmPassword);

    if (valEmail.isCorrect && valPassword.isCorrect
        && valNick.isCorrect && valConfirmPassword.isCorrect) {
      Ajax.post({
        url: '/reg',
        body: { email: inputEmail.value, password: inputPassword.value, nick: inputNick.value },
        callback: (status) => {
          if (status === 200) {
            // todo: goToPage
          }
          // todo: show error
        },
      });
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

config.auth.render(root);
