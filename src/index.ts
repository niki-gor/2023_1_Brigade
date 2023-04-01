import '@/index.css';
import { router } from '@router/router';
import { ROOT } from './config/config';
import { SmartLogin } from './containers/login/login';
import { SmartSignUp } from './containers/signUp/signUp';
import { SmartProfile } from './containers/profile/profile';
import { store } from '@store/store';
import { createAuthAction } from './actions/authActions';

let ok: boolean;
ok = router.register('/login', { path: "/login", component: new SmartLogin({ ...store.getState(), rootNode: ROOT }) });
if (!ok) {
    console.error('router registration error');
    process.exit(1);
}
ok = router.register('/signup', { path: "/signup", component: new SmartSignUp({ ...store.getState(), rootNode: ROOT }) });
if (!ok) {
    console.error('router registration error');
    process.exit(1);
}
ok = router.register('/profile', { path: "/profile", component: new SmartProfile({ ...store.getState(), rootNode: ROOT }) });
if (!ok) {
    console.error('router registration error');
    process.exit(1);
}

store.dispatch(createAuthAction());

// router.route('/signup');
// router.back();
// console.log(router.getRoute("/"));