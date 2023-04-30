import { Component } from '@framework/component';
import { DumbContact } from '@components/contact/contact';
import { whiteButtonUI } from '@components/ui/white-button/white-button';

import template from '@components/contacts/contacts.pug';
import '@components/contacts/contacts.scss';

interface Props {
    contacts: User[];
}

interface State {
    isRendered: boolean;
}

export class DumbContacts extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    getContactsList() {
        const contactsList: string[] = [];

        this.props?.contacts.forEach((contact) => {
            const contactUI = new DumbContact({ contact });

            contactsList.push(contactUI.render());
        });

        return contactsList;
    }

    render() {
        const headContactsValue = 'Контакты';

        return template({
            headContacts: headContactsValue,
            contacts: this.getContactsList(),
            addContactButton: whiteButtonUI.renderTemplate({
                className: 'add-contact-button',
                buttonValue: 'Добавить контакт',
            }),
        });
    }
}
