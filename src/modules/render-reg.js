import reg from '../templates/reg.js';
import {
  validateEmail, validatePassword, validateNick, validateConfirmPassword,
} from './validator.js';
import { post } from './ajax.js';

const cookiesConfig = ['./assets/img/geva.png', './assets/img/iii.png'];

export default (parent, config) => {
  parent.innerHTML = '';
  parent.innerHTML = reg();

  document.querySelector('.reg-but').addEventListener('click', (e) => {
    e.preventDefault();

    const inputEmail = document.querySelector('.email');
    const inputPassword = document.querySelector('.password');
    const inputNick = document.querySelector('.nick');
    const inputConfirmPassword = document.querySelector('.confirm-password');

    const valEmail = validateEmail(inputEmail);
    const valPassword = validatePassword(inputPassword);
    const valNick = validateNick(inputNick);
    const valConfirmPassword = validateConfirmPassword(inputPassword, inputConfirmPassword);

    if (valEmail && valPassword
        && valNick && valConfirmPassword) {
      post({
        url: '/reg',
        body: { email: inputEmail.value, password: inputPassword.value, nick: inputNick.value },
      })
        .then(({ status, parsedBody }) => {
          switch (status) {
            case 201:
              config.chat.render(parent, config, cookiesConfig[parsedBody.id]);
              break;
            case 400:
              config.error.render(parent, config, config.reg.key, {name: "400", descr: "Invalid username"})
              break;
            case 409:
              inputEmail.classList.add('auth-reg__input_error');
              document.querySelector('.occupied-email').classList.remove('invisible');
              break;
            case 500:
              config.error.render(parent, config, config.reg.key, {name: "500", descr: "Internal error"})
          }
        });
    }
  });

  document.querySelector('.reg-ques').addEventListener('click', (e) => {
    e.preventDefault();

    config.login.render(parent, config);
  });
};
