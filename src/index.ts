import '@/index.css';
import { router } from 'src/router/newRouter';
import { ROOT } from './config/config';
import { SmartLogin } from './containers/login/login';
import { SmartSignUp } from './containers/signUp/signUp';
import { store } from './store/Store';

let ok: boolean;
ok = router.register('/login', { path: "/login", component: new SmartLogin({ ...store.getState(), rootNode: ROOT }) });
ok = router.register('/signup', { path: "/signup", component: new SmartSignUp({ ...store.getState(), rootNode: ROOT }) });

if (ok) {
    console.log('success registration');
    router.start();
    router.route('/signup');
} else {
    console.log('registration error');
}
// router.route('/signup');
// router.back();
// console.log(router.getRoute("/"));
