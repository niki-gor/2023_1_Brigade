import { Container } from "@containers/container";
import { store } from "@store/store";
import { createDialogAction, createGetContactsAction } from "@actions/contactsActions";
import { DumbContacts } from "@components/contacts/contacts";

export interface SmartContacts {
    state: {
        isSubscribed: boolean,
        domElements: {
            headContacts: HTMLElement | null,
            contacts: HTMLElement | null,
            addContactButton: HTMLElement | null,
        },
    }
}

export class SmartContacts extends Container {
    constructor(props :componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                headContacts:  null,
                contacts: null,
                addContactButton:  null,
            }
        }
    }

    render() {
        if (this.state.isSubscribed && this.props.user) {
            if (!this.props.contacts) {
                this.props.contacts = [];
            }
            
            const ContactsUI = new DumbContacts(this.props.contacts);

            this.rootNode.innerHTML = ContactsUI.render();

            this.state.domElements.contacts = document.querySelector('.contacts__contacts');
            this.state.domElements.contacts?.addEventListener('click', (e) => {
                e.preventDefault();

                const contact = e.target as HTMLElement;
                if (contact.classList.contains('.contact')) {
                    const contactID = contact.getAttribute('name');

                    for (const key in this.props.contacts) {
                        if (this.props.contacts[key].id == contactID) {
                            store.dispatch(createDialogAction(this.props.contacts[key]));
                            break;
                        }
                    }
                }
            });
            
            // TODO: навесить обработчик на добавление контакта
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => {
                this.props = pr;
    
                this.render();
            }));

            this.state.isSubscribed = true;

            store.dispatch(createGetContactsAction())
        }
    }
    
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }
}
