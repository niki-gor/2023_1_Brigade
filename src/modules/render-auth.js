import { get } from './ajax.js';

export default (parent, config) => {
  get({
    url: '/auth',
    callback: (status) => {
      switch (status) {
        case 200:
          // todo: config.chat.render(parent, config);
          break;
        case 404:
          config.login.render(parent, config);
          break;
        case 500:
          // todo: Internal error
      }
    },
  });
};
