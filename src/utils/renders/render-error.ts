import template from '@pages/error/error.pug';

/**
 * implementation rendering of error page
 * @param {htmlElement} parent - parent element
 * @param {json} config - configuration
 * @param {string} prevPage - previous page
 * @param {string} name - error name
 * @param {string} description - error description
 */
export default (config, prevPage, { name, description }) => {
    document.querySelector('#root').innerHTML = template();
    document.querySelector('.header-error').textContent = name;
    document.querySelector('.header-error__description').textContent = description;

    document.querySelector('.error-back-button').addEventListener('click', (e) => {
        e.preventDefault();
        switch (prevPage) {
        case 'login':
            config.login.render(config);
            break;
        case 'reg':
            config.reg.render(config);
            break;
        case 'chat':
            config.chat.render(config);
            break;
        default:
        }
    });
};
