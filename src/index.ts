import '@/index.css';
import { router } from 'src/router/newRouter';
import { ROOT } from './config/config';
import { SmartLogin } from './containers/login/login';
import { store } from './store/Store';


router.register('new', { path: "", component: new SmartLogin({ ...store.getState(), rootNode: ROOT }) })
console.log(router.getRoutes());

// TODO: костыли, которые заменятся роутером
// import { ROOT } from '@config/config';
// import { store } from '@store/store'
// import { SmartLogin } from '@containers/login/login';

// const login = new SmartLogin({ ...store.getState(), rootNode: ROOT });
// login.componentDidMount();

