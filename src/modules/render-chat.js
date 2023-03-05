import chat from '../templates/chat.js';
import { deleteSession } from './ajax.js';

export default (parent, config, userId) => {
  parent.innerHTML = '';
  parent.innerHTML = chat();
  if (userId) {
    document.querySelector('.header__user-photo').src = userId;
  }

  document.querySelector('.logout').addEventListener('click', (e) => {
    e.preventDefault();

    deleteSession({
      url: '/logout',
      callback: (status) => {
        switch (status) {
          case 204:
            config.auth.render(parent, config);
            break;
          case 401:
            // todo: Cookie not found
            break;
          case 404:
            // todo: User session not found
            break;
          case 500:
            // todo: Internal error
            break;
          default:
        }
      },
    });

    config.auth.render(parent, config);
  });
};
