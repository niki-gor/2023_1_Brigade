import '@/index.css';
import { createAuthAction } from '@actions/authActions';
import { store } from '@store/store';
import { csrf } from '@/utils/api';

setInterval(csrf, 5 * 60 * 1000);
store.dispatch(createAuthAction());
