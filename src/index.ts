import '@/index.css';
import { store } from '@store/store';
import { ROOT } from './config/config';
import { SmartSidebar } from '@/containers/sidebar/sidebar';
import { SmartChat } from './containers/chat/chat';


// const sidebar = new SmartSidebar({...store.getState(), rootNode: ROOT})
// sidebar.componentDidMount();
// sidebar.render();

const chat = new SmartChat({...store.getState(), rootNode: ROOT});
chat.componentDidMount();
chat.render();
