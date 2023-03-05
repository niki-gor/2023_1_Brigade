import { get } from './ajax.js';

export default (parent, config) => {
  get({
    url: '/auth',
  })
    .then(({ status, parsedBody }) => {
      switch (status) {
        case 200:
          config.chat.render(parent, config, parsedBody.id);
          break;
        case 404:
          config.login.render(parent, config);
          break;
        case 500:
          // todo: Internal error
          break;
        default:
          // todo: error
      }
    });
};
