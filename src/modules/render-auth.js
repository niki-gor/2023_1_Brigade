import { get } from './ajax.js';

/**
 * implementation rendering of authorization
 * @param {htmlElement} parent - parent element
 * @param {json} config - configuration
 */
export default (parent, config) => {
    get({
        url: '/auth/',
    })
        .then(({ status, parsedBody }) => {
            switch (status) {
            case 200:
                parsedBody.then((res) => {
                    config.chat.render(parent, config, res.id);
                });
                break;
            case 401:
                config.login.render(parent, config);
                break;
            case 500:
                config.error.render(parent, config, config.login.key, { name: '500', description: 'Internal error' });
                break;
            default:
            }
        });
};
