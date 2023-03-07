import login from '../templates/login.js';
import { validateEmail, validatePassword } from './validator.js';
import { post } from './ajax.js';
import getParentElement from './getParentElement.js';

/**
 * implementation rendering of login page
 * @param {htmlElement} parent - parent element
 * @param {json} config - configuration
 */
export default (parent, config) => {
    getParentElement().innerHTML = login();

    document.querySelector('.login-but').addEventListener('click', (e) => {
        e.preventDefault();

        const inputEmail = document.querySelector('.email');
        const inputPassword = document.querySelector('.password');

        const valEmail = validateEmail(inputEmail);
        const valPassword = validatePassword(inputPassword);

        if (valEmail && valPassword) {
            post({
                url: '/login/',
                body: JSON.stringify({ email: inputEmail.value, password: inputPassword.value }),
            })
                .then(({ status, parsedBody }) => {
                    switch (status) {
                    case 200:
                        parsedBody.then((res) => {
                            config.chat.render(parent, config, res.id);
                        });
                        break;
                    case 404:
                        inputEmail.classList.add('login-reg__input_error');
                        document.querySelector('.invalid-email').classList.remove('invisible');
                        break;
                    case 409:
                        config.error.render(parent, config, config.login.key, { name: '409', description: 'The session is already registered' });
                        break;
                    case 500:
                        config.error.render(parent, config, config.login.key, { name: '500', description: 'Internal error' });
                        break;
                    default:
                    }
                });
        }
    });

    document.querySelector('.login-ques').addEventListener('click', (e) => {
        e.preventDefault();

        config.reg.render(parent, config);
    });
};
