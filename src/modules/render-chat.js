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
    }).then(({status}) => {
        switch (status) {
          case 204:
            config.auth.render(parent, config);
            break;
          case 401:
            config.error.render(parent, config, config.chat.key, {name: "401", descr: "Cookie not found"})
            break;
          case 404:
            config.error.render(parent, config, config.chat.key, {name: "404", descr: "User session not found"})
            break;                  
          case 500:
            config.error.render(parent, config, config.chat.key, {name: "500", descr: "Internal error"})
        }
    })
  });
};
