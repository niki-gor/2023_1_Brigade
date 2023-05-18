import '@/index.scss';
import { DumbMessage } from './uikit/message/message';
import { ROOT } from './config/config';
import { MessageActionTypes, MessageTypes } from './config/enum';
// import { createAuthAction } from '@actions/authActions';
// import { store } from '@store/store';
// import { router } from '@router/createRouter';

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker
//             .register('./sw.js')
//             .then((registration) => {
//                 console.log(
//                     'ServiceWorker registration successful:',
//                     registration
//                 );
//             })
//             .catch((err) => {
//                 console.log('ServiceWorker registration failed:', err);
//             });
//     });
// }

// Notification.requestPermission();

// router.start();

// store.dispatch(createAuthAction());

const message = new DumbMessage({
    parent: ROOT,
    message: {
        id: '1',
        action: MessageActionTypes.Create,
        type: MessageTypes.Sticker,
        image_url:
            'https://sun1-85.userapi.com/impf/c856120/v856120240/6201e/ky8d8rNdYyY.jpg?size=750x750&quality=96&sign=8e9e039642fc07dfe55e3bea36deead7&type=album',
        body: '',
        chat_id: 1,
        author_id: 1,
    },
    user: {
        id: 1,
        username: '',
        nickname: 'Danya',
        email: '',
        status: '',
        avatar: 'https://sun1-85.userapi.com/impf/c856120/v856120240/6201e/ky8d8rNdYyY.jpg?size=750x750&quality=96&sign=8e9e039642fc07dfe55e3bea36deead7&type=album',
    },
    place: 'left',
    onRightClick: () => {
        message.destroy();
    },
});
