import renderChat from '@utils/renders/render-chat';
import renderReg from '@utils/renders/render-reg';
import renderLogin from '@utils/renders/render-login';
import renderError from '@utils/renders/render-error';

export default {
    login: {
        href: '/login/',
        render: renderLogin,
        key: 'login',
    },
    reg: {
        href: '/signup/',
        render: renderReg,
        key: 'signup',
    },
    chat: {
        href: '/users/',
        render: renderChat,
        key: 'chat',
    },
    error: {
        href: '/error/',
        render: renderError,
        key: 'error',
    },
    logout: {
        href: '/logout/',
        render: renderChat,
        key: 'logout',
    },
};
