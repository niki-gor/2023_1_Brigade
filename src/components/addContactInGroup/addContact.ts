import { Component } from '@framework/component';
import template from '@components/addContactInGroup/addContact.pug';
import { DumbContact } from '@components/contact/contact';
import '@components/addContactInGroup/addContact.scss';
import '@components/createGroup/createGroup.scss';
import { dataInputUI } from '@components/ui/data-input/data-input';
import { blueButtonUI } from '@components/ui/blue-button/blue-button';

interface Props {
    groupName?: string;
    contactList?: User[];
}

interface State {
    isRendered: boolean;
}

export class DumbAddContactInGroup extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    getContactList() {
        const contacts: string[] = [];
        this.props?.contactList?.forEach((contact) => {
            contacts.push(new DumbContact({ contact }).render());
        });

        return contacts;
    }

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    render() {
        return template({
            GroupName: 'Название', // this.props.groupName
            GroupNameInput: dataInputUI.renderTemplate({
                className: 'groupName',
                inputType: 'text',
                inputPlaceholder: 'новое имя группы',
                value: '',
            }),
            CreateGroupButton: blueButtonUI.renderTemplate({
                className: 'button-submit',
                buttonValue: 'Сохранить изменения',
            }),
            Contacts: this.getContactList(),
            GroupMembersHeader: 'Контакты',
        });
    }
}
