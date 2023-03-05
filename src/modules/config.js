import renderAuth from './render-auth.js';
import renderReg from './render-reg.js';
import renderLogin from './render-login.js';
import renderChat from './render-chat.js';

export default {
  auth: {
    href: '/auth',
    render: renderAuth,
    key: 'auth',
  },
  login: {
    href: '/login',
    render: renderLogin,
    key: 'login',
  },
  reg: {
    href: '/reg',
    render: renderReg,
    key: 'signup',
  },
  chat: {
    href: '/chat',
    render: renderChat,
    key: 'chat',
  },
  // TODO errorPage
  // error: {
  //   href: '/error',
  //   render: renderError,
  //   key: 'error',
  // },
};
