import { Container } from "@containers/container";
import {store} from "@store/store";
import {constantsOfActions} from "@config/actions";
import {createGetContactsAction} from "@actions/createGetContactsAction";
import {DumbContact} from "@components/contact/contact";
import {DumbContacts} from "@components/contacts/contacts";
import {smallEllipseIconUI} from "@components/ui/small-ellipse-icon/small-ellipse-icon";

export interface SmartContacts {
    state: {
        isSubscribed: boolean,
        domElements: {
            headContacts: HTMLElement | null,
            contacts: HTMLElement[] | null,
            addContactButton: HTMLElement | null,
        },
    }
}

export class SmartContacts extends Container {
    unsubscribeStore: () => void = () => {};

    constructor(props :componentProps) {
        super(props);
    }

    newContacts() {
        const contacts = store.getState()["contacts"].payload
        let uiContacts: string[] = [];

        for (let i = 0; i < contacts.length; i++) {
            uiContacts.push(DumbContact.renderTemplate({
                    avatar: smallEllipseIconUI.renderTemplate({
                        imgSrc: './assets/img/geva.png',
                        altMsg: 'avatar'
                    }),
                    nickname: contacts[i].nickname,
                    status: contacts[i].status,
                })
            )
        }

        const ContactsUI = new DumbContacts({
            headContacts: {
                label: 'Контакты',
            },
            contacts: uiContacts,
            addContactButton: {
                className: 'btn-primary',
                buttonValue: 'добавить контакт',
            }
        });

        document.querySelector('#root')?.innerHTML = ContactsUI.render();
    }

    render() {
        this.unsubscribeStore = store.subscribe("contacts", this.newContacts)
        store.dispatch(createGetContactsAction())

        const ContactsUI = new DumbContacts({
            headContacts: {
                label: 'Контакты',
            },
            contacts:[{
                avatar: '',
                nickname: '',
                status: ''
            }],
            addContactButton: {
                className: 'btn-primary',
                buttonValue: 'добавить контакт',
            }
        });

        document.querySelector('#root')?.innerHTML = ContactsUI.render();
    }

    // componentDidMount() {
    //     this.render();
    // }
    //
    // componentWillUnmount() {
    //     this.unsubscribe.forEach((uns) => uns());
    //     this.state.isSubscribed = false;
    // }
}
