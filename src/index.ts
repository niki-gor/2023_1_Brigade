import '@/index.css';
import { createAuthAction } from '@actions/authActions';
import { store } from '@store/store';
import { router } from '@router/createRouter';

router.start();

store.dispatch(createAuthAction());
