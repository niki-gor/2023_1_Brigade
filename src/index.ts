import '@/index.css';
import { store } from '@store/store';
import { createAuthAction } from '@actions/authActions';

store.dispatch(createAuthAction());
