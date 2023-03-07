import loadError from '../templates/error.js';

/**
 * implementation rendering of error page
 * @param {htmlElement} parent - parent element
 * @param {json} config - configuration
 * @param {string} prevPage - previous page
 * @param {string} name - error name
 * @param {string} descr - error description
 */
export default (parent, config, prevPage, { name, descr }) => {
    parent.innerHTML = loadError();
    document.querySelector('.header-error').textContent = name;
    document.querySelector('.header-error__descr').textContent = descr;

    document.querySelector('.error-back-button').addEventListener('click', (e) => {
        e.preventDefault();
        switch (prevPage) {
        case 'login':
            config.login.render(parent, config);
            break;
        case 'reg':
            config.reg.render(parent, config);
            break;
        case 'chat':
            config.chat.render(parent, config);
            break;
        default:
        }
    });
};
