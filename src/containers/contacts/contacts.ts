import { Container } from "@containers/container";
import { store } from "@store/store";
import { createGetContactsAction } from "@actions/contactsActions";
import { DumbContacts } from "@components/contacts/contacts";

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

            // TODO: навесить обработчики
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
