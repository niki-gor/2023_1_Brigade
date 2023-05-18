import '@/index.scss';
import { ROOT } from './config/config';
import { Img } from './uikit/img/img';
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

const img = new Img({
    src: 'https://sun9-28.userapi.com/impg/wVxW8Eh2Y0gb03qcFc6Nx_HdMhMGZA3N6wneag/ioR2CruDkd4.jpg?size=1620x2160&quality=96&sign=5832034c9733987028766a0854facac3&type=album',
    parent: ROOT,
    onClick: () => {
        img.destroy();
    },
});
