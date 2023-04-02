import '@/index.css';
import { DumbContacts } from "@components/contacts/contacts"
import { SmartContacts } from "@containers/contacts/contacts";
import {ROOT} from "@config/config";

// const contacts = new DumbContacts({});
// const documents = document.querySelector('#root')?.H
// const htmlElement = HTMLElement
// const element: HTMLElement = document.createElement('div');
// const htmlElement: HTMLElement = document.documentElement;

// const ContactsUI = new DumbContacts({
//     headContacts: {
//         label: 'Контакты',
//     },
//     contacts:[ {
//         avatar: '',
//         nickname: '',
//         status: ''
//     }],
//     addContactButton: {
//         className: 'btn-primary',
//         buttonValue: 'добавить контакт',
//     }
// });

// const html = document.querySelector('#root')?.innerHTML

const smartContacts = new SmartContacts({rootNode: ROOT})

smartContacts.render()

// document.querySelector('#root')?.innerHTML = smartContacts.rootNode
