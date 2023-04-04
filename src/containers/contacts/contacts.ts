import { Container } from "@containers/container";
import { store } from "@store/store";
import { createGetContactsAction } from "@actions/contactsActions";
import { DumbContact } from "@components/contact/contact";
import { DumbContacts } from "@components/contacts/contacts";
import { smallEllipseIconUI } from "@components/ui/small-ellipse-icon/small-ellipse-icon";

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
        if (this.state.isSubscribed) {
            const ContactsUI = new DumbContacts(this.props.contacts);

            this.rootNode.innerHTML = ContactsUI.render();

            // TODO: навесить обработчики
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.name, (pr: componentProps) => {
                this.props = pr;
    
                this.render();
            }));

            this.state.isSubscribed = true;
        }

        store.dispatch(createGetContactsAction())
    }
    
    componentWillUnmount() {
        this.unsubscribe.forEach((uns) => uns());
        this.state.isSubscribed = false;
    }
}
