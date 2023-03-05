import auth from '../templates/auth.js';
import { validateEmail, validatePassword } from './validator.js';
import { post } from './ajax.js';

const cookiesConfig = ['./assets/img/geva.png', './assets/img/iii.png'];

export default (parent, config) => {
  parent.innerHTML = '';
  parent.innerHTML = auth();

  document.querySelector('.auth-but').addEventListener('click', (e) => {
    e.preventDefault();

    const inputEmail = document.querySelector('.email');
    const inputPassword = document.querySelector('.password');

    const valEmail = validateEmail(inputEmail);
    const valPassword = validatePassword(inputPassword);

    if (valEmail && valPassword) {
      post({
        url: '/login',
        body: { email: inputEmail.value, password: inputPassword.value },
      })
        .then(({ status, parsedBody }) => {
          switch (status) {
            case 200:
              config.chat.render(parent, config, cookiesConfig[parsedBody.id]);
              break;
            case 404:
              inputEmail.classList.add('auth-reg__input_error');
              document.querySelector('.invalid-email').classList.remove('invisible');
              break;
            case 409:
              // todo: The session is already registered
              break;
            case 500:
              // todo: Internal error
              break;
            default:
          }
        });
    }
  });

  document.querySelector('.auth-ques').addEventListener('click', (e) => {
    e.preventDefault();

    config.reg.render(parent, config);
  });
};
