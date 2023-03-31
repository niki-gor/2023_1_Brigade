import '@/index.css';
import { router } from 'src/router/newRouter';
import { ROOT } from './config/config';
import { SmartLogin } from './containers/login/login';
import { SmartSignUp } from './containers/signUp/signUp';
import { store } from './store/Store';


router.register('/login', { path: "/login", component: new SmartLogin({ ...store.getState(), rootNode: ROOT }) });
router.register('/signup', { path: "/signup", component: new SmartSignUp({ ...store.getState(), rootNode: ROOT }) });
// когда делаем router.start() надо посмотреть this.routes[]
router.start();
// router.route('/login');
// router.route('/');
// router.back();
// console.log(router.getRoute("/"));

// TODO: костыли, которые заменятся роутером
// const login = new SmartLogin({ ...store.getState(), rootNode: ROOT });
// login.componentDidMount();
