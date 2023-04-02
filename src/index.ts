import '@/index.css';
import { createAuthAction } from './actions/authActions';
import { store } from './store/store';


store.dispatch(createAuthAction());
