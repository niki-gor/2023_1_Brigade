import log from '../../templates/login.js';
import getParentElement from '../getParentElement.js';
import login from '../requests/login.js';
import Validator from '../validator.js';

/**
 * implementation rendering of login page
 * @param {htmlElement} parent - parent element
 * @param {json} config - configuration
 */
export default (config) => {
    getParentElement().innerHTML = log();
    const loginPageValidator = new Validator('', document.querySelector('.email'), document.querySelector('.password'));

    const validEmail = loginPageValidator.validateEmail();
    const validatePassword = loginPageValidator.validatePassword();

    if (validEmail && validatePassword) {
        document.querySelector('.login-but').addEventListener('click', (e) => {
            e.preventDefault();

            login(config, loginPageValidator.getMail(), loginPageValidator.getPassword());
        });
    }

    document.querySelector('.login-ques').addEventListener('click', (e) => {
        e.preventDefault();

        config.reg.render(config);
    });
};
