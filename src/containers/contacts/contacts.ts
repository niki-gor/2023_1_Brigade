import { Component } from '@framework/component';
import { store } from '@store/store';
import {
    createFindContactsByString,
    createGetContactsAction,
} from '@actions/contactsActions';
import { DumbContacts } from '@components/contacts/contacts';
import { createCreateDialogAction } from '@actions/chatActions';
import { createMoveToChatsAction } from '@actions/routeActions';
import { STATIC } from '@config/config';

interface Props {
    user?: User;
    contacts?: User[];
}

interface State {
    isSubscribed: boolean;
    domElements: {
        headContacts: HTMLElement | null;
        contacts: HTMLElement | null;
        addContactButton: HTMLElement | null;
    };
}

export class SmartContacts extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isSubscribed: false,
            domElements: {
                headContacts: null,
                contacts: null,
                addContactButton: null,
            },
        };

        this.node = STATIC;
    }

    // throttle<T extends (...args: any[]) => any>(func: T, delay: number) {
    //     let lastTime = 0;
    //     return function (this: any, ...args: Parameters<T>) {
    //         const currentTime = new Date().getTime();
    //         if (currentTime - lastTime > delay) {
    //             lastTime = currentTime;
    //             func.apply(this, args);
    //         }
    //     };
    // }

    render() {
        if (this.state.isSubscribed && this.props?.user) {
            if (!this.props.contacts) {
                this.props.contacts = [];
            }

            const ContactsUI = new DumbContacts({
                contacts: this.props?.contacts,
            });

            if (this.node) {
                this.node.innerHTML = ContactsUI.render();
            }

            // const findContactsSelector = document?.querySelector(
            //     '.contacts__head'
            // ) as HTMLElement;
            // const findContactsInput = findContactsSelector?.querySelector(
            //     '.chats__header__input__search'
            // ) as HTMLInputElement;
            // findContactsInput?.addEventListener(
            //     'input',
            //     this.throttle(() => {
            //         this.handleFindContactsInput(findContactsInput?.value);
            //     }, 500)
            // );

            this.state.domElements.contacts = document.querySelector(
                '.contacts__contacts'
            );
            this.state.domElements.contacts?.addEventListener('click', (e) => {
                let contact = e?.target as HTMLElement | null | undefined;
                contact = contact?.closest('.contact');

                if (contact) {
                    this.handleClickCreateDialog(contact);
                    e.preventDefault();
                }
            });

            // TODO: навесить обработчик на добавление контакта
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe = store.subscribe(
                this.constructor.name,
                (pr: Props) => {
                    this.props = pr;

                    this.render();
                }
            );

            if (this.state.isSubscribed === false) {
                this.state.isSubscribed = true;
            }

            store.dispatch(createGetContactsAction());
        }
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe();
            this.state.isSubscribed = false;
        }
    }

    handleFindContactsInput(string: string) {
        store.dispatch(createFindContactsByString(string));
        // if (contact.classList.contains('contact')) {
        //     const contactID = contact.getAttribute('name');
        //
        //     for (const key in this.props.contacts) {
        //         if (this.props.contacts[key].id == contactID) {
        //             store.dispatch(createCreateDialogAction(this.props.contacts[key]));
        //             store.dispatch(createMoveToChatsAction());
        //             break;
        //         }
        //     }
        // }
    }

    handleClickCreateDialog(contact: HTMLElement) {
        if (contact.classList.contains('contact')) {
            const contactStringId = contact.getAttribute('name');
            if (contactStringId) {
                const contactId = parseInt(contactStringId);
                this.props?.contacts?.forEach((contact) => {
                    if (contact.id === contactId) {
                        store.dispatch(createCreateDialogAction(contact));
                        store.dispatch(createMoveToChatsAction());
                    }
                });
            }
        }
    }
}
