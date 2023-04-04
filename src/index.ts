import '@/index.css';
import { store } from '@store/store';
import { ROOT } from './config/config';
// import { createAuthAction } from './actions/authActions';
import { SmartChat } from './containers/chats/chats';



// document.querySelector('#root')?.innerHTML = new DumbChat({}).render();

const chat = new SmartChat({...store.getState(), rootNode: ROOT});
chat.componentDidMount();
// chat.componentWillUnmount();
chat.render();

// store.dispatch(createAuthAction());


