import config from './modules/config.js';
import checkAuth from './modules/render-auth.js';

const root = document.querySelector('.root');

// config.login.render(root, config);
checkAuth(root, config);
