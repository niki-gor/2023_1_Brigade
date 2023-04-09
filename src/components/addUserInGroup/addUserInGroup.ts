import { Component } from "@/components/component";
import { DumbContact } from "@components/contact/contact"
import template from "@components/addUserInGroup/addUserInGroup.pug";
import "@components/addUserInGroup/addUserInGroup.scss"
import {blueButtonUI} from "@components/ui/blue-button/blue-button";
import {dataInputReadOnlyUI} from "@components/ui/dataInputReadOnly/dataInputReadOnly";

export class DumbAddUserInGroup extends Component {
    constructor(props: any) {
        super(props);
    }

    getContactsList() {
        let contactsList: string[] = [];

        for (const key in this.props.contacts) {
            const contactUI = new DumbContact(this.props[key]);

            contactsList.push(contactUI.render());
        }

        return contactsList;
    }

    render() {
        return template({
            groupNameLabel: 'Название группы',
            groupNameInput: dataInputReadOnlyUI.renderTemplate({
                className:        'groupName',
                inputType:        'text',
                inputPlaceholder: '',
                value:            this.props.chat.title,
            }),
            buttonCreateGroup: blueButtonUI.renderTemplate({
                className: 'button-submit',
                buttonValue: 'Добавить участников',
            }),
            headContacts: 'Контакты',
            contacts: this.getContactsList(),
        });
    }
}
