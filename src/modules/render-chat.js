import chat from '../templates/chat.js';
import { deleteSession } from './ajax.js';
import getParentElement from './getParentElement.js';

/**
 * implementation rendering of main page
 * @param {htmlElement} parent - parent element
 * @param {json} config - configuration
 * @param {int} userId - User identifier
 */
export default (parent, config, userId) => {
    getParentElement().innerHTML = chat();

    if (userId) {
        document.querySelector('.header__user-photo').src = './assets/img/geva.png';
    }

    document.querySelector('.logout').addEventListener('click', (e) => {
        e.preventDefault();

        deleteSession({
            url: '/logout/',
        }).then(({ status }) => {
            switch (status) {
            case 204:
                config.login.render(parent, config);
                break;
            case 401:
                config.error.render(parent, config, config.chat.key, { name: '401', description: 'Cookie not found' });
                break;
            case 404:
                config.error.render(parent, config, config.chat.key, { name: '404', description: 'User session not found' });
                break;
            case 500:
                config.error.render(parent, config, config.chat.key, { name: '500', description: 'Internal error' });
                break;
            default:
            }
        });
    });
};
