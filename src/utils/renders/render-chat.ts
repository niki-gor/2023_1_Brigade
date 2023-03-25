import template from '@pages/chat/chat.pug';
import logout from '@utils/requests/logout';

/**
 * implementation rendering of main page
 * @param {htmlElement} parent - parent element
 * @param {json} config - configuration
 * @param {int} userId - User identifier
 */
export default (config, userId) => {
    document.querySelector('#root').innerHTML = template();

    if (userId % 2) {
        document.querySelector('.header__user-photo').src = './assets/img/geva.png';
    }

    document.querySelector('.logout').addEventListener('click', (e) => {
        e.preventDefault();

        logout(config);
    });
};
