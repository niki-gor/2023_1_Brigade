import { DumbLogin } from '@pages/login/login';
import login from '@utils/requests/login';
import { ValidationError } from '@utils/validator';

/**
 * implementation rendering of login page
 * @param {htmlElement} parent - parent element
 * @param {json} config - configuration
 */
export default (config) => {
    const page = DumbLogin.render();
    console.log(page);
    document.querySelector('#root')?.innerHTML = DumbLogin.render();

    const loginPageValidator = new ValidationError(document.querySelector('.email'), document.querySelector('.password'));

    loginPageValidator.validate();

    document.querySelector('.login-but')?.addEventListener('click', (e) => {
        e.preventDefault();

        if (loginPageValidator.isValid()) {
            login(config, loginPageValidator.getMail(), loginPageValidator.getPassword());
        }
    });

    document.querySelector('.login-ques')?.addEventListener('click', (e) => {
        e.preventDefault();

        config.reg.render(config);
    });
};
