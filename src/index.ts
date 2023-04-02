import '@/index.css';
import { router } from '@router/router';
import { store } from '@store/store';
import { createAuthAction } from './actions/authActions';

// router.start();
store.dispatch(createAuthAction());
