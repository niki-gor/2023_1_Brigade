import '@/index.css';
import { router } from 'src/router/newRouter';
import { ROOT } from './config/config';
import { SmartLogin } from './containers/login/login';
import { store } from './store/Store';


router.register('/login', { path: "/login", component: new SmartLogin({ ...store.getState(), rootNode: ROOT }) });
// когда делаем router.start() надо посмотреть this.routes[]
router.start();
// console.log(router.getRoute("/"));

// TODO: костыли, которые заменятся роутером
// const login = new SmartLogin({ ...store.getState(), rootNode: ROOT });
// login.componentDidMount();

