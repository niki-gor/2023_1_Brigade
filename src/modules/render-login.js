import auth from '../templates/auth.js';
import { validateEmail, validatePassword } from './validator.js';
import { post } from './ajax.js';

const cookiesConfig = {user1: "./assets/img/geva.png", user2: "./assets/img/iii.png"}

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
        callback: (status) => {
            switch (status) {
              case 200:
                // let id = JSON.parse(responseBody.id)
                // config.chat.render(parent, config, cookiesConfig.user1); // cookiesConfig.user1 = id
                // todo: config.chat.render(parent, config);
                break;
              case 404:
                // todo: Incorrect email
                break;
              case 409:
                // todo: The session is already registered
                break;                  
              case 500:
                // todo: Internal error
            }
            // пока что тут
          config.chat.render(parent, config, cookiesConfig.user1); // cookiesConfig.user1 = id
        },
      });
    }
  });

  document.querySelector('.auth-ques').addEventListener('click', (e) => {
    e.preventDefault();

    config.reg.render(parent, config);
  });
};
