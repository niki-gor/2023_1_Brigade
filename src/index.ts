// import '@/index.css';
// import { createAuthAction } from '@actions/authActions';
// import { store } from '@store/store';
// import { ROOT } from './config/config';
// // import { SmartSidebar } from '@/containers/sidebar/sidebar';
// import { SmartChat } from './containers/chat/chat';
//
//
// // const sidebar = new SmartSidebar({...store.getState(), rootNode: ROOT})
// // sidebar.componentDidMount();
// // sidebar.render();
//
// // const chat = new SmartChat({...store.getState(), rootNode: ROOT});
// // chat.componentDidMount();
// // chat.render();
//
// store.dispatch(createAuthAction());

import "@/index.css"
import { ROOT } from "@config/config";
import {DumbAddUserInGroup} from "@components/addUserInGroup/addUserInGroup";
import {dataInputReadOnlyUI} from "@components/ui/dataInputReadOnly/dataInputReadOnly";
import {blueButtonUI} from "@components/ui/blue-button/blue-button";

// groupNameLabel: 'Название группы',
//     groupNameInput: dataInputReadOnlyUI.renderTemplate({
//     className:        'groupName',
//     inputType:        'text',
//     inputPlaceholder: '',
//     value:            this.props.chat.title,
// }),
//     buttonCreateGroup: blueButtonUI.renderTemplate({
//     className: 'button-submit',
//     buttonValue: 'Добавить участников',
// }),
//     headContacts: 'Контакты',
//     contacts: this.getContactsList(),


const abc = new DumbAddUserInGroup({

});

document.querySelector('#root')?.innerHTML = abc.render()

// document.querySelectorAll('')
