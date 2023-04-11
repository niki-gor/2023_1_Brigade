import '@/index.css';
import { createAuthAction } from '@actions/authActions';
import { store } from '@store/store';
import { DYNAMIC, ROOT } from './config/config';
// import { SmartSidebar } from '@/containers/sidebar/sidebar';
import { SmartAddUserInGroup } from '@/containers/addUserInGroup/addUserInGroup';


// const sidebar = new SmartSidebar({...store.getState(), rootNode: ROOT})
// sidebar.componentDidMount();
// sidebar.render();

// const chat = new SmartChat({...store.getState(), rootNode: ROOT});
// chat.componentDidMount();
// chat.render();

const addContact = new SmartAddUserInGroup({...store.getState(), rootNode: DYNAMIC});
addContact.componentDidMount();
addContact.render()



// store.dispatch(createAuthAction());