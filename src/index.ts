import '@/index.css';

// TODO: костыли, которые заменятся роутером
// import { ROOT } from '@config/config';
// import { store } from '@store/store'
// import { SmartLogin } from '@containers/login/login';

// const login = new SmartLogin({ ...store.getState(), rootNode: ROOT });
// login.componentDidMount();

import { DumbProfile } from './components/profile/profile';
const profile = new DumbProfile({
    user: {
        avatar: './assets/img/geva.png',
        nickname: 'Gevork Gabrielyan',
        username: 'yurkakurka',
        status: 'Horovace shat lav bane!'
    }
});

document.querySelector('#root')?.innerHTML = profile.render();
// document.querySelector('.occupied-username')?.classList.remove('invisible');
// document.querySelector('.invalid-nickname')?.classList.remove('invisible');
// document.querySelector('.empty-password')?.classList.remove('invisible');
// document.querySelector('.missdog-email')?.classList.remove('invisible');
// document.querySelector('.invalid-new-password')?.classList.remove('invisible');
