import { Component } from '@framework/component';
import { store } from '@store/store';
import { createGetContactsAction } from '@actions/contactsActions';
import { DumbContacts } from '@components/contacts/contacts';
import { createCreateDialogAction } from '@actions/chatActions';
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
                (props: Props) => {
                    this.props = props;

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

    /**
     * Обработчик клика на контакте
     * @param {HTMLElement} contact - контакт, на который был клик
     * @returns {void}
     */
    handleClickCreateDialog(contact: HTMLElement) {
        if (contact.classList.contains('contact')) {
            const contactStringId = contact.getAttribute('name');
            if (contactStringId) {
                const contactId = parseInt(contactStringId);
                this.props?.contacts?.forEach((contact) => {
                    if (contact.id === contactId) {
                        store.dispatch(createCreateDialogAction(contact));
                    }
                });
            }
        }
    }
}
