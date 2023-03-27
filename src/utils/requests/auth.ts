import { get } from '@services/api';
import config from '@utils/requests/config';
import { createAuthAction, createLoginAction } from '@actions/userActions';
import { store } from '@store/store';

/**
 * implementation request authorization
 * @param {htmlElement} parent - parent element for rendering
 * @param {json} renderConfig - configuration for rendering
 */
export default (renderConfig) => {
    get({
        url: config.auth,
    })
        .then(({ status, parsedBody }) => {
            switch (status) {
            case 200:
                parsedBody.then((res) => {
                    store.subscribe(renderConfig.chat.render);
                    store.dispatch(createAuthAction(res));
                    // renderConfig.chat.render(renderConfig, res.id);
                });
                break;
            case 401:
                store.subscribe(renderConfig.login.render);
                store.dispatch(createLoginAction());
                // renderConfig.login.render(renderConfig);
                break;
            case 500:
                renderConfig.error.render(renderConfig, renderConfig.login.key, { name: '500', description: 'Internal error' });
                break;
            default:
            }
        });
};
